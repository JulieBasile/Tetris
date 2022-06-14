document.addEventListener('DOMContentLoaded', () => {
    //all code encapsulates here
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10 
    let nextRandom = 0
    let timerId 
    let score = 0

    //Tetrominoes (4 tetris shapes)
    const lTetromino = [
        [1,width+1,width*2+1,2],
        [width,width+1,width+2,width*2+2],
        [1,width+1,width*2+1,width*2],
        [width,width*2,width*2+1,width*2+2],
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2,width*2+1],
    ] 

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1],
    ] 

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
    ] 

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
    ] 
})

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
let currentPosition = 5
let currentRotation = 0

console.log(theTetrominoes[0][0])

//randomly select tetromino and its first rotation
let random = Math.floor(Math.random()*theTetrominoes.length)
let current = theTetrominoes[random] [currentRotation]

//drawing the tetromino
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = color[random]
    })
}

//undrawing the tetromino
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
    })
}

//making tetromino move per second
timerId = setInterval(moveDown, 1000) 

//function move down
function moveDown() {
    undraw()
    currentPosition += width
    draw()
}

//freeze tetrominoes from going out of frame
function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      //continue tetrominoes flowing once piece lands
      random = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 5
      draw()
    }
}  