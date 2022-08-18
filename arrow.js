function setup() {
  //variables
  let [x0, y0, width, height] = [50, 50, 0.75*50, 0.5*50];
  
  // Create the canvas
  createCanvas(720, 400);
  background(200);

  // Set colors
  fill(204, 101, 192, 127);
  stroke(127, 63, 120);

  //a box around
  rect(x0,y0,50,50)

  // An arrow
  rect(x0,y0*1.25,width,height)
  
  //if right or left, rect is horizontal, if up or down is vertical,
  // which is just a switch of variables 
  
   beginShape(TESS);
   vertex(75,50);
   vertex(75,100);
   vertex(100,75);
   endShape(CLOSE);
  
}
