var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacles,clouds,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,cloudimg,cloudsGroup,obstaclesGroup;
var score=0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudimg =loadImage("cloud.png");
  obstacle1 =loadImage("obstacle1.png");
   obstacle2 =loadImage("obstacle2.png");
   obstacle3 =loadImage("obstacle3.png");
   obstacle4 =loadImage("obstacle4.png");
   obstacle5 =loadImage("obstacle5.png");
   obstacle6 =loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(0);
  //score
  score = score+Math.round(getFrameRate()/60);
  stroke ("red");
  text("Score = "+score,500,50);
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
  drawSprites();
  
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var clouds = createSprite(600,120,40,10);
    clouds.y = Math.round(random(80,120));
    clouds.addImage(cloudimg);
    clouds.scale = 0.5;
    clouds.velocityX = -3;
    
     //assign lifetime to the variable
    clouds.lifetime = 200;
    
    //adjust the depth
    clouds.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(clouds);
    
  }
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacles = createSprite(600,165,10,40);
    obstacles.velocityX = -6;
    
    //generate random obstacles
    var rand =Math.round(random(1,6));
    switch(rand){
      case 1 : obstacles.addImage(obstacle1); 
      break ;  
         case 2 : obstacles.addImage(obstacle2); 
      break ;
        case 3 : obstacles.addImage(obstacle3); 
      break ; 
         case 4 : obstacles.addImage(obstacle4); 
      break ;
       case 5 : obstacles.addImage(obstacle5); 
      break ;
       case 6 : obstacles.addImage(obstacle6); 
      break ;
      default:break;
    }
    //assign scale and lifetime to the obstacle           
    obstacles.scale = 0.5;
    obstacles.lifetime = 100;
    obstaclesGroup.add(obstacles);
  }
  
}