function removeTransition(e) {
  if (e.propertyName !== "transform") { return; };
  e.target.classList.remove("playing");
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}

const keysList = document.querySelectorAll(".key");
const keys = Array.from(keysList);
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);

keysList.forEach((key) =>
  key.addEventListener("click", (e) => {
    const keyNumber = key.dataset.key;
    const audio = document.querySelector(`audio[data-key="${keyNumber}"]`);

    key.classList.add("playing");
    audio.currentTime = 0;
    audio.play();
  })
);
