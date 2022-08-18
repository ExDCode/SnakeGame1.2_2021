class Snake{

  
  constructor(){
    this.prevCRDx = 0;
    this.prevCRDy = 0;
    //Next 2 lines are setting the starting position
    this.coordXBox = 0;
    this.coordYBox = 0;
    this.setCoord(0,0);
    this.direction = "right";
    this.length = 1;
    this.MAXLENGTH = 7;
    ///////////////////////    
    //Created an array for the snake to grow, saves previous coordinates of the head and 
    //  passes it down the chain
    //        (check if [this.coordXHead,this.coordYHead] these variables even exist in this scope)
    //          \__>the tail does have (0;0)
    ///////////////////////
    
          this.tail = [];
          this.tail.push([this.coordXHead,this.coordYHead]);
              
          //Why? I don't  remember
          this.coordXHead = 5;
    
  }
  
  
  //THIS WORKS 1
  setCoord(coordXHead, coordYHead){
    this.prevCRDx = this.coordXHead;
    this.prevCRDy = this.coordYHead;
    this.coordXHead = coordXHead;
    this.coordYHead = coordYHead;
  }
  
  //THIS WORKS 1
  getCoord(){
    return [this.coordXHead, this.coordYHead]
  }
  
  //This method is for .push for tail. Push until it's length is 7  //~correction, i think it's 8
  // THIS WORKS 1
  growthUpdate(coordXBox,coordYBox ){  
    this.coordXHead = coordXBox;
    this.coordYHead = coordYBox;
    if ( [this.prevCRDx, this.prevCRDy] !== [this.coordXHead,this.coordYHead]){
      //Delete the last added element and add a new one at the top again
      
      //saves all the previous snake locations to draw the body
      // is dependent on 'this.length' that changes when we eat an apple
      // and is smaller than MAXLENGTH to have more control of max snake length
      if (this.length < this.MAXLENGTH){
        //if 
        if (this.tail.length > this.length){
          this.tail.shift();
          this.tail.push([this.coordXHead,this.coordYHead]);
        } else {
          this.tail.push([this.coordXHead,this.coordYHead]);
        }
      } else {
        this.tail.shift();
        this.tail.push([this.coordXHead,this.coordYHead]);
        fnbtFinish();
      }
    } 
    //console.log("I grew!! I'm level: " + prevCRDx + "  " + coordXBox);
    
  }
  
  //works as a flag to increase growth when ate
  increaseLength(){
    this.length +=1;
  }
  
  finishLengthSet(){
    this.length = 6;
  }
  
  //Draws a box for each body block and an arrow upfront
  snakeDraw(){
    //Drawing the tail and the arrow
    for (let i = 0; i < snake.tail.length ; i++){      
      //console.log(snake.tail[i][0] +"   "+ snake.tail[i][1]);      these values hold ate apple locations, those don't change
      boxSK(snake.tail[i][0], snake.tail[i][1], colorSK);
      //BoxSK is defined in sketch and works because (i think) it's global
    }
    snake.drawArrow(this.direction)
    
  }
  
  //Moves the snake
  move(){
    //Key controls assign a 'direction' flag ex: direction = left
    if (keyIsDown(LEFT_ARROW)) {
      //coordXBox >=0 ? coordXBox-- : 0;
      this.direction = "left";
    } else if (keyIsDown(RIGHT_ARROW)){
      //coordXBox <= maxCoordVal ? coordXBox++: maxCoordVal;
      this.direction = "right";
    }
    if (keyIsDown(UP_ARROW)) {
        //coordYBox >=0 ? coordYBox-- : 0;
        this.direction = "up";
      } else if (keyIsDown(DOWN_ARROW)) {
        //coordYBox <= maxCoordVal ? coordYBox++: maxCoordVal;
        this.direction = "down";
      }

    //Given the direction, we will move 1 unit in that direction
    if (this.direction == "left") {
      this.coordXBox >=0 ? this.coordXBox-- : this.coordXBox = maxCoordVal;
    } else if (this.direction == "right"){
      this.coordXBox <= maxCoordVal ? this.coordXBox++: this.coordXBox = 0;
    }
    if (this.direction == "up") {
        this.coordYBox >=0 ? this.coordYBox-- : this.coordYBox=maxCoordVal;
      } else if (this.direction == "down") {
        this.coordYBox <= maxCoordVal ? this.coordYBox++: this.coordYBox=0;
      }

    //To save the previous location of the head (if location is not the same -> save it)
    this.prevCRDx == this.coordXBox ?  " " : this.prevCRDx = this.coordXBox;
    this.prevCRDy == this.coordYBox ? " " : this.prevCRDy = this.coordYBox;
      
    //update the growth and draw snake **broke move function, coord assign
    //snake.setCoord(this.coordXBox,this.coordYBox);
    this.coordXHead = this.coordXBox;
    this.coordYHead = this.coordYBox;
    snake.growthUpdate(this.coordXHead,this.coordYHead)
    snake.snakeDraw(); //it's inside move() because of 'direction', i think, so it'll be in scope
  }
  
  
  
  //What would snake have in a snake game? 
  // Head position and direction saved?
  // It leaves a trail that increases after it eats an apple
  // THUS, I need some sort of array that remembers indeces of each used block/box that is increasing or has a limited size that we won't over fill and finish the game
  
  //use array.shift(); to return the FIFO element and remove it from array
  
  //array.push head's coordinates and just delete the last coordinates and the snake should be able to change length correctly
  
  //now, how do I turn needed blocks back to black? A black rect with 4 dots redrawn on top?? I can make a function for that, but I'm pretty sure there should be a cleaner solution in the draw() function or somewhere else
  
  //it's so hard to think calmly when you wanna poop really badly :(
  
  
  // I need to draw an arrow, RIGHT direction
  arrowDrawRight(){
    //if right, then this
    let [tempX,tempY] = [this.coordXHead*spacing, this.coordYHead*spacing];
    beginShape(TESS);
    vertex(tempX + spacing*0.5,tempY);   //  x0+spacing*0.5 ; y0
    vertex(tempX + spacing*0.5, tempY + spacing);  //  x0+spacing*0.5 ; y0+spacing
    vertex(tempX + spacing, tempY + spacing*0.5);  //  x0+spacing ; y0+spacing*0.5 (arrow tip)
    endShape(CLOSE);

  }
  
  // I need to draw an arrow, LEFT direction
  arrowDrawLeft(){
    //if left, then this
    let [tempX,tempY] = [this.coordXHead*spacing, this.coordYHead*spacing];
    beginShape(TESS);
    vertex(tempX + spacing*0.5,tempY);   //  x0+spacing*0.5 ; y0
    vertex(tempX + spacing*0.5, tempY + spacing);  //  x0+spacing*0.5 ; y0+spacing
    vertex(tempX, tempY + spacing*0.5);  //  x0+spacing ; y0+spacing*0.5 (arrow tip)
    endShape(CLOSE);
  // vertex(75,50);   //  x0+spacing*0.5 ; y0
  // vertex(75,100);  //  x0+spacing*0.5 ; y0+spacing
  // vertex(50,75);  //  x0 ; y0+spacing*0.5 (arrow tip)
  }

  // I need to draw an arrow, UP direction
  arrowDrawUP(){
    //if up, then this
    let [tempX,tempY] = [this.coordXHead*spacing, this.coordYHead*spacing];
    beginShape(TESS);
    vertex(tempX,tempY + spacing*0.5);   //  x0+spacing*0.5 ; y0
    vertex(tempX + spacing, tempY  + spacing*0.5);  //  x0+spacing*0.5 ; y0+spacing
    vertex(tempX + spacing*0.5, tempY);  //  x0+spacing ; y0+spacing*0.5 (arrow tip)
    endShape(CLOSE);
  //vertex(50,75);   //  x0 ; y0+spacing*0.5
  //vertex(100,75);  //  x0+spacing ; y0+spacing*0.5
  //vertex(75,50);  //  x0+spacing*0.5 ; y0 (arrow tip)
  }
  
  // I need to draw an arrow, DOWN direction
  arrowDrawDown(){
    //if up, then this
    let [tempX,tempY] = [this.coordXHead*spacing, this.coordYHead*spacing];
    beginShape(TESS);
    vertex(tempX,tempY + spacing*0.5);   //  x0+spacing*0.5 ; y0
    vertex(tempX + spacing, tempY  + spacing*0.5);  //  x0+spacing*0.5 ; y0+spacing
    vertex(tempX + spacing*0.5, tempY + spacing);  //  x0+spacing ; y0+spacing*0.5 (arrow tip)
    endShape(CLOSE);
    //vertex(50,75);   //  x0 ; y0+spacing*0.5
    //vertex(100,75);  //  x0+spacing ; y0+spacing*0.5
    //vertex(75,100);  //  x0+spacing*0.5 ; y0+spacing (arrow tip)
   
  }
  
  
  drawArrow(direction){
    return direction == "up" ? this.arrowDrawUP()
        : direction == "down" ? this.arrowDrawDown()
        : direction == "left" ? this.arrowDrawLeft()
        : this.arrowDrawRight();
  }
  
  
    
}