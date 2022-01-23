var cat, sky, cash, jwellery, diamonds, clouds;
var cloudImg, catImg, jwelleryImg, cashImg, diamondsImg, cloudsImg, endImg, skyImg;
var cashGroup, jwelleryGroup, diamondsGroup, cloudsGroup;
var score = 0;
var sky, skyImg;
//Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){

   catImg = loadImage("cat_1.png", "cat_2.png", "cat_3.png");
   jwelleryImg = loadImage("jwell.png");
   cashImg = loadImage("cash.png");
   diamondsImg = loadImage("diamonds.png");
   cloudsImg = loadImage("cloud.png");
   endImg = loadImage("gameOver.png");
   skyImg = loadImage("sky.png");
}

function setup() {
   createCanvas(windowWidth, windowHeight);

//cat
   cat.addAnimation("running", catImg);
   cat.scale = 0.08;

//background
   sky.addAnimation("sky",skyImg);

//cash, jwellery, diamonds
   cash.addAnimation("cash",castImg);
   jwellery.addAnimation("jwellery",jwelleryImg);
   diamonds.addAnimation("diamonds",diamondsImg);

//clouds
   clouds.addAnimation("clouds",cloudsImg);

   //invisible ground
   invisibleGround = createSprite(width/2,height-10,width,125);  
   invisibleGround.visible = false;

//game over  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

//score
  score = 0;
  
 //groups
cashGroup = new Group();
jwelleryGroup = new Group();
diamondsGroup = new Group();
cloudsGroup = new Group();
}




function draw() {
 background(sky);
 textSize(20);
 fill("black")
 text("Score: "+ score,30,50);
//if playstate is play
 if (gameState===PLAY){
   score = score + Math.round(getFrameRate()/60);
   
   if((touches.length > 0 || keyDown("SPACE")) && cat.y  >= height-120) {
     cat.velocityY = -10;
      touches = [];
   }
   
   cat.velocityY = cat.velocityY + 0.8
 
   if (ground.x < 0){
     ground.x = ground.width/2;
   }
 

   trex.collide(clouds);
   spawnClouds();
 
   if(obstaclesGroup.isTouching(trex)){
       collidedSound.play()
       gameState = END;
   }
 }
 //if playstate is end
 else if (gameState === END) {
   gameOver.visible = true;
   
   //set velocity of each game object to 0
   cat.velocityY = 0;
   cloudsGroup.setVelocityXEach(0);
   
   //set lifetime of the game objects so that they are never destroyed
   cloudsGroup.setLifetimeEach(-1);
   
   if(touches.length>0 || keyDown("SPACE") || keyisDown(restart)) {      
     reset();
     touches = [];
   }
 }

 drawSprites();
}

function spawnClouds(){
   if (frameCount % 40 === 0) {
      var cloud = createSprite(width+40,height-300,40,10);
      cloud.y = Math.round(random(100,350));
      cloud.x = Math.round(random(0,300))
      cloud.addImage(cloudImage);
      cloud.scale = 3;
      cloud.velocityX = -3;
      
       //assign lifetime to the variable
      cloud.lifetime = 300;
      
      //adjust the depth
      cloud.depth = cat.depth;
      cat.depth = cat.depth+1;
      
      //add each cloud to the group
      cloudsGroup.add(cloud);
    }
    
}

function reset(){
   gameState = PLAY;
   gameOver.visible = false;
   restart.visible = false;
   
   obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();
   
   cat.changeAnimation("running",catImg);
   
   score = 0;
}