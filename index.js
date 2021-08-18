const cells = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageTextEl = document.querySelector('[data-winning-message-text]')
const winningMessageEl = document.getElementById('win-el')
const restartButton = document.getElementById('restart-button')

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let circleTurn = false

startGame() 

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', clickHandler)
        cell.addEventListener('click', clickHandler, { once: true })
    })
    setBoardHoverClass()
    winningMessageEl.classList.remove('show')
}

function clickHandler(e) {
    //placemark
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)

    //check win
    if(checkWin(currentClass)) {
        endGame(false) //sending draw value as false
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        //set hover class
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WIN_COMBOS.some(combo => {
        return combo.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    console.log('here')
    return [...cells].every(cell => {
        console.log(cell)
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })

}

function endGame(draw) {
    if(draw) {
        winningMessageTextEl.innerText = 'Game Drawn !'
        winningMessageEl.classList.add('show')
    } else {
        winningMessageTextEl.innerText = `${circleTurn ? 'Os' : 'Xs'} Win !`
        winningMessageEl.classList.add('show')
    }
}

restartButton.addEventListener('click', startGame)