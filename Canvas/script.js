const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const colorPicker = document.querySelector("#color");
const rainbowPicker = document.querySelector(".rainbow-button");
const brushSizePicker = document.querySelector("#brush-size");
const clearButton = document.querySelector(".clear-button");
const dynamicPicker = document.querySelector(".brush-size-dynamic-button");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
// ctx.globalCompositeOperation = 'multiply';

let isRainbow = true;
let isDynamic = true;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return; // stop the fn from running when they are not moused down
    console.log(e);
    if (!isRainbow) {
        ctx.strokeStyle = localStorage.getItem('color');
    } else {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    }
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
        hue = 0;
    }
    if (!isDynamic) {
        ctx.lineWidth = localStorage.getItem('size');
    } else {
        if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
            direction = !direction;
        }

        if (direction) {
            ctx.lineWidth++;
        } else {
            ctx.lineWidth--;
        }

    }

}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
colorPicker.addEventListener('change', () => {
    if (rainbowPicker.classList.contains('color-button--active')) {
        rainbowPicker.classList.remove('color-button--active');
    }
    if (!colorPicker.classList.contains('color-button--active')) {
        colorPicker.classList.add('color-button--active');
    }
    isRainbow = false;
    localStorage.setItem('color', colorPicker.value);
});

rainbowPicker.addEventListener('click', () => {
    if (colorPicker.classList.contains('color-button--active')) {
        colorPicker.classList.remove('color-button--active');
    }
    if (!rainbowPicker.classList.contains('color-button--active')) {
        rainbowPicker.classList.add('color-button--active');
    }
    isRainbow = true;
});

dynamicPicker.addEventListener('click', () => {
    if (brushSizePicker.classList.contains('size-button--active')) {
        brushSizePicker.classList.remove('size-button--active');
    }
    if (!dynamicPicker.classList.contains('size-button--active')) {
        dynamicPicker.classList.add('size-button--active');
    }
    isDynamic = true;
});


brushSizePicker.addEventListener('change', () => {
    if (dynamicPicker.classList.contains('size-button--active')) {
        dynamicPicker.classList.remove('size-button--active');
    }
    if (!brushSizePicker.classList.contains('size-button--active')) {
        brushSizePicker.classList.add('size-button--active');
    }
    isDynamic = false;
    localStorage.setItem('size', brushSizePicker.value);
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

