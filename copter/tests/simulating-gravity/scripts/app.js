const canvas = document.querySelector('canvas')
const heliContext = canvas.getContext('2d')
const img = new Image();
img.src = 'assets/heli.png';


heliContext.fillStyle = 'yellow'
const helicopter = {
    xPosition: 200,
    yPosition: 0,
    xMoveInitial: 0,
    yMoveInitial: 10,
    topPaddleX: 150,
    bottomPaddleX: 100   
}
let xMove = helicopter.xMoveInitial
let yMove = helicopter.yMoveInitial

//helicopter movement
  setInterval(() => {
    heliContext.clearRect(0, 0, 400, 300)
  //  context.fillRect(helicopter.xPosition, helicopter.yPosition, 20, 20)
  heliContext.drawImage(img, helicopter.xPosition, helicopter.yPosition, 100, 33);
    helicopter.xPosition += xMove
    helicopter.yPosition += yMove

  }, 50)

function onkeydown(e) {
    //up key
    if (e.keyCode === 38) {
         helicopter.yPosition -= 60;
        console.log('hello')
    }
  }

  function reset() {
      helicopter.xPosition = 200
      helicopter.yPosition = 0
      xMove = helicopter.xMoveInitial
      yMove = helicopter.yMoveInitial
    }
  window.addEventListener("keydown", onkeydown);
  canvas.addEventListener('click', reset)