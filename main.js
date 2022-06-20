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
    const colors = ['purple', 'blue', 'violet', 'yellow', 'orange'];

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
        squares[currentPosition + index].style.backgroundColor = colors[random]
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

    //keyCodes using arrow keycodes 
    function control(e) {
      if(e.keyCode === 37) {
        moveLeft() 
      } else if (e.keyCode === 38) {
        rotate()
      } else if (e.keyCode === 39) {
        moveRight()
      } else if (e.keycode === 40) {
        moveDown()
      }
    }
    document.addEventListener('keyup', control)

    //move tetromino down
    function moveDown() {
      undraw()
      currentPosition += width
      draw()
      freeze()
    }

    //freeze tetromino from going out of frame
    function freeze() {
      if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      //continue tetrominoes flowing once piece lands
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      updateScore()
    }
}  

//move tetromino to left edge 
function moveLeft() {
  undraw()
  const leftEdge = current.some(index => (currentPosition + index) % width === 0)
  if(!leftEdge) currentPosition -=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition +=1
  }
  draw()
}

//move tetromino to right edge
function moveRight() {
  undraw()
  const rightEdge = current.some(index => (currentPosition + index) % width === width -1)
  if(!rightEdge) currentPosition +=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -=1
  }
  draw()
}

//rotate tetromino
function rotate() {
  undraw()
  currentRotation ++
  if(currentRotation === current.length) { //if the current rotation goes to 5, make it go to 0
    currentRotation = 0 
  }
  current = theTetrominoes [random][currentRotaion]
  draw()
}

})