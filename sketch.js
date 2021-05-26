var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;

var END =0;
var PLAY =1;
var gameState = 1;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  score = 0;
  survivalTime = 0;

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(player.isTouching(foodGroup)){
    score = score+1;
    foodGroup.destroyEach();
    player.scale += +0.1;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacle();

    if(obstacleGroup.isTouching(player)){
      //ground.velocityX = 0;
      player.velocityY = 0;
      
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      
      foodGroup.setVelocityXEach(0);
      foodGroup.setLifetimeEach(-1);

      gameState = END;
    }

    survivalTime = Math.ceil(frameCount/getFrameRate());

  drawSprites();
  stroke("black");
  fill("black");
  textSize(20);
  text("Score: "+ score, 100, 50);
  }
  if(gameState===END){
    backImage.velocity = 0;
    player.velocityY = 0;

    obstacleGroup.destroyEach()
    foodGroup.destroyEach()

    stroke("black");
    fill("white");
    textSize(20);
    text("Game Over ", 350, 200);
  }
}
  function spawnFood(){
    if(frameCount % 80 === 0){
      var banana = createSprite(600,250,40,10);
      banana.addImage("banana", bananaImage);
      banana.scale = 0.05;
      banana.y = random(120,200);
      banana.velocityX = -5;
      banana.lifetime = 300;
      player.depth = banana.depth+1;
      
      foodGroup.add(banana);
    }
  }
  function spawnObstacle(){
    if(frameCount % 300 === 0){
      var obstacle = createSprite(800,320,10,40);
      obstacle.addImage("obstacle", obstacleImage);
      obstacle.scale = 0.15;
      obstacle.velocityX = -6;
      obstacle.lifetime = 300;
      
      obstacleGroup.add(obstacle);
    }
  }

  //drawSprites();

