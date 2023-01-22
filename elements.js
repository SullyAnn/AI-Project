import { randomIntFromInterval } from "./mathFunction.js";
import { getRandomFloat } from "./mathFunction.js";

// DRAW FRACTAL TREE
export function drawTree(ctx, xBGPosition, depthRatio, angleRatio ){
ctx.strokeStyle = '#01031f';
ctx.lineWidth = 0.35;

let deg_to_rad = Math.PI / 180.0;
let depth = 11;

function drawLine(x1, y1, x2, y2){
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}

function draw(x1, y1, angle, depth){
  if (depth !== 0){
    let x2 = x1 + (Math.cos(angle * deg_to_rad) * depth * depthRatio);
    let y2 = y1 + (Math.sin(angle * deg_to_rad) * depth * depthRatio);
    drawLine(x1, y1, x2, y2, depth);
    draw(x2, y2, angle - angleRatio, depth - 1);
    draw(x2, y2, angle + angleRatio, depth - 1);
  }
}

ctx.beginPath();
draw(xBGPosition, 900, -90, depth);
ctx.closePath();
ctx.stroke();
}

//BOIDS 

//Creation of the objet boid
  const canvas = document.getElementById('canvas3');
  const ctx = canvas.getContext('2d');
  const boids = [];
  const numberOfBoids = 20;
//const ctx = canvas.getContext('2d');

function Boid(x,y) {
  this.position = {x: x, y: y};
  this.velocity = {x: getRandomFloat(0, 1, 1) * 2 - 1, y: getRandomFloat(0, 1, 1) * 2 - 1 };
  this.acceleration = { x: 0, y: 0};

 

  this.update = function() {
    // Calculate the average position of nearby boids
     // Check if the boid is outside the canvas boundaries
  if (this.position.x < 70 || this.position.x > 330 || this.position.y < 70 || this.position.y > 330) {
    // If the boid is outside the boundaries, apply a correction to steer it back towards the center of the canvas
    this.acceleration.x = (100 - this.position.x) * 0.01;
    this.acceleration.y = (100 - this.position.y) * 0.01;
  } else {

    let avgPos = { x: 0, y: 0 };
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      const other = boids[i];
      if (other !== this) {
        const distance = Math.sqrt(Math.pow(other.position.x - this.position.x, 2) + Math.pow(other.position.y - this.position.y, 2));
        if (distance < 100) {
          avgPos.x += other.position.x;
          avgPos.y += other.position.y;
          count++;
        }
      }
    }
    if (count > 0) {
      avgPos.x /= count;
      avgPos.y /= count;

      // Steer towards the average position of nearby boids (cohesion)
      this.acceleration.x = (avgPos.x - this.position.x) * 0.01;
      this.acceleration.y = (avgPos.y - this.position.y) * 0.01;
  
      // Match the average velocity of nearby boids (alignment)
      // this.acceleration.x += (avgVel.x - this.velocity.x)*0.01 ;
      // this.acceleration.y += (avgVel.y - this.velocity.y)*0.01;
    }}
    var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    var maxSpeed = 2;
    if(speed > maxSpeed) {
        this.velocity.x = this.velocity.x / speed * maxSpeed;
        this.velocity.y = this.velocity.y / speed * maxSpeed;
    } else { 

    this.velocity.x += this.acceleration.x*0.05;
    this.velocity.y += this.acceleration.y*0.05;
    }
  
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  
  }
}

for(let i = 0; i < numberOfBoids; i++ ){
  boids.push(new Boid(randomIntFromInterval(100, canvas.width-100), randomIntFromInterval(100, canvas.height-100)));
}
const rand = randomIntFromInterval(1, 3);


function drawBoids() {
  ctx.clearRect(0,0, backgroundCanvas.width, backgroundCanvas.height);

  boids.forEach(boid => {
    const currentBoid = boid;
    ctx.beginPath();
    ctx.arc(currentBoid.position.x, currentBoid.position.y, 5, 0, 2 * Math.PI);
    ctx.filter= `blur(1.5px)`
    ctx.fillStyle ='rgba(255, 204, 166, 0.5)';
    ctx.fill();
    boid.update();
  })
}

   setInterval(drawBoids, 1000/60);

