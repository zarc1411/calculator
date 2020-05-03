const numberButtons = document.querySelectorAll('.number');
let currentNumber = "";

numberButtons.forEach((number) => {
    number.addEventListener('click', (e) => {
        currentNumber += number.textContent;
        displayNumbersOnScreen(currentNumber);
        screenHasNumber = true;
    });
});

let textOnScreen = document.getElementById('text');

function displayNumbersOnScreen(currentNumber) {
    textOnScreen.innerHTML = currentNumber;
}

const operatorButtons = document.querySelectorAll('.operator');
let screenHasNumber = true;
let equalsButtonPressed = false;

operatorButtons.forEach((operator) => {
    operator.addEventListener('click', (e) => {

        if(equalsButtonPressed){
            arrayOfNumbers.length = 0;
            equalsButtonPressed = false;
        }
        let currentOperator = operator.textContent;
        if (textOnScreen !== "" && screenHasNumber) {
            textOnScreen.innerHTML = operator.textContent;
            pushNumberToArray(currentNumber);
            pushOperatorToArray(currentOperator);
            currentNumber = "";
            screenHasNumber = false;
        }
    })
})

let arrayOfNumbers = [];
let arrayLength = 0;

function pushNumberToArray(currentNumber) {
    arrayLength = arrayOfNumbers.push(currentNumber);
}

function pushOperatorToArray(arithmeticOperator) {
    arrayLength = arrayOfNumbers.push(arithmeticOperator);
}

const equalsButton = document.getElementById('equals');

equalsButton.addEventListener('click', (e) => {
    if (!screenHasNumber && textOnScreen !== "") {
        alert('Please enter the next number');
    }
    else {
        if (arrayLength > 0 && screenHasNumber) {
            console.log(currentNumber);
            pushNumberToArray(currentNumber);
            calculate(arrayOfNumbers);
        }
    }
    equalsButtonPressed = true;
});

function calculate(arrayOfNumbers) {
    for (let index = 0; index <= arrayLength - 3; index+=2) {
        let result = '';
        let numberOne = parseInt(arrayOfNumbers[index]);
        let arithmeticOperator = arrayOfNumbers[index + 1];
        let numberTwo = parseInt(arrayOfNumbers[index + 2]);
        result += operate(arithmeticOperator, numberOne, numberTwo);
        arrayOfNumbers[index+2] = parseInt(result);
        showResultOnScreen(arrayOfNumbers[index+2]);
    }
}

function operate(operator, numberOne, numberTwo) {
    let currentResult;
    switch (operator) {
        case '+':
            currentResult = add(numberOne, numberTwo);
            break;
        case '-':
            currentResult = subtract(numberOne, numberTwo);
            break;
        case 'X':
            currentResult = multiply(numberOne, numberTwo);
            break;
        case '/':
            currentResult = divide(numberOne, numberTwo);
            break;
    }
    console.log(currentResult);
    return currentResult;
}

function add(numberOne, numberTwo) {
    return numberOne + numberTwo;
}

function subtract(numberOne, numberTwo) {
    return numberOne - numberTwo;
}

function multiply(numberOne, numberTwo) {
    return numberOne * numberTwo;
}

function divide(numberOne, numberTwo) {
    return numberOne / numberTwo;
}

function showResultOnScreen(result) {
    currentNumber = '' + result;
    textOnScreen.innerHTML = currentNumber;
    //arrayOfNumbers.length = 0; //This clears the array
    //arrayOfNumbers.push(currentNumber);
}