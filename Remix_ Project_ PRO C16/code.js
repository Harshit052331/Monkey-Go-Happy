var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b","cc21efdc-a79e-44f0-8371-2990f311af60","73ae2085-d6fb-478b-aab6-e768417e09de","b7757e14-e3b5-491b-89c8-a8ae1657a35f","2804a056-6f07-4dcc-b835-21add065b0d3"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":100,"y":109},"frameCount":9,"looping":true,"frameDelay":2,"version":"psnxKQITigTA9HZz9jYOUn7hB84JVme7","loadedFromSource":true,"saved":true,"sourceSize":{"x":300,"y":327},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"2rNGUhtpQLcVXYd1aYko5PgOt9NVrmy.","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":null,"frameSize":{"x":100,"y":100},"frameCount":1,"looping":true,"frameDelay":12,"version":"f99NB45trV54cTs9Gyu6YWTb.3zMH4Tj","loadedFromSource":true,"saved":true,"sourceSize":{"x":100,"y":100},"rootRelativePath":"assets/33841f90-7a53-4346-b956-e51d1961959b.png"},"cc21efdc-a79e-44f0-8371-2990f311af60":{"name":"green-jungle-landscape-illustration-260nw-1237929424.png_1","sourceUrl":null,"frameSize":{"x":600,"y":431},"frameCount":1,"looping":true,"frameDelay":12,"version":"I5zgNuDMg_YslBVfosq0znc9sxzoJUOn","loadedFromSource":true,"saved":true,"sourceSize":{"x":600,"y":431},"rootRelativePath":"assets/cc21efdc-a79e-44f0-8371-2990f311af60.png"},"73ae2085-d6fb-478b-aab6-e768417e09de":{"name":"restart-icon-internet-button-on-260nw-250233214.png_1","sourceUrl":null,"frameSize":{"x":260,"y":280},"frameCount":1,"looping":true,"frameDelay":12,"version":"XJOuh8VMrzMpw90gfLkx39xNUJ.q81iO","loadedFromSource":true,"saved":true,"sourceSize":{"x":260,"y":280},"rootRelativePath":"assets/73ae2085-d6fb-478b-aab6-e768417e09de.png"},"b7757e14-e3b5-491b-89c8-a8ae1657a35f":{"name":"download.png_1","sourceUrl":null,"frameSize":{"x":800,"y":448},"frameCount":1,"looping":true,"frameDelay":12,"version":"0L5P5p9jq_tEcOS7Ra6r5WXg1cAPJLly","loadedFromSource":true,"saved":true,"sourceSize":{"x":800,"y":448},"rootRelativePath":"assets/b7757e14-e3b5-491b-89c8-a8ae1657a35f.png"},"2804a056-6f07-4dcc-b835-21add065b0d3":{"name":"game-over-transparent-f2u-weasyl-game-over-transparent-1280_800.png_1","sourceUrl":null,"frameSize":{"x":505,"y":316},"frameCount":1,"looping":true,"frameDelay":12,"version":"dkSXwZphtK4wv99Est178N7Mp.5cUByE","loadedFromSource":true,"saved":true,"sourceSize":{"x":505,"y":316},"rootRelativePath":"assets/2804a056-6f07-4dcc-b835-21add065b0d3.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg = createSprite(200,200,400,400);
bg.setAnimation("download.png_1");
bg.x = bg.width/2;
//create a trex sprite
var monkey = createSprite(200,364,20,50);
monkey.setAnimation("monkey");
monkey.scale = 0.5;
monkey.x = 50;
//set collision radius for the monkey
monkey.setCollider("circle",0,0,30);

var restart= createSprite(200,200);
restart.setAnimation( "restart-icon-internet-button-on-260nw-250233214.png_1");
restart.visible = false;
//create a ground sprite
var ground = createSprite(200,364,400,20);
ground.visible = false;
ground.x = ground.width /2;

//invisible Ground to support monkey
var invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

//create banana and stone Groups
var bananaGroup = createGroup();
var stoneGroup= createGroup();
//set text
textSize(18);
textFont("Georgia");
//score
var survivaltime = 0;
var score = 0;

function draw() {

  //display score

  console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*survivaltime/100);
    bg.velocityX = -3;
    if(bg.x< 0){
      bg.x = bg.width/2;
    }
    if(bananaGroup.isTouching(monkey)){
      score = score+1;
      bananaGroup.destroyEach();
      playSound( "assets/category_accent/puzzle_game_accent_a_01.mp3");
    }
    //scoring
    survivaltime = survivaltime + Math.ceil(World.frameRate/60);
    
    if (survivaltime>0 && survivaltime%100 === 0){
    
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 359){
     monkey.velocityY = -12 ;
      
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //spawn the banana
    spawnbanana();
  
    //spawn stones
    spawnstone();
    
    //End the game when trex is touching the obstacle
    if(stoneGroup.isTouching(monkey)){
    playSound( "assets/category_male_voiceover/game_over_male.mp3");
      gameState = END;
      //playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    monkey.visible = false;
 restart.visible = true;
 stoneGroup.visible = false;
    if(mousePressedOver(restart)) {
    reset();
    bananaGroup.visible = false;
  }
  
    //set lifetime of the game objects so that they are never destroyed
    bananaGroup.setLifetimeEach(-1);
  stoneGroup.setLifetimeEach(-1);
    
    
  }

  console.log(monkey.y);
  
  //stop trex from falling down
  monkey.collide(invisibleGround);
  
  drawSprites();
    //display score
    textFont("BOLD");
    fill("red");
    text("Score:"+score,310,100);
  text("Survival Time: "+ survivaltime,60, 100);
  }



function spawnstone() {
  if(World.frameCount % 60 === 0) {
    var stone = createSprite(400,380,10,40);
    stone.velocityX = - (6 + 3*survivaltime/100);
  stone.setAnimation("Stone");
    //assign scale and lifetime to the stones
   stone.scale = 0.5;
    stone.lifetime = 70;
    //add each banana to the group
  stoneGroup.add(stone);
  }
}

function spawnbanana() {
  //write code here to spawn the banana
  if (World.frameCount % 100 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = randomNumber(280,320);
    banana.setAnimation("Banana");
   banana.scale = 0.5;
   banana.velocityX =- (4 + 3*survivaltime/100);
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    
    //add each banana to the group
   bananaGroup.add(banana);
  }
  
}
function reset(){
  gameState = PLAY;
  
  restart.visible = false;
  monkey.visible = true;
  bg.velocityX= 0;
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
  survivaltime = 0;
  
}









  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
