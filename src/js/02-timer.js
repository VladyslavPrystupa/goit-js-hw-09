// Описаний в документації
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
// import { Report } from 'notiflix/build/notiflix-report-aio';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
const dataDays = document.querySelector('[data-days]')
const dataHours = document.querySelector('[data-hours]')
const dataMinutes = document.querySelector('[data-minutes]')
const dataSeconds = document.querySelector('[data-seconds]')
const inputSet = document.querySelector('#datetime-picker')
let settedTime = 0
let deltaTime = 0

const startBtn = document.querySelector('[data-start]')
startBtn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        settedTime = selectedDates[0].getTime()
        const deltaTime = settedTime - new Date().getTime()
    if (deltaTime <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false
    }
   
  },
};

const input = flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', onClick)

function onClick() {
  inputSet.disabled = true
  startBtn.disabled = true
  const idIterval = setInterval(() => {
    deltaTime = settedTime - new Date().getTime()

    const time = convertMs(deltaTime)
    
    if (deltaTime <= 0) {
      Notiflix.Notify.success('Time is out!');
      startBtn.disabled = false
      inputSet.disabled = false
      return clearInterval(idIterval)
    }

    dataDays.textContent = addLeadingZero(time.days)
    dataHours.textContent = addLeadingZero(time.hours)
    dataMinutes.textContent = addLeadingZero(time.minutes)
    dataSeconds.textContent = addLeadingZero(time.seconds)

    },1000 )
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0')
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(); // {days: 0, hours: 6 minutes: 42, seconds: 20}