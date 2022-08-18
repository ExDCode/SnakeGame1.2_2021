//Originally designed as a class, in JS classes don't have variables, so it was a bit tedious, so I decided to learn how to describe OOP through functions from Coding train video
class Apple{
  
  constructor(){
    this.randX = parseInt(random(maxCoordVal));
    this.randY = parseInt(random(maxCoordVal));
  
  }
  
  
  spawn(){
    this.randX = parseInt(random(maxCoordVal));
    this.randY = parseInt(random(maxCoordVal));
    //console.log(this.randX + "  " + this.randY) 
  }
  
  drawApple(){
    boxSK(this.randX, this.randY, colorAPL)
    //rect(this.randX, this.randY, spacing, spacing)
  }
  
  getCoordX(){
    return this.randX;
  }
  getCoordY(){
    return this.randY;
  }
}