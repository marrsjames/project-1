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
let isRunning = false
let level = 1
   let testarray = {
    xPosition: [],
    yPosition: [],
    xSize: [],
    ySize: []
  }
let heliWidth = 80
let heliHeight = heliWidth/3
currentScore.textContent = score;
currentLevel.textContent = level;

const helicopter = {
    xPosition: heliXInitial,
    yPosition: 0,
    xMoveInitial: 0,
    yMoveInitial: 1,
    topPaddleX: 150,
    bottomPaddleX: 100 ,
    width: heliWidth,
    height: heliHeight,
    frontAdjustment: -8,
    topAdjustment: -50
}

let randomBlockArray = {
  xPosition: [],
  yPosition: [],
  width: [],
  height: []
}

let xMove = helicopter.xMoveInitial
let yMove = helicopter.yMoveInitial

const topBlockLimits = {
  height: initialBlockHeights,
}
const bottomBlockLimits = {
  height: initialBlockHeights,
}


/////this function makes the mountain arrays that will then be drawn in the 'rungame' function
function makeMountainArrays() {
topMountainArray = []
bottomMountainArray = []

//pre entering cave 400 parts///////
//top & bottom - empty for first 400 parts
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

//cave enter and reset of game. max height of mountaints getting higher every 1000 game positions aka 1 level ////////////////
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


//bottom
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

function makeRandomBlockArrays() {

  let levelAddition = 0;
  for (let i = 1; i <= 10; i++) {
    
       for (let j = 0; j < i; j++) {
        xPositionRandNo = Math.floor(Math.random() * (1000)) + 1;
        testarray.xPosition.push(xPositionRandNo + levelAddition)
        yPositionRandNo = Math.floor(Math.random() * (300)) + 1;
        testarray.yPosition.push(yPositionRandNo)
        xSizeRandNo = Math.floor(Math.random() * (100)) + 1;
        testarray.xSize.push(xSizeRandNo)
        ySizeRandNo = Math.floor(Math.random() * (100)) + 1;
        testarray.ySize.push(ySizeRandNo)
      // topBlockContext.fillRect(blockplacement-gamePosition + xPositionRandNo, yPositionRandNo, xSize, ySize)  
      // randomBlockArray.xPosition.push(blockplacement-gamePosition + xPositionRandNo)
      // randomBlockArray.yPosition.push(yPositionRandNo)
      // randomBlockArray.width.push(xSize)
      // randomBlockArray.height.push(ySize)
       }
       levelAddition += 1000
}
}

makeMountainArrays()
makeRandomBlockArrays()
let gamePosition = 0


let gameContinue = true;
//this function makes the game run. the  mountain values are drawn and random blocks are drawn.
//the mountain arrays move fromright to left while heli stays in position so it appears as  tho heli is moving
//game position increases each time function is ran (set by setInterval)
//game position relates to iterations in the mountain arrays. these are compared with co-ordinates of heli to detect collision
//
function runGame() {
const handlegame = setInterval(() => {
  heliCanvas.addEventListener('click', reset);
  //top and bottom mountains
  topBlockContext.clearRect(0, 0, 400, 300)
  for (let i = 0; i<= 400; i++) {
    topBlockContext.fillRect(i, 0, 1, topMountainArray[gamePosition + i])
  }
   for (let i = 0; i<= 400; i++) {
    bottomBlockContext.fillRect(i, 300 - bottomMountainArray[gamePosition + i], 1, bottomMountainArray[gamePosition + i])
   }

   //random blocks
   //every 1000... random amount of randomly placed blocks getting larger and more frequent
   // should the random blocks be 1 extra per level or a random number getting more regular?

   let blockplacement = 400;

         // const testarray = [300, 626, 543]
          for (let j = 0; j <= testarray.xPosition.length; j++) {
            yRandomPosition = Math.floor(Math.random() * (300)) + 1;
          topBlockContext.fillRect(blockplacement-gamePosition + testarray.xPosition[j], testarray.yPosition[j], testarray.xSize[j], testarray.ySize[j])  
          randomBlockArray.xPosition.push(blockplacement-gamePosition + testarray.xPosition[j])
          randomBlockArray.yPosition.push(testarray.yPosition[j])
          randomBlockArray.width.push(testarray.xSize[j])
          randomBlockArray.height.push(testarray.ySize[j])
          }


   heliMovement()

   function heliMovement() {
    //  if (gamePosition <= 200) {
    //    helicopter.topAdjustment = 0;
    //  } else {
    //   helicopter.topAdjustment = helicopter.topAdjustment
    //  }
    isRunning = true
   heliContext.clearRect(0, 0, 400, 300)
   heliContext.drawImage(img, helicopter.xPosition, helicopter.yPosition, helicopter.width, helicopter.height);
     //helicopter.xPosition += xMove
     helicopter.yPosition += yMove
   
    //heli collision front (&back?) RANDOM BLOCKS NEEDS ADDING TOO
//    for (let i = 0; i<= helicopter.height; i++) {
       for (let j = 0; j<= 100; j++){

        if (gamePosition + heliXInitial + helicopter.width + helicopter.frontAdjustment >= randomBlockArray.xPosition[j] && gamePosition + heliXInitial + helicopter.width <= randomBlockArray.xPosition[j] + randomBlockArray.width[j])
        if (helicopter.yPosition >= randomBlockArray.yPosition[j] && helicopter.yPosition <= randomBlockArray.yPosition[j] + randomBlockArray.height[j]) {          clearInterval(handlegame)
          isRunning = false
          clearInterval(handlegame)     
          setTimeout(endGame, 1000)
          break;
        }

       }
  //  }

     //heli collision top RANDOM BLOCKS top detection NEEDS ADDING TOO
     for (let i = 0; i<= helicopter.width; i++) {
     if (helicopter.yPosition<= topMountainArray[gamePosition+heliXInitial+i]) {
      isRunning = false
             clearInterval(handlegame)     
             setTimeout(endGame, 1000)
             break;
     }  
     //heli collision bottom RANDOM BLOCKS bottom detection NEEDS ADDING TOO
     else if (helicopter.yPosition + helicopter.height >= 300 - bottomMountainArray[gamePosition + heliXInitial + i]) {
      isRunning = false
             clearInterval(handlegame)     
             setTimeout(endGame, 1000)
             break;
     }
     else {
      //   console.log('safe')
         background.classList.remove('collision')    
     }
     }
    }

    if (gameContinue === true){
 gamePosition++
  // console.log(gamePosition)
  // console.log(helicopter.xPosition)
}

 if (gamePosition >= heliXInitial - helicopter.width) {
 if (gamePosition % 10 === 0) {
  score++
  currentScore.textContent = score
  if (score % 100 === 0) {
    level++
    currentLevel.textContent = level
   }
 }

}
 
  }, 10)}
  //run the above function
runGame()

////detection of key presses that affect helicopter placement
function onkeydown(e) {
    //up key
    if (e.keyCode === 38) {
      if (gameContinue === true){
      yMove = -2
    }
    } 
    //down key
    if (e.keyCode === 40) {
      if (gameContinue === true){
      yMove = helicopter.yMoveInitial + 1 
    }
    }
  }

  function onkeyup(e) {
    //up key
    if (e.keyCode === 38) {
      yMove = helicopter.yMoveInitial
    }
  }

  ///what is seen when game ended. cleans the page. sets it red. score / level stop and play again button appears
    function endGame() {
      background.classList.add('collision')
      const btn = document.createElement('button');
      btn.setAttribute("id", "play-again");
  btn.innerHTML = "play again?";
  background.appendChild(btn);
  heliContext.clearRect(0, 0, 400, 300)
  topBlockContext.clearRect(0, 0, 400, 300)
  topBlockContext.clearRect(0, 0, 400, 300)
  heliCanvas.removeEventListener('click', reset)

  const buttonClick = document.querySelector('#play-again')
  function handleClick() {
//    circle.classList.toggle('pulse')
   // console.log('clicked')
   reset()
  }
  buttonClick.addEventListener('click', handleClick)


    }
  
    //this resets everything. score / level. ne
  function reset() {

    const removeButton = document.getElementById('play-again')
    if (removeButton) {
    removeButton.parentNode.removeChild(removeButton)
    }
      helicopter.xPosition = heliXInitial
      helicopter.yPosition = 0
      xMove = helicopter.xMoveInitial
      yMove = helicopter.yMoveInitial
      gamePosition = 0
      testarray = {
        xPosition: [],
        yPosition: [],
        xSize: [],
        ySize: []
      }
   //   makeMountainArrays()
   randomBlockArray = {
    xPosition: [],
    yPosition: [],
    width: [],
    height: []
  }
      makeRandomBlockArrays()
      score = 0
      level = 1
      gameContinue = true
      currentLevel.textContent = level
      currentScore.textContent = score
      if (!isRunning){
      runGame()
    }
    }
    
  window.addEventListener("keydown", onkeydown);
  window.addEventListener("keyup", onkeyup);


//  heliCanvas.addEventListener('click', runGame)
