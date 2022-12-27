function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]')
const stoptBtn = document.querySelector('[data-stop]')
const body = document.querySelector('body')
let timerId = null
// console.log(startBtn)


startBtn.addEventListener("click", start)
stoptBtn.addEventListener("click", stop)

function start() {
    timerId = setInterval(()=>{  
    const color = getRandomHexColor();
    body.style.backgroundColor = color
}, 1000 )
    if(timerId){
    return startBtn.disabled = true
    }
}

function stop(){
 clearInterval(timerId);
 startBtn.disabled = false
} 






