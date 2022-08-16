var bg, bg_image
var butterfly, butterfly_image
var bricks, bricks_image
var orangeFlower, orangeFlower_image
var rose, rose_image
var yellowFlower, yellowFlower_image
var Score = 0
var lives = 3
var bricksGroup 
var orangeFlowerGroup, roseGroup, yellowFlowerGroup
var gameOverSound, happySound, lifeOverSound

function preload(){
  bg_image = loadImage("Background.jpeg");
  butterfly_image = loadImage("Butterfly.png")
  bricks_image = loadImage("Bricks.jpeg");
  orangeFlower_image = loadImage("OrangeFlower.png");
  rose_image = loadImage ("Rose.png");
  yellowFlower_image = loadImage("YellowFlower.png");
  gameOverSound = loadSound("gameOver.mp3");
  happySound = loadSound("happy.mp3");
  lifeOverSound = loadSound("lifeOver.mp3");
  gameOverSound.looping = false;
}
function setup(){
createCanvas(800,500);
bg = createSprite(400,250,800,500)
bg.addImage(bg_image);
bg.velocityX = -2;
butterfly = createSprite(100,250,100,100)
butterfly.addImage(butterfly_image);
butterfly.scale = 0.5;

bricksGroup = new Group();
orangeFlowerGroup = new Group();
roseGroup = new Group();
yellowFlowerGroup = new Group();
}

function draw(){
background("skyblue")
if(bg.x<=300){
  bg.x = width/2
}
if(keyIsDown(UP_ARROW)){
  butterfly.position.y -= 5
}
if(keyIsDown(DOWN_ARROW)){
  butterfly.position.y += 5
}
spawnBricks();
spawnOrangeFlower();
spawnRose();
spawnYellowFlower();
drawSprites();

textSize(25);
text("Score: "+Score, 650,20);
text("Lives: "+lives, 50,20);

if(bricksGroup.isTouching(butterfly)){
  lives -= 1;
  bricksGroup.destroyEach();
  lifeOverSound.play();
}
if(lives<=0){
  textSize(35)
  fill("purple")
  text("Game Over",400,250)
  butterfly.destroy();
  bricksGroup.destroyEach();
  yellowFlowerGroup.destroyEach();
  orangeFlowerGroup.destroyEach();
  roseGroup.destroyEach();
  bg.velocityX = 0;
  gameOverSound.play();
}
if(orangeFlowerGroup.isTouching(butterfly)){
  Score += 20;
  orangeFlowerGroup.destroyEach();
  happySound.play();
}
if(roseGroup.isTouching(butterfly)){
  Score += 30;
  roseGroup.destroyEach();
  happySound.play();
}
if(yellowFlowerGroup.isTouching(butterfly)){
  Score += 25;
  yellowFlowerGroup.destroyEach();
  happySound.play();
}
}

function spawnBricks(){
  if(frameCount%100 === 0){
    var brick = createSprite(400,-10, 100,100);
    brick.addImage(bricks_image);
    brick.scale = 0.1
    brick.velocityX = -2
    brick.y = Math.round(random(50,450));

    bricksGroup.add(brick);
  }
}

function spawnOrangeFlower(){
  if(frameCount%200 === 0) {
    orangeFlower = createSprite(400,200,100,100);
    orangeFlower.addImage(orangeFlower_image);
    orangeFlower.scale = 0.15
    orangeFlower.y = Math.round(random(20,600));
    orangeFlower.velocityX = -3;

    orangeFlowerGroup.add(orangeFlower);
  }
}

function spawnRose(){
  if(frameCount%250 === 0){
    rose = createSprite(600,200,100,100);
    rose.addImage(rose_image);
    rose.scale = 0.2
    rose.y = Math.round(random(20,600));
    rose.velocityX = -5;

    roseGroup.add(rose);
  }
}

function spawnYellowFlower(){
  if(frameCount%300 === 0){
    yellowFlower = createSprite(600,200,100,100);
    yellowFlower.addImage(yellowFlower_image);
    yellowFlower.scale = 0.2
    yellowFlower.y = Math.round(random(20,600));
    yellowFlower.velocityX = -4;

    yellowFlowerGroup.add(yellowFlower);
  }
}