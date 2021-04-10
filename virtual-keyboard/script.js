const textArea = document.querySelector('.use-keyboard-input');
const microphone = document.querySelector ('.button-microphone');

const keyLayout = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
  "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
  "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", ":", "enter",
  "done", "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
  "ru", "space"
];

const keyRussian = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
  "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
  "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
  "done", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?",
  "eng", "space"
];

const elements = {
  main: null,
  keysContainer: null,
  keys: []
};

const properties = {
  value: "",
  capsLock: false,
  eng: true,
  shift: false,
  record: false
};

microphone.addEventListener("click", () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  if (properties.eng === true) {
    recognition.lang = 'en-US';
  } else {
    recognition.lang = 'ru';
  }
  
  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
    textArea.value = transcript;
  });

  if (properties.record === false) {
    properties.record = true;
    microphone.classList.add('button-microphone--active');
    recognition.start();
  } else {
    properties.record = false;
    microphone.classList.remove('button-microphone--active');
    recognition.stop();
  };
});

const init = () => {
  elements.main = document.createElement("div");
  elements.main.classList.add("keyboard", "keyboard--hidden");
  document.body.appendChild(elements.main);

  elements.keysContainer = document.createElement("div");
  elements.keysContainer.classList.add("keyboard__keys");
  elements.main.appendChild(elements.keysContainer);
  createKeys();
};

const toggleShift = () => {
  properties.shift = !properties.shift;
  const shiftButton = document.querySelector('.shift');
  shiftButton.classList.toggle("keyboard__key--active", properties.shift);
  elements.keys = elements.keysContainer.querySelectorAll(".keyboard__key");
  for (let key of elements.keys) {
    if (key.childElementCount === 0 && key.textContent !== "Shift") {
      if ((properties.capsLock === true && properties.shift === true) || (properties.capsLock === false && properties.shift === false)) {
        key.textContent = key.textContent.toLowerCase();
      } else if ((properties.capsLock === false && properties.shift === true) || (properties.capsLock === true && properties.shift === false)) {
        key.textContent = key.textContent.toUpperCase();
      }
    }
  }
};

const triggerEvent = () => {
  textArea.value = properties.value;
  if (properties.shift === true) {
    toggleShift();
  }
};

const toggleCapsLock = () => {
  properties.capsLock = !properties.capsLock;
  elements.keys = elements.keysContainer.querySelectorAll(".keyboard__key");
  for (let key of elements.keys) {
    if (key.childElementCount === 0 && key.textContent !== "Shift") {
      key.textContent = properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    }
  }
};

const toggleLang = () => {
  properties.eng = !properties.eng;
  elements.keys = elements.keysContainer.querySelectorAll(".keyboard__key");
  for (let index in elements.keys) {
    if (elements.keys[index].childElementCount === 0) {
      if (properties.eng === true) {
        if (properties.capsLock === true) {
          elements.keys[index].textContent = keyLayout[index].toUpperCase();
        } else {
          elements.keys[index].textContent = keyLayout[index];
        }
      } else {
        if (properties.capsLock === true) {
          elements.keys[index].textContent = keyRussian[index].toUpperCase();
        } else {
          elements.keys[index].textContent = keyRussian[index];
        }
      }
    }
  }
};

const createIconHTML = (icon_name) => {
  return `<i class="material-icons">${icon_name}</i>`;
};

const open = () => {
  elements.main.classList.remove("keyboard--hidden");
};

const close = () => {
  elements.main.classList.add("keyboard--hidden");
};

const playSound = (className) => {
  const audio = document.querySelector(`.${className}`);
  audio.currentTime = 0;
  audio.play();
}


textArea.addEventListener('focus', open);

