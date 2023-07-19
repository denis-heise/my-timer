const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
const NUMBER_REGEXP = /[^0-9]/g;
const LIMIT_NUMBER_CONVERSION = 60;
const LIMIT_NUMBER_TRANSFER = 10;
let timeId;

const createTimerAnimator = () => {
  return (seconds) => {
    const quantityHours = Math.trunc(seconds / (LIMIT_NUMBER_CONVERSION * LIMIT_NUMBER_CONVERSION));
    const quantityMinutes = Math.trunc((seconds - (quantityHours * (LIMIT_NUMBER_CONVERSION * LIMIT_NUMBER_CONVERSION))) / LIMIT_NUMBER_CONVERSION);
    const quantitySeconds = ((seconds - (quantityHours * (LIMIT_NUMBER_CONVERSION * LIMIT_NUMBER_CONVERSION))) - (quantityMinutes * LIMIT_NUMBER_CONVERSION));

    timerEl.textContent = `${quantityHours >= LIMIT_NUMBER_TRANSFER ? quantityHours : `0${quantityHours}`}:${quantityMinutes >= LIMIT_NUMBER_TRANSFER ? quantityMinutes : `0${quantityMinutes}`}:${quantitySeconds >= LIMIT_NUMBER_TRANSFER ? quantitySeconds : `0${quantitySeconds}`}`;

    timeId = setInterval(() => {
      seconds -= 1;
      const quantityHours = Math.trunc(seconds / (LIMIT_NUMBER_CONVERSION * LIMIT_NUMBER_CONVERSION));
      const quantityMinutes = Math.trunc((seconds - (quantityHours * (LIMIT_NUMBER_CONVERSION * LIMIT_NUMBER_CONVERSION))) / LIMIT_NUMBER_CONVERSION);
      const quantitySeconds = ((seconds - (quantityHours * (LIMIT_NUMBER_CONVERSION * LIMIT_NUMBER_CONVERSION))) - (quantityMinutes * LIMIT_NUMBER_CONVERSION));

      if (seconds === 0){
        clearInterval(timeId);
        timerEl.textContent = '00:00:00';
      } else {
        timerEl.textContent = `${quantityHours >= LIMIT_NUMBER_TRANSFER ? quantityHours : `0${quantityHours}`}:${quantityMinutes >= LIMIT_NUMBER_TRANSFER ? quantityMinutes : `0${quantityMinutes}`}:${quantitySeconds >= LIMIT_NUMBER_TRANSFER ? quantitySeconds : `0${quantitySeconds}`}`;
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', function () {
  this.value = this.value.replace(NUMBER_REGEXP, '');
});

inputEl.addEventListener('keypress', function () {
  if(this.value.length === 5) {
    this.value = this.value.slice(0, -1);
  }
});

inputEl.addEventListener('onpaste', function () {
  this.value = this.value.replace(NUMBER_REGEXP, '');
});

inputEl.addEventListener('focus', function(){
  inputEl.style.borderColor = 'black';
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  if(seconds > 86399){
    inputEl.style.borderColor = 'red';
    alert('Укажите не более 86399 секунд');
  } else {
    clearInterval(timeId);
    animateTimer(seconds);
    inputEl.value = '';
  }
});
