const canvas = document.querySelector('#background')
const heliCanvas = document.querySelector('#heli')
const topBlockContext = canvas.getContext('2d');
const bottomBlockContext = canvas.getContext('2d');
const heliContext = heliCanvas.getContext('2d')
const background = document.querySelector('body')
const img = new Image();
img.src = 'assets/heli.png';
topBlockContext.fillStyle = 'yellow'
let one = 1

const helicopter = {
    xPosition: 200,
    yPosition: 0,
    xMoveInitial: 0,
    yMoveInitial: 1,
    topPaddleX: 150,
    bottomPaddleX: 100   
}
let xMove = helicopter.xMoveInitial
let yMove = helicopter.yMoveInitial

const topBlockLimits = {
  height: 140,
  changeWidth: 200
}
const bottomBlockLimits = {
  height: 140,
  changeWidth: 200
}


topMountainArray = []
bottomMountainArray = []
//let topBlockY = Math.floor(Math.random() * (topBlockLimits.height - 1 + 1)) + 1;
////////TOP PART////////////
//pre entering cave 400 parts
let topBlockY = 0
for (let i = 0; i<= 399; i++) {
    topMountainArray.push(0)
}

/// slope into cave
for (let i = 400; i<= 400+topBlockLimits.height-1; i++) {
    topMountainArray.push(i-400)
}

//cave enter
topBlockY = topBlockLimits.height
for (let i = 500; i<= 99999; i++) {
  topMountainArray.push(topBlockY) 
  randNo = Math.floor(Math.random() * (11 - 1 + 1)) + 1;
  if (randNo === 5){
    one = -one;
  } 

  if (topBlockY + one <= 0){
    one = -one;
} else if (topBlockY + one >= topBlockLimits.height){
  one = -one;
}
topBlockY = topBlockY + one;
}

////////BOTTOM PART////////////
//pre entering cave 400 parts
let bottomBlockY = 0
for (let i = 0; i<= 399; i++) {
  bottomMountainArray.push(0)
}

/// slope into cave
for (let i = 400; i<= 400+bottomBlockLimits.height-1; i++) {
  bottomMountainArray.push(i-400)
}

//cave enter
bottomBlockY = bottomBlockLimits.height
for (let i = 500; i<= 99999; i++) {
  bottomMountainArray.push(bottomBlockY) 
  randNo = Math.floor(Math.random() * (11 - 1 + 1)) + 1;
  if (randNo === 5){
    one = -one;
  } 

  if (bottomBlockY + one <= 0){
    one = -one;
} else if (bottomBlockY + one >= bottomBlockLimits.height){
  one = -one;
}
bottomBlockY = bottomBlockY + one;
}

let gamePosition = 0

//heli and background movement
setInterval(() => {
  topBlockContext.clearRect(0, 0, 400, 300)
  for (let i = 0; i<= 400; i++) {
    topBlockContext.fillRect(i, 0, 1, topMountainArray[gamePosition + i])
  }
   for (let i = 0; i<= 400; i++) {
    bottomBlockContext.fillRect(i, 300 - bottomMountainArray[gamePosition + i], 1, bottomMountainArray[gamePosition + i])
   }
//   bottomBlockContext.fillRect(50,80, 1, 200)

//    bottomBlockContext.fillRect(40, 40, 1, 150)
heliContext.clearRect(0, 0, 400, 300)
//  context.fillRect(helicopter.xPosition, helicopter.yPosition, 20, 20)
heliContext.drawImage(img, helicopter.xPosition, helicopter.yPosition, 100, 33);
  //helicopter.xPosition += xMove
  helicopter.yPosition += yMove



  //heli collision
  // for (let j = 0; j<= 100; j++) {
  //   if (helicopter.xPosition = 200 + i)
  //   if (helicopter.yPosition <= topMountainArray[gamePosition+200]) {
  //     console.log('top reached')
  //     background.classList.add('collision')
  //   }
  //   }
  

  if (helicopter.yPosition <= topMountainArray[gamePosition+200]) {
    console.log('top reached')
    background.classList.add('collision')

  } else if (helicopter.yPosition >= 300 - bottomMountainArray[gamePosition + 200]) {
    console.log('bottom reached')
    background.classList.add('collision')    
  } else {
    background.classList.remove('collision')
  }

 gamePosition++

  }, 10)

function onkeydown(e) {
    //up key
    if (e.keyCode === 38) {
         helicopter.yPosition -= 30;
    }
  }

  function reset() {
      helicopter.xPosition = 200
      helicopter.yPosition = 0
      xMove = helicopter.xMoveInitial
      yMove = helicopter.yMoveInitial
      gamePosition = 0

    }
  window.addEventListener("keydown", onkeydown);
  heliCanvas.addEventListener('click', reset)
