let total = 0
let buffer = '0'
let operator = null

const screen = document.querySelector('.screen')

const buttons = document.querySelectorAll('.calc-btn')

function buttonClick(value) {
    // console.log(value)
    if(isNaN(value)) {
        // console.log(value)
        handleSymbol(value)
    } else {
        // console.log(value)
        handleNumber(value)
    }
    screen.textContent = buffer
}

function handleSymbol(symbol) {
    if(symbol === '←'){
        if (buffer.length === 1) {
            buffer = '0'
        } else {
            buffer = buffer.substring(0, buffer.length - 1)
        }
    }
    if(symbol === 'C') {
        operator = null
        buffer = '0'
        total = 0
    }
    if(symbol === '=') {
        if(operator === null){
            return
        }
        calculate(parseInt(buffer))
        operator = null
        buffer = (total % 1 === 0)?  total : total.toFixed(5)
        total = 0
    }  else if (symbol === '+' || symbol === '-' || symbol === '×' || symbol === '÷'){
        handleMath(symbol)
    }
}

function handleNumber(numStr) {
    if(buffer === '0') {
        buffer = numStr
    } else {
        buffer += numStr
    }
}

function handleMath(symbol) {
    if(buffer === '0') {
        return
    }
    const intBuffer = parseInt(buffer)
    if(total === 0) {
        total = intBuffer
    } else {
        calculate(intBuffer)
    }
    operator = symbol
    buffer = '0'
}

function calculate(intBuffer) {
    if(operator === '+'){
        total += intBuffer
    } else if (operator === '-') {
        total -= intBuffer
    } else if (operator === '÷') {
        total /= intBuffer
    } else if (operator === '×') {
        total *= intBuffer
    } 
}

buttons.forEach(button => {
    button.addEventListener('click', event => {
        buttonClick(event.target.textContent)
    })
})

