function add(numberOne , numberTwo){
    return numberOne+numberTwo;
}

function subtract(numberOne , numberTwo){
    return numberOne-numberTwo;
}

function multiply(numberOne , numberTwo){
    return numberOne*numberTwo;
}

function divide(numberOne , numberTwo){
    return numberOne/numberTwo;
}

function operate(operator , numberOne , numberTwo){
    switch(operator){
        case '+' : 
            add(numberOne , numberTwo);
            break;
        case '-' :
            subtract(numberOne , numberTwo);
            break;
        case '*' :
            multiply(numberOne , numberTwo);
            break;
        case '/' :
            divide(numberOne , numberTwo);
            break;
    }
}