const createKeys = () => {
  const fragment = document.createDocumentFragment();

  keyLayout.forEach((key) => {
    const keyElement = document.createElement("button");
    const insertLineBreak = ["backspace", "]", "enter", "?"].indexOf(key) !== -1;

    keyElement.setAttribute("type", "button");
    keyElement.classList.add("keyboard__key");

    switch (key) {
      case "backspace":
        keyElement.classList.add("keyboard__key--wide", "backspace");
        keyElement.innerHTML = createIconHTML("backspace");

        keyElement.addEventListener("click", () => {
          playSound("back-sound");
          properties.value = properties.value.substring(0, properties.value.length - 1);
          triggerEvent();
        });

        break;

      case "caps":
        keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
        keyElement.innerHTML = createIconHTML("keyboard_capslock");

        keyElement.addEventListener("click", () => {
          playSound("caps-sound");
          toggleCapsLock();
          keyElement.classList.toggle("keyboard__key--active", properties.capsLock);
        });

        break;

      case "enter":
        keyElement.classList.add("keyboard__key--wide", "enter");
        keyElement.innerHTML = createIconHTML("keyboard_return");

        keyElement.addEventListener("click", () => {
          playSound("enter-sound");
          properties.value += "\n";
          triggerEvent();
        });

        break;

      case "Shift":
        keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "shift");
        keyElement.innerHTML = "Shift";

        keyElement.addEventListener("click", () => {
          playSound("shift-sound");
          toggleShift();
        });

        break;

      case "ru":
        keyElement.classList.add("keyboard__key--wide");
        keyElement.innerHTML = "ru";
        keyElement.addEventListener("click", () => {
          toggleLang();
        });

        break;

      case "space":
        keyElement.classList.add("keyboard__key--extra-wide", "space");
        keyElement.innerHTML = createIconHTML("space_bar");

        keyElement.addEventListener("click", () => {
          playSound("space-sound");
          properties.value += " ";
          triggerEvent();
        });

        break;

      case "done":
        keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
        keyElement.innerHTML = createIconHTML("check_circle");

        keyElement.addEventListener("click", () => {
          close();
        });

        break;

      default:
        keyElement.textContent = key.toLowerCase();

        keyElement.addEventListener("click", () => {
          if (properties.eng === true) {
            playSound("english-lang");
          } else {
            playSound("russian-lang");
          }
          properties.value += keyElement.textContent;
          triggerEvent();
        });

        break;
    }

    fragment.appendChild(keyElement);

    if (insertLineBreak) {
      fragment.appendChild(document.createElement("br"));
    }
  })
  elements.keysContainer.appendChild(fragment)
};


const showKey = (pressedKey) => {
  elements.keys = elements.keysContainer.querySelectorAll(".keyboard__key");
  for (let key of elements.keys) {
    if (key.childElementCount === 0 || key.classList.contains('backspace') || key.classList.contains('space') || key.classList.contains('enter')) {
      if (key.textContent === pressedKey) {
        key.classList.add('keyboard__key--focused');
      } else if (key.classList.contains('backspace') && pressedKey === "Backspace") {
        key.classList.add('keyboard__key--focused');
      } else if (key.classList.contains('space') && pressedKey === " ") {
        key.classList.add('keyboard__key--focused');
      } else if (key.classList.contains('enter') && pressedKey === "Enter") {
        key.classList.add('keyboard__key--focused');
      }
    }
  }
}

const hideKey = (pressedKey) => {
  elements.keys = elements.keysContainer.querySelectorAll(".keyboard__key");
  for (let key of elements.keys) {
    if (key.childElementCount === 0 || key.classList.contains('backspace') || key.classList.contains('space') || key.classList.contains('enter')) {
      if (key.textContent === pressedKey) {
        key.classList.remove('keyboard__key--focused');
      } else if (key.classList.contains('backspace') && pressedKey === "Backspace") {
        key.classList.remove('keyboard__key--focused');
      } else if (key.classList.contains('space') && pressedKey === " ") {
        key.classList.remove('keyboard__key--focused');
      } else if (key.classList.contains('enter') && pressedKey === "Enter") {
        key.classList.remove('keyboard__key--focused');
      }
    }
  }
}


window.addEventListener("DOMContentLoaded", init);

window.addEventListener("keydown", (e) => {
  showKey(e.key);
});

window.addEventListener("keyup", (e) => {
  hideKey(e.key);
});