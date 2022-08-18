//Global Variables
const screenSizeX = 500;
const screenSizeY = 500;
const spacing = 25;
const fr = 15;
const maxCoordVal = screenSizeX / spacing; // = 20 (means, screen is 20x20)


//Variables for the box
let coordXBox = -1;
let coordYBox = -1;
colorSK = "green";
colorAPL = "red";



//no way to go around and not use these variables and assign values from "setup()"
let apple;
let snake;
let direction = "right"
  
//Save the coord values, before we change them to pass along to the tail
let [prevCRDx, prevCRDy] = [coordXBox,coordYBox];


// this and preload function are for loading font for Text
let finish = 0;
let font,
  fontsize = 32;

let snowflakes = []; 
let t = fr / 60; // update time

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('assets/Pacifico-Regular.ttf');
}

function setup() {
  //To calculate a random spawn location
  let randomSpawn = parseInt(random(maxCoordVal));
  coordXBox = randomSpawn;
  randomSpawn = parseInt(random(maxCoordVal));
  coordYBox = randomSpawn;
  
  createCanvas(screenSizeX, screenSizeY);
  background("black");
  noStroke(); //added randomly, can delete
  loop();
  frameRate(fr);
  
  // Set text characteristics
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  
  //Defining Buttons below the canvas
  btAppleRespawn = createButton('AppleRespawn');
  btFinish = createButton('Finish');

  btAppleRespawn.mousePressed(fnbtAppleRespawn);
  btFinish.mousePressed(fnbtFinish);  
  
  apple = new Apple();
  snake = new Snake();
  
  apple.spawn();
  apple.drawApple();
}

//console.log("this is printed once")

//Apple respawn function button on mouse press
function fnbtAppleRespawn(){
  console.log("okay, this works");
  apple.spawn();
  apple.drawApple();
}

function fnbtFinish(){
  console.log("Finish button pressed");
  varText = "Happy Birthday, Dad! \n Kisses to Mom too! \n \n Love you both!!!"
  
  snake.finishLengthSet();
  finish = 1;
  
  text(varText, screenSizeX/2, screenSizeY/2);
}



function draw() {
  
  //setting up the dotted background
  stroke(255,255,255);
  strokeWeight(1);
  
  background("black");
  for (let i = 0; i < 501; i+=spacing){
    for (let j = 0; j < 501; j +=spacing){
      point(i,j);
    }
  }
  

  

  //Draw a box
  //boxSK(prevCRDx, prevCRDy);
  //boxSK(coordXBox,coordYBox);
  
  
  
  //Problems: drawing not on the grid
  //          drawing is moving (spawning) 
  //* maybe it's acting like that, cause of the mess with the global variables that I had
  

  
  //Draw arrow
  fill('blue');
  //snake.setCoord(coordXBox,coordYBox);
  //snake.drawArrow(direction);
  fill(colorSK);
  
  //Drawing the tail and the arrow
  for (let i = 0; i < snake.tail.length ; i++){
      boxSK(snake.tail[i][0], snake.tail[i][1], colorSK);
  }
  //snake.drawArrow(direction);
  checkIfAte();
  snake.move();
  
  //end game credits and animations if it is the end
  finishGame()
}

function finishGame(){
  //Text on the screen when finish
  if (finish == 1) {    
    fill('white');
    text(varText, screenSizeX/2, screenSizeY/2);
    
    //SNOW CODE
    // create a random number of snowflakes each frame
    for (let i = 0; i < random(1); i++) {
      snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
      flake.update(t); // update snowflake position
      flake.display(); // draw snowflake
    }
  }
}

function checkIfAte(){
    //check if snake eats apple, MAKE ANOTHER FUNCTION 
  if ((apple.getCoordX() == snake.getCoord()[0]) && (apple.getCoordY() == snake.getCoord()[1])){
    apple.spawn();
    
    snake.increaseLength();
    //snake.growthUpdate(apple.getCoordX(), apple.getCoordY());
    apple.drawApple();
    console.log("This is apple coordX: " + apple.getCoordX() + "; This is snake coordX: " + snake.getCoord()[0]);
    console.log("This is apple coordY: " + apple.getCoordY() + "; This is snake coordY: " + snake.getCoord()[1]);
    console.log(" ");
    console.log(" ");
    console.log(" ");
  } else {
    apple.drawApple();
    //apple.drawApple();
  }
}

function boxSK(xb,yb,color){
  fill(color);
  rect(xb*spacing, yb*spacing, spacing, spacing)
}

