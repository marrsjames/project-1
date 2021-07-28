const canvas = document.querySelector('#background')
const heliCanvas = document.querySelector('#heli')
const topBlockContext = canvas.getContext('2d');
const bottomBlockContext = canvas.getContext('2d');
const heliContext = heliCanvas.getContext('2d')
const background = document.querySelector('body')
const currentScore = document.querySelector('#score')
const currentLevel = document.querySelector('#level')
const img = new Image();
img.src = 'assets/heli.png';
topBlockContext.fillStyle = 'yellow'
let one = 1
let heliXInitial = 200
let initialBlockHeights = 20
let score = 0
let hundred = 0
let level = 1
currentScore.textContent = score;
currentLevel.textContent = level;

const helicopter = {
    xPosition: heliXInitial,
    yPosition: 0,
    xMoveInitial: 0,
    yMoveInitial: 1,
    topPaddleX: 150,
    bottomPaddleX: 100 ,
    width: 100,
    height: 33  
}
let xMove = helicopter.xMoveInitial
let yMove = helicopter.yMoveInitial

const topBlockLimits = {
  height: initialBlockHeights,
}
const bottomBlockLimits = {
  height: initialBlockHeights,
}


function makeMountainArrays() {
topMountainArray = []
bottomMountainArray = []

//pre entering cave 400 parts///////
//top
let topBlockY = 0
let bottomBlockY = 0
for (let i = 0; i<= 399; i++) {
    topMountainArray.push(0)
    bottomMountainArray.push(0)
  }  

/// slope into cave///////////
//top
for (let i = 400; i<= 400+topBlockLimits.height-1; i++) {
    topMountainArray.push(i-400)
}

//bottom
for (let i = 400; i<= 400+bottomBlockLimits.height-1; i++) {
  bottomMountainArray.push(i-400)
}

//cave enter////////////////
//top
topBlockY = topBlockLimits.height
let topCounter = 0
for (let i = 500; i<= 99999; i++) {
  if (topCounter % 1000 === 0 && topCounter > 0){
    topBlockLimits.height +=20
  }
  topMountainArray.push(topBlockY) 
  randNo = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
  if (randNo === 5){
    one = -one;
  } 

  if (topBlockY + one <= 0){
    one = -one;
} else if (topBlockY + one >= topBlockLimits.height){
  one = -one;
}
topBlockY = topBlockY + one;
topCounter++
}


//bottom part
bottomBlockY = bottomBlockLimits.height
let bottomCounter = 0
for (let i = 500; i<= 99999; i++) {
  if (bottomCounter % 1000 === 0 && bottomCounter > 0){
    bottomBlockLimits.height +=20
  }
  bottomMountainArray.push(bottomBlockY) 
  randNo = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
  if (randNo === 5){
    one = -one;
  } 

  if (bottomBlockY + one <= 0){
    one = -one;
} else if (bottomBlockY + one >= bottomBlockLimits.height){
  one = -one;
}
bottomBlockY = bottomBlockY + one;
bottomCounter++
}

}

makeMountainArrays()
let gamePosition = 0



//background movement
let gameContinue = true;
const handlegame = setInterval(() => {
  topBlockContext.clearRect(0, 0, 400, 300)
  for (let i = 0; i<= 400; i++) {
    topBlockContext.fillRect(i, 0, 1, topMountainArray[gamePosition + i])
  }
   for (let i = 0; i<= 400; i++) {
    bottomBlockContext.fillRect(i, 300 - bottomMountainArray[gamePosition + i], 1, bottomMountainArray[gamePosition + i])
   }
   heliMovement()
   function heliMovement() {
   heliContext.clearRect(0, 0, 400, 300)
   heliContext.drawImage(img, helicopter.xPosition, helicopter.yPosition, 100, 33);
     //helicopter.xPosition += xMove
     helicopter.yPosition += yMove
   
     //heli collision
     for (let i = 0; i<= helicopter.width; i++) {
     if (helicopter.yPosition <= topMountainArray[gamePosition+heliXInitial+i]) {
     //  console.log('top collisio')
     background.classList.add('collision')
    gameContinue = false;
     setTimeout(reset, 2000);
     yMove = 0
//     clearInterval(handlegame)     
     }  
     else if (helicopter.yPosition + helicopter.height >= 300 - bottomMountainArray[gamePosition + heliXInitial + i]) {
     //  console.log('bottom collision')
       background.classList.add('collision') 
      gameContinue = false;
       setTimeout(reset, 2000);
       yMove = 0
//       clearInterval(handlegame)
     }
     else {
      //   console.log('safe')
         background.classList.remove('collision')    
     }
     }
    }

    if (gameContinue === true){
 gamePosition++
}

 if (gamePosition >= 200) {
 if (gamePosition % 10 === 0) {
  score++
  currentScore.textContent = score
  if (score % 100 === 0) {
    level++
    currentLevel.textContent = level
   }
 }

}
 
  }, 10)



function onkeydown(e) {
    //up key
    if (e.keyCode === 38) {
      yMove = -2
    } 
    if (e.keyCode === 40) {
      yMove = helicopter.yMoveInitial + 1 
 }
  }

  function onkeyup(e) {
    //up key
    if (e.keyCode === 38) {
      yMove = helicopter.yMoveInitial
    }
  }

  function reset() {
      helicopter.xPosition = heliXInitial
      helicopter.yPosition = 0
      xMove = helicopter.xMoveInitial
      yMove = helicopter.yMoveInitial
      gamePosition = 0
      score = 0
      level = 1
      gameContinue = true
      currentLevel.textContent = level
      currentScore.textContent = score
    }
  window.addEventListener("keydown", onkeydown);
  window.addEventListener("keyup", onkeyup);
  heliCanvas.addEventListener('click', reset)
