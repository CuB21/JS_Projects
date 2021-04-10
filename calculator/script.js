const numberBtnList = document.querySelectorAll('.number');
const operatorBtnList = document.querySelectorAll('.operator');
const squareOperatorBtnList = document.querySelectorAll('.square-operator');
const decimalBtn = document.getElementById('decimal');
const clearBtnList = document.querySelectorAll('.clear-btn');
const ceBtn = document.getElementById('ce');
const cBtn = document.getElementById('c');
const display = document.getElementById('display');

let isNewNumber = false;
let savedCurrentNumber = '0';
let savedPendingOperation = '';

const numberPress = (number) => {
    if (isNewNumber) {
        display.value = `${number}`;
        isNewNumber = false;
    } else {
        switch (display.value) {
            case '0':
                display.value = `${number}`;
                break;
            case '-0':
                display.value = `-${number}`;
                break;
            default:
                display.value = `${display.value}${number}`;
          }
    }
};

const decimalPress = () => {
    let localDecimalMemory = display.value;
    if (isNewNumber) {
        localDecimalMemory = '0.';
        isNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1)
            localDecimalMemory += '.';
    }
    display.value = localDecimalMemory;
};

const makeOperation = (operationFromMemory, memoryNumber) => {
    const memoryString = savedCurrentNumber.toString();
    const decimalNumber = memoryString.length - memoryString.indexOf('.') - 1;
    const decimalCurrent = memoryNumber.length - memoryNumber.indexOf('.') - 1;
    switch (operationFromMemory) {
        case '+':
            if (!memoryString.includes('.') && !memoryNumber.includes('.')) {
                savedCurrentNumber += parseFloat(memoryNumber);
            } else {
                if (decimalNumber >= decimalCurrent) {
                    savedCurrentNumber = (savedCurrentNumber + parseFloat(memoryNumber)).toFixed(decimalNumber);
                } else {
                    savedCurrentNumber = (savedCurrentNumber + parseFloat(memoryNumber)).toFixed(decimalCurrent);
                }
            }
            break;
        case '-':
            if (!memoryString.includes('.') && !memoryNumber.includes('.')) {
                savedCurrentNumber -= parseFloat(memoryNumber);
            } else {
                if (decimalNumber >= decimalCurrent) {
                    savedCurrentNumber = (savedCurrentNumber - parseFloat(memoryNumber)).toFixed(decimalNumber);
                } else {
                    savedCurrentNumber = (savedCurrentNumber - parseFloat(memoryNumber)).toFixed(decimalCurrent);
                }
            }
            break;  
        case '*':
            savedCurrentNumber = (savedCurrentNumber * parseFloat(memoryNumber)).toFixed(decimalCurrent + decimalNumber);
            break;
        case '/':
            savedCurrentNumber /= parseFloat(memoryNumber);
            break;
        default:
            savedCurrentNumber = parseFloat(memoryNumber);
            break;
    }
}

const clickOperation = (operation) => {
    let localOperationMemory = display.value;
    if (!isNewNumber && localOperationMemory === '0' && operation === '-') {
        savedCurrentNumber = '-' + localOperationMemory;
        display.value = savedCurrentNumber;
    } else if (isNewNumber && savedPendingOperation !== '=') {
        display.value = savedCurrentNumber;
    } else {
        isNewNumber = true;
        makeOperation(savedPendingOperation, localOperationMemory);
        display.value = savedCurrentNumber;
        savedPendingOperation = operation;
    }
    let savedCurrentNumberString = savedCurrentNumber.toString();
    if (savedCurrentNumberString.includes('.')) {
        //если полученное число содержит точку (то есть десятичное), то мы это число проверяем в цикле с конца
        //для определения лишних нулей после запятой, типа "0,30" и удаления их:
        for (let i = savedCurrentNumberString.length - 1; i > savedCurrentNumberString.indexOf('.'); i--) { 
            if (savedCurrentNumberString[i] === '0' && savedCurrentNumberString[i - 1] !== '0') {
                savedCurrentNumberString = savedCurrentNumberString.slice(0, -1);
            }
        }
        savedCurrentNumber = parseFloat(savedCurrentNumberString);
        display.value = savedCurrentNumber;
    }
}

const makeSquareOperation = (operation) => {
    let localOperationMemory = display.value;
    isNewNumber = false;
    if (operation === 'x<sup>2</sup>') {
        savedCurrentNumber = parseFloat(Math.pow(localOperationMemory, 2));
        localOperationMemory = savedCurrentNumber;
    } else if (operation === '√') {
        savedCurrentNumber = parseFloat(Math.sqrt(localOperationMemory));
        localOperationMemory = savedCurrentNumber;
    }
    display.value = savedCurrentNumber;
    isNewNumber = true;
}

const clearOperation = (id) => {
    if (id === 'ce') {
        display.value = '0'
        isNewNumber = true;
    } else if (id === 'c') {
        display.value = '0'
        isNewNumber = true;
        savedCurrentNumber = 0;
        savedPendingOperation = '';
    }
};

numberBtnList.forEach(number => {
    number.addEventListener('click', (e) => {
        numberPress(e.target.innerHTML);
    });
});

operatorBtnList.forEach(operator => {
    operator.addEventListener('click', (e) => {
        clickOperation(e.target.innerHTML);
    })
});

squareOperatorBtnList.forEach(operator => {
    operator.addEventListener('click', (e) => {
        makeSquareOperation(e.target.innerHTML);
    })
});

clearBtnList.forEach(clearButton => {
    clearButton.addEventListener('click', (e) => {
        clearOperation(e.target.id);
    })
});

decimalBtn.addEventListener('click', decimalPress);