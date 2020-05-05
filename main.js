let arrayOfNumbers = [];
let arrayLength = 0;
let currentText = "";
let equalsButtonPressed = false;
let textOnScreen = document.getElementById('text');
const textOnScreenParentElement = document.querySelector('.large-screen');

function addAndRemoveClasses(){
    textOnScreenParentElement.classList.remove('large-screen');
    textOnScreenParentElement.classList.add('small-screen');
}
const decreaseTheTextSize = () => addAndRemoveClasses();

function checksIfTheTextLengthIsMoreThanLimit(){
    if(currentText.length>10){
        decreaseTheTextSize();
    }
}
function roundTheNumberToTwoPlaces(){
    if (currentText.includes(".") && equalsButtonPressed) {
        currentText = Number(currentText).toFixed(2);
    }
}
function showResultOnScreen(result) {
    console.log(currentText.length);
    checksIfTheTextLengthIsMoreThanLimit();
    currentText = '' + result;
    roundTheNumberToTwoPlaces();
    textOnScreen.innerHTML = currentText;
}

const pushNumberToArray = currentText => arrayLength = arrayOfNumbers.push(currentText);

const pushOperatorToArray = arithmeticOperator => arrayLength = arrayOfNumbers.push(arithmeticOperator);

function calculate(arrayOfNumbers) {
    for (let index = 0; index <= arrayLength - 3; index += 2) {
        let result = '';
        let numberOne = parseFloat(arrayOfNumbers[index]);
        let arithmeticOperator = arrayOfNumbers[index + 1];
        let numberTwo = parseFloat(arrayOfNumbers[index + 2]);
        result += operate(arithmeticOperator, numberOne, numberTwo);
        arrayOfNumbers[index + 2] = parseFloat(result);
        equalsButtonPressed = true;
        showResultOnScreen(arrayOfNumbers[index + 2]);
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

const add = (numberOne, numberTwo) => numberOne + numberTwo;
const subtract = (numberOne, numberTwo) => numberOne - numberTwo;
const multiply = (numberOne, numberTwo) => numberOne * numberTwo;
const divide = (numberOne, numberTwo) => numberOne / numberTwo;
const clearArray = () => arrayOfNumbers.length = 0;

function uncheckEqualsButtonIfChecked() {
    if (equalsButtonPressed) {
        clearArray();
    }
    equalsButtonPressed = false;
}

const numberButtons = document.querySelectorAll('.keypad-numbers');

numberButtons.forEach((number) => {
    number.addEventListener('click', (e) => {
        if(currentText.length<32){
            currentText += number.textContent;
            showResultOnScreen(currentText);
            screenHasNumber = true;
        }
        else{
            alert('You have reached the limit. Please delete some characters if you wish to continue');
        }
    });
});

const operatorButtons = document.querySelectorAll('.keypad-operators');
let screenHasNumber = false;

operatorButtons.forEach((operator) => {
    operator.addEventListener('click', (e) => {

        uncheckEqualsButtonIfChecked();
        let currentOperator = operator.textContent;
        if (textOnScreen !== "" && screenHasNumber) {
            textOnScreen.innerHTML = operator.textContent;
            pushNumberToArray(currentText);
            pushOperatorToArray(currentOperator);
            currentText = "";
            screenHasNumber = false;
        }
    })
})

const equalsButton = document.getElementById('equals');

equalsButton.addEventListener('click', (e) => {
    if (!screenHasNumber && textOnScreen !== "" || equalsButtonPressed) {
        alert('Please enter the next number');
    }
    else {
        if (arrayLength > 0 && screenHasNumber) {
            console.log(currentText);
            pushNumberToArray(currentText);
            calculate(arrayOfNumbers);
            checksIfTheTextLengthIsMoreThanLimit();
        }
    }
    equalsButtonPressed = true;
});

const clearScreenButton = document.getElementById('clear-screen');

clearScreenButton.addEventListener('click', (e) => {
    textOnScreen.innerHTML = "";
    currentText = "";
    clearArray();
    screenHasNumber = false;
    equalsButtonPressed = false;
    textOnScreenParentElement.classList.add('large-screen');
    textOnScreenParentElement.classList.remove('small-screen');
});

const plusMinus = document.getElementById('plus-minus');

plusMinus.addEventListener('click', (e) => {
    if(!currentText.includes('-')){
        uncheckEqualsButtonIfChecked();
        currentText = '-' + currentText;
        showResultOnScreen(currentText);
        equalsButtonPressed = false;
    }
    else if(currentText.length>1 && currentText.includes('-')){
        uncheckEqualsButtonIfChecked();
        currentText = currentText.substr(1);
        showResultOnScreen(currentText);
        equalsButtonPressed = false;
    }
});

const percentOf = document.getElementById('percentage');

percentOf.addEventListener('click', (e) => {
    uncheckEqualsButtonIfChecked();
    if (screenHasNumber) {
        arrayLength = arrayOfNumbers.push(parseFloat(currentText / 100));
        arrayLength = arrayOfNumbers.push('X');
        console.log(parseFloat(currentText / 100));
        currentText = '%';
        showResultOnScreen(currentText);
        currentText = "";
        equalsButtonPressed = false;
    }
});

const decimalButton = document.getElementById('decimal');

decimalButton.addEventListener('click', (e) => {
    if (screenHasNumber && !currentText.includes('.')) {
        currentText += '.';
        showResultOnScreen(currentText);
    }
});

const backSpaceButton = document.getElementById('backspace');

backSpaceButton.addEventListener('click', (e) => {
    if (screenHasNumber) {
        if (currentText.length > 1) {
            currentText = currentText.substring(0, currentText.length - 1);
        }
        else if (currentText != ' ') {
            currentText = '0';
        }
        showResultOnScreen(currentText);
    }
})
