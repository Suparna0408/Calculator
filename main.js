class Calculator{
    constructor(firstOperandTextElement, secondOperandTextElement){
        this.firstOperandTextElement = firstOperandTextElement;
        this.secondOperandTextElement = secondOperandTextElement;
        this.clear();
    }

    clear(){
        this.firstOperand = '';
        this.secondOperand = '';
        this.operator = undefined;
    }

    appendNumber(number){
        if(number == '.' && this.secondOperand.includes('.')) return;
        this.secondOperand = this.secondOperand.toString() + number.toString();
        // this.secondOperand = number;
    }

    delete(){
        this.secondOperand = this.secondOperand.toString().slice(0, -1);
    }

    chooseOperation(operation){
        if(this.secondOperand == '') return;
        if(this.firstOperand != ''){
            this.compute();
        }
        this.operator = operation;
        this.firstOperand = this.secondOperand;
        this.secondOperand = '';
    }

    compute(){
        let computation;
        const first = parseFloat(this.firstOperand);
        const second = parseFloat(this.secondOperand);
        if(isNaN(first) || isNaN(second)) return;
        switch (this.operator){
            case '/':
                computation = first / second;
                break;
            case '*':
                computation = first * second;
                break;
            case '+':
                computation = first + second;
                break;
            case '-':
                computation = first - second;
                break;
            default:
                return;
        }
        this.secondOperand = computation;
        this.operator = undefined;
        this.firstOperand = '';
        // this.result = computation;
    }

    showDisplay(){
        this.secondOperandTextElement.innerText = this.updateDisplay(this.secondOperand);
        if(this.operator !=null){
            this.firstOperandTextElement.innerText = `${this.firstOperand} ${this.operator}`;
        }
        else{
            this.firstOperandTextElement.innerText = '';
        }
    }

    updateDisplay(number){
        const stringNumber = number.toString();
        const integerpart = parseFloat(stringNumber.split('.')[0]);
        const decimalpart = stringNumber.split('.')[1];
        let finalInteger;
        if (isNaN(integerpart)){
            finalInteger = '';
        }
        else{
            finalInteger = integerpart.toLocaleString('en',{maximumFractionDigits: 0 })
        }

        if (decimalpart != null){
            return `${finalInteger}.${decimalpart}`;
        }
        else{
            return finalInteger;
        }
    }
}






// const numberBtns = document.querySelectorAll('[data-number]');
let numberBtns = document.querySelectorAll(".digits");
const operatorsBtns = document.querySelectorAll('.operators');
const equalBtn = document.querySelector('.equal-btn');
const deleteBtn = document.querySelector('.del-btn');
const allClearBtn = document.querySelector('.ac-btn');
const firstOperandTextElement = document.querySelector('.first-operand');
const secondOperandTextElement = document.querySelector('.second-operand');
const result = document.querySelector(".result");



const newCalculator = new Calculator(firstOperandTextElement, secondOperandTextElement);

//Here btn treats like index variable
numberBtns.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        newCalculator.appendNumber(btn.innerText);
        // console.log(btn.innerText);
        newCalculator.showDisplay();
    })

})
operatorsBtns.forEach(button =>{
    button.addEventListener('click', ()=>{
        newCalculator.chooseOperation(button.innerText);
        // console.log(button.innerText);
        newCalculator.showDisplay();
    })

})
equalBtn.addEventListener('click', btn =>{
    newCalculator.compute();
    newCalculator.showDisplay();

})
allClearBtn.addEventListener('click', btn =>{
    newCalculator.clear();
    newCalculator.showDisplay();

})
deleteBtn.addEventListener('click', btn =>{
    newCalculator.delete();
    newCalculator.showDisplay();

})