const canvas = document.querySelector('canvas')
const topBlockContext = canvas.getContext('2d');
const bottomBlockContext = canvas.getContext('2d');
topBlockContext.fillStyle = 'yellow'

let one = 1

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

setInterval(() => {
  topBlockContext.clearRect(0, 0, 400, 300)
zero = 0
fourHundred = 400
  for (let i = zero; i<= fourHundred; i++) {
    topBlockContext.fillRect(i, 0, 1, topMountainArray[gamePosition + i])
  }
   for (let i = zero; i<= fourHundred; i++) {
    bottomBlockContext.fillRect(i, 300 - bottomMountainArray[gamePosition + i], 1, bottomMountainArray[gamePosition + i])
   }
//   bottomBlockContext.fillRect(50,80, 1, 200)

//    bottomBlockContext.fillRect(40, 40, 1, 150)
  
 gamePosition++

  }, 5)

