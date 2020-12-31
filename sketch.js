var fruit1,fruit2,fruit3,fruit4;
var enemy1,enemyImage;
var bg,bgImage;
var sword,swordImage;
var PLAY = 1;
var END = 0;
var gameState = 1;
var fruit1BG,fruit2BG,fruit3bgBG,fruit4BG;
var score=0;
var gameoverImg;

var state="play";

function preload(){
  bgImage=loadImage("maxresdefault.jpg");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  swordImage = loadImage("sword.png");
  enemyImage = loadImage("alien1.png","alien2.png");
  gameoverImg=loadImage("gameover.png");

 
}
function setup(){
  createCanvas(670,400);
  
  bg=createSprite(350,200,500,500);
  bg.addImage("background",bgImage);
  bg.scale=1;
  
  

  sword=createSprite(200,200,10,10);
  sword.addImage(swordImage);
  sword.scale=0.5;
  sword.setCollider("rectangle",0,0,40,40);
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw(){
  
  if(state==="play"){
    fruits();
    enemy1();
    
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  
   if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
    }
    else
    {
      
      if(enemyGroup.isTouching(sword)){
        state="end";
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        sword.addImage(gameoverImg);
        sword.scale=0.8;
        sword.x=250;
        sword.y=250;
        sword.setVelocity(0,0);
        if(keyDown("space")){
          state="play";
        }
      }
    }
  }
  drawSprites();
  textSize(20);
  fill("red");
  text("Score : "+ score,400,30);
}

function fruits(){
  if(frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(0,200,10,10);
    fruit.scale=0.2;
      if(position==1){
        fruit.x=400;
        fruit.velocityX=-(5);
      }
      else{
        if(position==2){
        fruit.x=0;
        fruit.velocityX= (5);
        }
    }
    
    r=Math.round(random(1,4));
    switch(r){
      case 1:fruit.addImage(fruit1);
              break;
      case 2:fruit.addImage(fruit2);
              break;
      case 3:fruit.addImage(fruit3);
              break;
      case 4:fruit.addImage(fruit4);
              break; 
      default:break;
    }
    fruit.y=Math.round(random(0,450));
    fruitGroup.setLifetimeEach(150);
    fruitGroup.add(fruit);
  }
  
}

function enemy1(){
  if(frameCount%250===0){
    enemy=createSprite(200,200,20,20);
    enemy.addAnimation("enemy",enemyImage);
    enemy.scale=0.5;
    enemy.y=Math.round(random(50,450));
    enemy.velocityX=(5+(score/10));
    enemyGroup.setLifetimeEach(200);
    enemyGroup.add(enemy);
  }
}