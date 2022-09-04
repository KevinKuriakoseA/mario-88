var backgroundImg, mario, brick, plants,groundImg, ground ;
var marioImg;
var invisableGround;
var obstacleImg, obstacles;

function setup() {
createCanvas(windowWidth,windowHeight)

mario = createSprite(50,height -200)
mario.addAnimation("mario",marioImg)
mario.scale = 4

ground = createSprite(width/2,height - 60,width,20)
ground.addImage("ground",groundImg)
ground.scale = 2
ground.velocityX = -5

invisableGround = createSprite(ground.x,height - 130,width,10)
invisableGround.visible = false 
}

function preload() {
 marioImg = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
 backgroundImg = loadImage("bg.png")
 groundImg = loadImage("ground2.png");
 obstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
}

function draw() {
    background(backgroundImg)
    console.log(ground.x)
    if (ground.x< width/2 - 100) {
        ground.x = width/2 
    }
    ground.width = width
    if (keyDown("SPACE")) {
      mario.velocityY = -100
    }
    mario.velocityY += 0.5
    
    mario.collide(invisableGround)
    spawnObstacles()
 drawSprites()
} 

function spawnObstacles () {
    if (frameCount % 90 == 0) {
        obstacles = createSprite(width,height -200,10,20)
        obstacles.velocityX = -5 
        obstacles.addAnimation("obstacle",obstacleImg)
        obstacles.scale = 4 
    }
}