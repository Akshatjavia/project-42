var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage;
var obstacleImg;
var overImg;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){

  backImage=loadImage("jungle.jpg");
  overImg = loadImage("gameOver.png");
  bananaImage = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-7.5;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = createGroup();
  ObstacleGroup = createGroup();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  if(player.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score + 1;
    player.scale = player.scale+0.01;
  }

  if(player.isTouching(ObstacleGroup)){
    gameState=END;
  }
  
    if(keyDown("space") && player.collide(ground)) {
      player.velocityY = -16;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnBanana();
    spawnObstacle();

  }

  if(gameState === END){
    player.destroy();
    backgr.addImage(overImg);
    ObstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    backgr.velocityX = 0;
    backgr.scale = 0.5;
    backgr.x = 400;
    backgr.y = 200;
  }

  drawSprites();

  textSize(30);
  text("Score:-"+score,40,40);

}

function spawnBanana() {

  if(frameCount % 150 ===0){
     banana=createSprite(600,250,40,10);
     banana.y=random(120,200);
     banana.addImage(bananaImage);
     banana.scale=0.05;
     banana.velocityX = -6.9;
     banana.lifetime = 300;
     player.depth = banana.depth;
     FoodGroup.add(banana);
  }
}

function spawnObstacle() {

  if(frameCount % 80 ===0){
     obstacle=createSprite(600,340,40,10);
     obstacle.addImage(obstacleImg);
     obstacle.scale=0.13;
     obstacle.velocityX = -7.5;
     obstacle.lifetime = 300;
     obstacle.debug=false;
     obstacle.depth = player.depth;
     ObstacleGroup.add(obstacle);
  }
}