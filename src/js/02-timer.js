// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
const dataDays = document.querySelector('[data-days]')
const dataHours = document.querySelector('[data-hours]')
const dataMinutes = document.querySelector('[data-minutes]')
const dataSeconds = document.querySelector('[data-seconds]')

let settedTime = 0

const startBtn = document.querySelector('[data-start]')
startBtn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
    
    const idInterval = setInterval(() => {
    if (selectedDates[0].getTime() <= new Date().getTime()) {
    clearInterval(idInterval)
    alert("Please choose a date in the future")
    } else {
    startBtn.disabled = false;
    settedTime = selectedDates[0].getTime() - new Date().getTime()
    console.log(convertMs(settedTime))
    }
        
    }, 1000)
  },
};

const input = flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', onClick)
function onClick() {
    setInterval(() => {
        dataDays.textContent = convertMs(settedTime).days.toString().padStart(2, '0')
        dataHours.textContent = convertMs(settedTime).hours.toString().padStart(2, '0')
        dataMinutes.textContent = convertMs(settedTime).minutes .toString().padStart(2, '0')
        dataSeconds.textContent = convertMs(settedTime).seconds.toString().padStart(2, '0') 
    },1000 )
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