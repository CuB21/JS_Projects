const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
const natureSounds = document.querySelectorAll(".nature-show");
const birdsSounds = document.querySelectorAll(".bird-show");
const animalsSounds = document.querySelectorAll(".animal-show");
const sounds = document.querySelectorAll(".sound-picker button");
const topics = document.querySelectorAll(".sounds-groups button");
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffest = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:0${Math.floor(
  fakeDuration % 60
)}`;

topics.forEach((topic) => {
  topic.addEventListener("click", () => {
    switch (topic.dataset.topic) {
      case "nature":
        natureSounds.forEach((sound) => {
          sound.style.display = "block";
        });
        birdsSounds.forEach((sound) => {
          sound.style.display = "none";
        });
        animalsSounds.forEach((sound) => {
          sound.style.display = "none";
        });
        break;

      case "birds":
        birdsSounds.forEach((sound) => {
          sound.style.display = "block";
        });
        natureSounds.forEach((sound) => {
          sound.style.display = "none";
        });
        animalsSounds.forEach((sound) => {
          sound.style.display = "none";
        });
        break;

      case "animals":
        animalsSounds.forEach((sound) => {
          sound.style.display = "block";
        });
        natureSounds.forEach((sound) => {
          sound.style.display = "none";
        });
        birdsSounds.forEach((sound) => {
          sound.style.display = "none";
        });
        break;
    }
  });
});

sounds.forEach((sound) => {
  sound.addEventListener("click", () => {
    song.src = sound.getAttribute("data-sound");
    video.src = sound.getAttribute("data-video");
    checkPlaying(song);
  });
});

play.addEventListener("click", () => {
  checkPlaying(song);
});

replay.addEventListener("click", () => {
  restartSong(song);
});

const restartSong = (song) => {
  let currentTime = song.currentTime;
  song.currentTime = 0;
};

timeSelect.forEach((option) => {
  option.addEventListener("click", () => {
    fakeDuration = option.getAttribute("data-time");
    let second = Math.floor(fakeDuration % 60);
    let minutes = Math.floor(fakeDuration / 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    timeDisplay.textContent = `${minutes}:0${second}`;
  });
});

const checkPlaying = (song) => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let second = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  if (second < 10) {
    second = `0${second}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  timeDisplay.textContent = `${minutes}:${second}`;

  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};
