// DOM Elements
const time = document.querySelector(".time");
const greeting = document.querySelector(".greeting");
const date = document.querySelector(".date");
const body = document.querySelector("body");
const btnBackground = document.querySelector(".btn-refresh-background");
const name = document.querySelector(".name");
const focus = document.querySelector(".focus");
const blockquote = document.querySelector("blockquote");
const figcaption = document.querySelector("figcaption");
const btnQuote = document.querySelector(".btn-refresh-quote");

const weekDaysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const storageName = "name";
const storageFocus = "focus";
// Show Time
const showTime = () => {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  let weekDay = today.getDay();
  let day = today.getDate();
  let month = today.getMonth();

  time.innerText = `${addZero(hour)} : ${addZero(min)} : ${addZero(sec)}`;
  date.innerText = `${weekDaysArray[weekDay]}, ${day} of ${monthArray[month]}`;
  setTimeout(showTime, 1000);
};

const addZero = (n) => {
  return `0${n}`.slice(-2);
};

const setBgGreet = () => {
  let today = new Date();
  let hour = today.getHours();

  switch (hour) {
    case hour < 6:
      // Night
      body.style.backgroundImage = `url(./assets/images/${hour}.jpg)`;
      greeting.textContent = "Good Night, ";
      break;

    case hour < 12:
      // Morning
      body.style.backgroundImage = `url(./assets/images/${hour}.jpg)`;
      greeting.textContent = "Good Morning, ";
      break;

    case hour < 18:
      // Afternoon
      body.style.backgroundImage = `url(./assets/images/${hour}.jpg)`;
      greeting.textContent = "Good Afternoon, ";
      break;

    case hour < 24:
      // Evening
      body.style.backgroundImage = `url(./assets/images/${hour}.jpg)`;
      greeting.textContent = "Good Evening, ";
      break;

    default:
      setTimeout(setBgGreet, 60000);
      break;
  }
};

let today = new Date();
let hour = today.getHours();
let imageNumber = hour;

const getImage = () => {
  body.style.backgroundImage = `url(./assets/images/${imageNumber}.jpg)`;
  if (imageNumber < 23) {
    imageNumber++;
  } else {
    imageNumber = 0;
  }
  btnBackground.disabled = true;
  setTimeout(function () {
    btnBackground.disabled = false;
  }, 1000);
};

// Get Name
const getName = () => {
  if (
    localStorage.getItem(storageName) === null ||
    localStorage.getItem(storageName) === ""
  ) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem(storageName);
  }
};

// Set Name
const setName = (e) => {
  if (e.type === "keydown") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem(storageName, e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem(storageName, e.target.innerText);
  }
};

//Clear Name
const clearName = (e) => {
  e.target.innerText = " ";
};

// Get Focus
const getFocus = () => {
  if (
    localStorage.getItem(storageFocus) === null ||
    localStorage.getItem(storageFocus) === ""
  ) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem(storageFocus);
  }
};

// Set Focus
const setFocus = (e) => {
  if (e.type === "keydown") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem(storageFocus, e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem(storageFocus, e.target.innerText);
  }
};

//Clear Focus
const clearFocus = (e) => {
  e.target.innerText = " ";
};

async function getQuote() {
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
}

document.addEventListener("DOMContentLoaded", getQuote);
btnQuote.addEventListener("click", getQuote);

btnBackground.addEventListener("click", getImage);

name.addEventListener("keydown", setName);
name.addEventListener("blur", setName);
name.addEventListener("click", clearName);

focus.addEventListener("keydown", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("click", clearFocus);

showTime();
getImage();
setBgGreet();
getName();
getFocus();