const body = document.querySelector("body");
let cellSize;
if (screen.width > 410) {
    cellSize = 100;
} else {
    cellSize = 70;
}


const header = document.createElement("h1");
header.innerHTML = "Gem-puzzle";
body.append(header);

const startGameButton = document.createElement("button");
startGameButton.className = "start_game new_game";
startGameButton.innerHTML = "START GAME";
body.append(startGameButton);

const newGameButton = document.createElement("button");
    newGameButton.className = "new_game";
    newGameButton.innerHTML = "NEW GAME";

let createGame = () => {
    const container = document.createElement("div");
    container.className = "container";
    body.append(container);

    const timer = document.createElement("div");
    timer.className = "timer";
    container.append(timer);

    const counter = document.createElement("div");
    counter.className = "counter";
    container.append(counter);

    const timeHeader = document.createElement("span");
    timeHeader.className = "time_header";
    timeHeader.innerHTML = "Time "
    timer.append(timeHeader);

    const timeValue = document.createElement("span");
    timeValue.className = "time_value";
    timeValue.innerHTML = "00:00"
    timer.append(timeValue);

    const counterHeader = document.createElement("span");
    counterHeader.className = "counter_header";
    counterHeader.innerHTML = "Moves "
    counter.append(counterHeader);

    const counterValue = document.createElement("span");
    counterValue.className = "counter_value";
    counterValue.innerHTML = "0"
    counter.append(counterValue);

    const fieldGame = document.createElement("div");
    fieldGame.className = "field";
    body.append(fieldGame);

    body.append(newGameButton);
}

let interval = null;
let seconds = 0;


let empty = {
    value: 0,
    top: 0,
    left: 0
};

let cells = [];
cells.push(empty);

let moves = 0;

let updateTime = () => {
    const timeValue = document.querySelector(".time_value");
    seconds = seconds +1;
    timeValue.innerHTML = `${Math.floor(seconds/60)}:${seconds % 60}`
};

function move(index){
    const counterValue = document.querySelector(".counter_value");
    const cell = cells[index];

    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);
    if (leftDiff  + topDiff >1) {
        return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`; 
    cell.element.style.top = `${empty.top * cellSize}px`;
    
    const emptyLeft = empty.left;
    const emptyTop = empty.top;

    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    moves = moves +1;
    counterValue.innerHTML = moves;
    
    const isFinishedFirst = cells.every(cell => {
        return cell.value === cell.top * 4 + cell.left;
    });

    const isFinishedSecond = cells.every(cell => {
        return cell.value === cell.top * 4 + cell.left + 1;
    });

    if (isFinishedFirst || isFinishedSecond) {
        const timeValue = document.querySelector(".time_value");
        alert(`Ура! Вы решили головоломку за ${timeValue.innerHTML} и ${counterValue.innerHTML} ходов`);
    }

}

const createField = () => {
    if (startGameButton.parentNode) {
        startGameButton.parentNode.removeChild(startGameButton);
    }
    
    const field = document.querySelector(".field");

    const numbers = [...Array(15).keys()]
      .sort(()=> Math.random() - 0.5);

for (let i = 1; i <=15; i++){
    const cell = document.createElement("div");
    const value = numbers[i - 1] + 1;
    cell.className = "cell";
    cell.innerHTML = value;

    const left = i % 4;
    const top = (i-left) / 4;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    });

    cell.style.left = `${left * cellSize}px`; 
    cell.style.top = `${top * cellSize}px` ;
    field.append(cell);

    cell.addEventListener("click", () =>{
        move(i);
    });
   
    };


};

const clearField = () => {
    const field = document.querySelector(".field");
    const counterValue = document.querySelector(".counter_value");
    cells = [];
    empty = {
        value: 0,
        top: 0,
        left: 0
    };
    cells.push(empty);
    const cellsList = document.querySelectorAll(".cell");
    cellsList.forEach((cell) => {
    field.removeChild(cell); 
    });
    moves = 0;
    counterValue.innerHTML = moves;
    clearInterval(interval);
    seconds = 0;
    let timeValue = document.querySelector(".time_value");
    timeValue.innerHTML = "00:00";
}

startGameButton.addEventListener("click", () =>{
    createGame();
    createField();
    interval = setInterval(() => updateTime(), 1000);
});

newGameButton.addEventListener("click", () => {
    clearField();
    createField();
    interval = setInterval(() => updateTime(), 1000);
});