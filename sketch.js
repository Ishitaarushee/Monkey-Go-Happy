var monkey, monkey_collide, monkey_run, banana, bananaimage, bananagroup, obstacle, obstacleGroup, stoneimage, gameover, gameoverimage, restart, restartimage, invisibleground, gameState, PLAY, END, survivaltime, bananas, jungle, jungleimage;
   
function preload(){
  
  monkey_run = loadAnimation("Monkey0.png", "Monkey1.png", "Monkey2.png", "Monkey3,png", "Monkey4.png", "Monkey5.png", "Monkey6.png", "Monkey7.png", "Monkey8.png");
  
  monkey_collided = loadImage("monkey2.png");
  
  bananaimage = loadImage("Banana.png");
  
  gameoverimage = loadImage("Game_Over0.png");
  
  restartimage = loadImage("Restart.png");
  
  jungleimage = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(400, 400);
   
  jungle = createSprite(200,200,400,400);
  jungle.addImage(jungleimage);
  
  invisibleground = createSprite(200,395,400,15);
  invisibleground.visible = false;
  
  var ground = createSprite(200,391,400,15);
  ground.shapeColor = 'green';
  
  monkey = createSprite(65,341,10,30);
  monkey.addAnimation("running", monkey_run);
  

  monkey.scale = 0.15;
  
  gameover = createSprite(200,200,200,200);
  gameover.addImage(gameoverimage);
  gameover.visible = false;
  gameover.scale = 0.75;
  
  restart = createSprite(200,110,20,20);
  restart.addImage(restartimage);
  restart.scale = 0.05;
  restart.visible = false;
  
  survivaltime = 0;
  
  bananas = 0;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  obstaclegroup = new Group();
  
  bananagroup = new Group();
}

function draw() {
  background(400);
  
  //giving the groung velocity
  ground.velocityX = -4; 
  
  //giving the monkey gravity
  monkey.velocityY = monkey.velocityY + 0.7;
  
  //making the bananas dissapear when the monkey touches them
  if (monkey.isTouching(bananagroup)){
    bananagroup.destroyEach();
    bananas = bananas +1;
  }
  
  //displaying how many bananas have been eaten
  fill("black");
  textSize(20);
  text("Bananas Eaten: " + bananas,230,60);
  
  //creating all the commands for the PLAY state
  if (gameState == PLAY) {
    //making the food and the obstacles
    food();
    obstacles();
    
    // calculating the survival time
    survivaltime = survivaltime + Math.round(World.frameRate/60);
    
    //making the game over and the restart sprite invisible
    gameover.visible = false;
    restart.visible = false;
    
    //making the monkey jump
    if(keyDown("space") && monkey.y >= 338) {
    monkey.velocityY = -13;
    }
  } 
  
  //displaying the survival time
  fill("black");
  textSize(20);
  text("Survival Time: " + survivaltime, 230,40);
  
  //making the game end once the monkey touches the obstacles
  if (monkey.isTouching(obstaclegroup)){
    gameState = END;
    monkey.setAnimation(monkey_collided);
    bananagroup.velocityX = 0;
    obstaclegroup.velocityX = 0; 
    gameover.visible = true;
    restart.visible = true;
  }
  
  //reseting the game in END state
  if (gameState == END) {
    if (mousePressedOver(restart)) {
    reset();
    }
  }
  
  //reseting the moving ground
  if (jungle.x < 200){
      jungle.x = ground.width/2;
  }
  
  //making the monkey collide with the invisible ground
  monkey.collide(invisibleground);
  
  drawSprites();
}

function food() {
   if (frameCount % 80 === 0) { 
    var banana = createSprite(400,randomNumber(220,370),20,20);
    banana.addAnimation(bananaimage);
    banana.scale = 0.05; 
    
    banana.velocityX = -4; 
    
    banana.lifetime = 105;
    
    bananagroup.add(banana);
   }  
 }

//creating the function for the obstacles
 function obstacles() {
   if (frameCount % 300 === 0) {
   var obstacle = createSprite(400,368,30,30);
   obstacle.setAnimation(stoneimage);
   obstacle.scale = 0.12;
   
   obstacle.setCollider("circle",0,0,150);
   
   obstacle.velocityX = -4;
   
   obstacle.lifetime = 105;
   
   obstaclegroup.add(obstacle);
   }
 }

//creating the function for reseting the game
 function reset() {
   gameState = PLAY; 
   
   monkey.addAnimation(monkey_run);
   
   survivaltime = 0;
   
   bananas = 0;
 }