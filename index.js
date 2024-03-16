const btnNumber = document.querySelector('#numbersBtn')
const btnWeight = document.querySelector('#weightsBtn')
const btnNoWeight = document.querySelector('#noWeightsBtn')
const inputNumber = document.querySelector('#number')
const inputWeight = document.querySelector('#weight')
let numbers = []
let weights = []

function showNumber(n) {
    const spanNumbers = document.querySelector('#numbers')
    spanNumbers.append(`${n} `)
}

function showWeight(w) {
    const spanWeights = document.querySelector('#weights')
    spanWeights.append(`${w} `)
}

function simpleMean() {
    let total = numbers.length
    let sum = numbers.reduce((acc, number) => acc + number, 0)
    return (sum / total).toFixed(2).replace(".",",")
}

function weightedMean() {
    total = numbers.length
    let sum = numbers.reduce((acc, number, i) => acc + (number * weights[i]), 0)
    return (sum / total).toFixed(2).replace(".",",")
}

function median() {
    if (numbers.length % 2 != 0) {
        const orderedNumbers = numbers.sort((a, b) => a - b)
        const total = orderedNumbers.length / 2
        return (orderedNumbers[Math.trunc(total)]).toFixed(2).replace(".",",")
    } else {
        const orderedNumbers = numbers.sort((a, b) => a - b)
        const total = orderedNumbers.length / 2
        return (((orderedNumbers[Math.trunc(total)]) + (orderedNumbers[Math.trunc(total) - 1])) / 2).toFixed(2).replace(".",",")
    }
}

function mode() {
    const frequency = numbers.reduce((acc, number) => {
        if (number in acc) 
            acc[number]++
        else 
            acc[number] = 1
        return acc
    }, {}) 
    const highFrequency = Math.max(...Object.values(frequency)) 
    if (highFrequency !== 1) {
        const mode = Object.keys(frequency).filter(key => frequency[key] === highFrequency)
        return mode.join(", ")
    } else {
        return "-"
    }
}

// Send Numbers btn
document.querySelector('#numbersBtn').addEventListener('click', () => {
    const number = Number(document.querySelector('#number').value)
    numbers.push(number)
    showNumber(number)
    inputNumber.value = ''
})

// Send Weights btn
document.querySelector('#weightsBtn').addEventListener('click', () => {
    if (weights.length < numbers.length) {
        btnNoWeight.setAttribute('disabled', 'true') 
        const weight = Number(document.querySelector('#weight').value)
        if (weight === 0) {
            alert("The value '0' is not allowed. Enter a value starting from '1'.")
        } else {
            weights.push(weight)
            showWeight(weight)
            inputWeight.value = ''
        }
    } else {
        alert("Number of weights must be the same as the numbers.")
        inputWeight.value = ''
    }
})

// No Weights btn
document.querySelector('#noWeightsBtn').addEventListener('click', () => {
    if (numbers.length !== 0) {
        for (i = 0; i < numbers.length; i++) {
            weights[i] = 1
            }
        const spanWeights = document.querySelector('#weights')
        spanWeights.append(...weights.join(" ")) 
        btnNumber.setAttribute('disabled', 'true') 
        btnWeight.setAttribute('disabled', 'true') 
        btnNoWeight.setAttribute('disabled', 'true') 
    } else {
        alert("Numbers was not defined.")
    }
})

// Calculate btn
document.querySelector('#calculateBtn').addEventListener('click', () => {
    if (numbers.length !== 0 && weights.length !== 0) {
        if (weights.length !== numbers.length) {
            alert("Number of weights must be the same as the numbers.")
        } else {
            document.querySelector('#simpleResult').textContent = simpleMean()
            document.querySelector('#medianResult').textContent = median()
            document.querySelector('#modeResult').textContent = mode() 
            document.querySelector('#weightedResult').textContent = weightedMean() 
        }       
    } else {
        alert("Numbers and/or weights was not defined. Please fill in the necessary fields for the calculations.")
    }
})

// Clear Numbers btn
document.querySelector('#clearBtn').addEventListener('click', () => {
    numbers = []
    weights = []
    document.querySelector('#number').value = ''
    document.querySelector('#weight').value = ''
    document.querySelector('#numbers').textContent = ''
    document.querySelector('#weights').textContent = ''
    document.querySelector('#simpleResult').textContent = ''
    document.querySelector('#weightedResult').textContent = ''
    document.querySelector('#medianResult').textContent = ''
    document.querySelector('#modeResult').textContent = ''
    btnNumber.disabled = false
    btnWeight.disabled = false
    btnNoWeight.disabled = false
})


