const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
const buttonStart = document.getElementById("button-start");
const buttonStop = document.getElementById("button-stop");
const buttonReset = document.getElementById("button-reset");

let booleansProxy = new Proxy(
  {
    isStart: false,
    isStop: false,
    isReset: false,
  },
  {
    set: (target, obj, props) => {
      target[obj] = props;
    },
    get: (target, props) => {
      return target[props];
    },
  }
);

let isStart = false;
let isReset = false;
let isStop = false;
let seconds = 00;
let tens = 00;
let Interval;

buttonStart.onclick = function () {
  booleansProxy.isStart = true;
  booleansProxy.isStop = false;
  booleansProxy.isReset = false;
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
};

buttonStop.onclick = function () {
  booleansProxy.isStart = false;
  booleansProxy.isStop = true;
  booleansProxy.isReset = false;

  clearInterval(Interval);
};

buttonReset.onclick = function () {
  booleansProxy.isStart = false;
  booleansProxy.isStop = false;
  booleansProxy.isReset = true;
  clearInterval(Interval);
  tens = "00";
  seconds = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;
};

function startTimer() {
  tens++;

  if (tens <= 9) {
    appendTens.innerHTML = "0" + tens;
  }

  if (tens > 9) {
    appendTens.innerHTML = tens;
  }

  if (tens > 99) {
    console.log("seconds");
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
}
