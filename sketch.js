var backgroundImg, mario, brick, plants,groundImg, ground ;
var marioImg , marioCollided,marioCollidedImg;
var invisableGround;
var obstacleImg, obstacles,obstaclesGroup, obstacleX;
var brickImg, brickGroup;
var gameState = "play"
var jumpSound
function setup() {
createCanvas(windowWidth,windowHeight)

mario = createSprite(50,height -200)
mario.addAnimation("mario",marioImg)
mario.scale = 4
mario.addAnimation("mario_collided",marioCollidedImg)
ground = createSprite(width/2,height - 60,width,20)
ground.addImage("ground",groundImg)
ground.scale = 2


invisableGround = createSprite(ground.x,height - 130,width,10)
invisableGround.visible = false 

brickGroup = new Group()
obstaclesGroup = new Group() 

}

function preload() {
 marioImg = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
 backgroundImg = loadImage("bg.png")
 groundImg = loadImage("ground2.png");
 obstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
 brickImg = loadImage("brick.png")
 marioCollidedImg = loadImage("collided.png")
 jumpSound  = loadSound("jump.mp3")

}

function draw() {
    background(backgroundImg)
    //console.log(ground.x)
   
    ground.width = width
    
   
    
    mario.collide(invisableGround)
    if (ground.x< width/2 - 100) {
        ground.x = width/2 
    }

    if (gameState == "play") {
       

        if (keyDown("SPACE") && mario.y>height/2 -100) {
            mario.velocityY = -10
            jumpSound.play()
          }
          mario.velocityY += 0.5
          spawnBricks()
          spawnObstacles()
          ground.velocityX = -5
    }

    if (mario.isTouching(obstaclesGroup)) {
        endGame() 
    }

 drawSprites() 
} 

function spawnObstacles () {
    if (frameCount % 150 == 0) {
        obstacles = createSprite(width,height -200,10,20)
        obstacles.velocityX = -5 
        obstacles.addAnimation("obstacle",obstacleImg)
        obstacles.scale = 2
        obstaclesGroup.add(obstacles)
    }
}
function spawnBricks() {
    if (frameCount % 200 == 0 ) {
        brick = createSprite(width,height/2,10,20)
        brick.y = Math.round(random(height/2-200,height/2 +100))
        brick.velocityX = -5
        brick.addImage("brick",brickImg)
        brick.scale = 2 
        brickGroup.add(brick)
    }

}

function endGame () {
gameState = "end"
ground.velocityX = 0
invisableGround.velocityX = 0
obstaclesGroup.setVelocityXEach(0)
brickGroup.setVelocityXEach(0)
mario.velocityY = 0 
mario.y = height -200
mario.changeAnimation("mario_collided")
}
