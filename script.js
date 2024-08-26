let display = document.getElementById('display');
let buttons = document.querySelectorAll('.button-grid button');

let calculator = {
    displayValue: '',
    firstOperand: null,
    secondOperand: null,
    operator: null,
    isOperatorClicked: false,
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let buttonText = button.textContent;

        if (buttonText === 'C') {
            calculator.displayValue = '';
            calculator.firstOperand = null;
            calculator.secondOperand = null;
            calculator.operator = null;
            calculator.isOperatorClicked = false;
            display.value = '';
        } else if (buttonText === '=') {
            if (calculator.firstOperand && calculator.operator && calculator.secondOperand) {
                let result = calculate(calculator.firstOperand, calculator.secondOperand, calculator.operator);
                calculator.displayValue = result;
                calculator.firstOperand = null;
                calculator.secondOperand = null;
                calculator.operator = null;
                calculator.isOperatorClicked = false;
                display.value = result;
            }
        } else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
            if (calculator.displayValue !== '') {
                calculator.firstOperand = parseFloat(calculator.displayValue);
                calculator.operator = buttonText;
                calculator.displayValue = '';
                calculator.isOperatorClicked = true;
            }
        } else {
            if (calculator.isOperatorClicked) {
                calculator.secondOperand = calculator.secondOperand ? calculator.secondOperand + buttonText : buttonText;
                display.value = calculator.secondOperand;
            } else {
                calculator.displayValue += buttonText;
                display.value = calculator.displayValue;
            }
        }
    });
});

function calculate(firstOperand, secondOperand, operator) {
    let result;

    switch (operator) {
        case '+':
            result = firstOperand + parseFloat(secondOperand);
            break;
        case '-':
            result = firstOperand - parseFloat(secondOperand);
            break;
        case '*':
            result = firstOperand * parseFloat(secondOperand);
            break;
        case '/':
            result = firstOperand / parseFloat(secondOperand);
            break;
        default:
            result = 'Error';
    }

    return result;
}