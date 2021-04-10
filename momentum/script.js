// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  date = document.querySelector('.date'),
  body = document.querySelector('body'),
  btnBackground = document.querySelector('.btn-background'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption'),
  btnQuote = document.querySelector('.btn-quote');

const weekDaysArray=["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthArray=["January","February","March","April","May","June","July","August","September","October","November","December"];

// Show Time
const showTime = () => {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    weekDay = today.getDay(),
    day = today.getDate(),
    month = today.getMonth();

    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    date.innerHTML = `${weekDaysArray[weekDay]}, ${day} of ${monthArray[month]}`;
    setTimeout(showTime, 1000);
};


const addZero = (n) => {
  return (parseInt(n, 10) <10 ? '0': ' ') + n;
}

const setBgGreet = () => {
  let today = new Date(),
    hour = today.getHours();

     if (hour < 6) {
      // Night
      body.style.backgroundImage =
      `url(./assets/images/${hour}.jpg)`;
      greeting.textContent = 'Good Night, ';
    } else if (hour < 12) {
    // Morning
    body.style.backgroundImage =
    `url(./assets/images/${hour}.jpg)`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    body.style.backgroundImage =
    `url(./assets/images/${hour}.jpg)`;
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour < 24) {
    // Evening
    body.style.backgroundImage =
    `url(./assets/images/${hour}.jpg)`;
    greeting.textContent = 'Good Evening, ';
  } 
  setTimeout(setBgGreet, 60000);
}

let today = new Date(),
    hour = today.getHours();
let i = hour;

const getImage = () => {
  body.style.backgroundImage = `url(./assets/images/${i}.jpg)`;
  if (i < 23) {
    i++;
  } else {
    i = 0;
  }
  btnBackground.disabled = true;
  setTimeout(function() { btnBackground.disabled = false }, 1000);
} 

// Get Name
const getName = () => {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
const setName = (e) => {
  if (e.type === 'keydown') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

//Clear Name
const clearName = (e) => {
  e.target.innerText= ' ';
}

// Get Focus
const getFocus = () => {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
const setFocus = (e) => {
  if (e.type === 'keydown') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

//Clear Focus
const clearFocus = (e) => {
  e.target.innerText= ' ';
}

async function getQuote() {  
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.addEventListener('click', getQuote);

btnBackground.addEventListener('click', getImage);

name.addEventListener('keydown', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clearName);

focus.addEventListener('keydown', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clearFocus);

showTime();
setBgGreet();
getName();
getFocus();
