import { random, randomIntFromInterval } from "./mathFunction.js";
import { getRandomFloat } from "./mathFunction.js";

// random color
function getRandomColor() {
 //couleur en RGB entre 0 et 255
 const color = randomIntFromInterval(150, 255);
 return color;
}

//BOIDS 
const target = ["250", "255", "255"];

const canvas = document.getElementById('canvas4');
   const ctx = canvas.getContext('2d');
  // const flies = [];
  const populationSize = 100;
  const mutationRate = 0.01;
  const genNumber = 50;
  let YCoordinate = 0;
  
  // array to store snowflakes
  var snowflakes = [];

  // Definition of a single fly comportment
  class Fly {
    constructor(target){
    this.position = {x: randomIntFromInterval(0, canvas.width), y: YCoordinate};
    this.target = target;
    this.color = [];
    //this.radius = 2;
    this.vy = 0;
    this.vx = 0;
    this.r = 0;
    //this.updater();
    //this.reset();

    for(let i = 0; i < target.length; i++){
      this.color[i] = getRandomColor();
    }
  }
  

  fitness() {
    // on vérifie que chaque élément du tableau de couleur coresspons a peut près à la cible  
    let matches = 0;

    for (let i = 0; i < target.length; i++) {
      let diff = Math.abs(this.color[i]- this.target[i])
      if (this.color[i] === this.target[i]) {
        matches ++;
      } else if (diff <= 30 ){
        matches ++;
      }
    }
  return matches / this.target.length;
}

   crossover = function(partner){
    const { length } = this.target;
    const child = new Fly(this.target);
    const mid = random(0, length);

    for (let i = 0; i < length; i ++) {
      if (i > mid) {
        child.color[i] = this.color[i];
      } else {
        child.color[i] = partner?.color[i];
      }
    }
    return child;
    }

    mutate(mutationRate){
    //mutation : on génére une couleur aléatoire 
      for (let i = 0; i < this.color.length; i ++) {
        if (Math.random() < mutationRate) {
          this.color[i] = getRandomColor();
        }
      }
    }

    reset() {
      this.position.x = Math.random() * canvas.width;
      this.position.y = Math.random() * canvas.height - canvas.height;
      this.vy = 1 + Math.random() * 3;
      this.vx = 0.5 - Math.random();
      this.r = 1 + Math.random() * 2;
      this.o = 0.5 + Math.random() * 0.5;
    }
  
  
    updater = function(snowflake) {
    //  ctx.clearRect(0, 0, canvas.width, canvas.height);


    
    console.log("0", snowflake)
    snowflake.forEach((snow)=>{
      const current = new Fly(target)
      current.color = snow.color
      current.position = snow.position
      current.fitness() = snow.fitness()
      console.log(current)
    })
    //   /
    //   //console.log("0", snowflake)
    //   //snowflake.position?.x += snowflake.vx;
    //   snowflake.position.y += 10;
    // drawCircle(snowflake.color[0],snowflake.color[1], snowflake.color[2], snowflake.position.x, snowflake.position.y)
      
      // // if snowflake goes off the bottom of the screen, reset it
      // if (this.position.y > canvas.height) {
      //   this.reset();
      // }
    }
  }

  function updater(snowflake) {
    //  ctx.clearRect(0, 0, canvas.width, canvas.height);

      console.log("0", snowflake)
      snowflake.forEach((snow)=>{
        const current = new Fly(target)
        current.color = snow.color
        current.position = snow.position
        current.fitness() = snow.fitness()
        console.log(current)
      })
        // console.log(snowflake.color)
        // YCoordinate
        // drawCircle(snowflake?.color[0],snowflake?.color[1], snowflake?.color[2], snowflake.position.x,YCoordinate)
     
      //snowflake.position?.x += snowflake.vx;
    //   snowflake.position.y += 10;
    // drawCircle(snowflake.color[0],snowflake.color[1], snowflake.color[2], snowflake.position.x, snowflake.position.y)
      
      // // if snowflake goes off the bottom of the screen, reset it
      // if (this.position.y > canvas.height) {
      //   this.reset();
      // }
    }

  class Population{
    constructor(size, target, mutationRate){
    this.size = size || 1;
    this.members = []
    this.mutationRate = mutationRate;



  for(let i = 0; i< size; i++){
    this.members.push(new Fly(target));
    snowflakes.push(this.members)
    
    YCoordinate+= 0.05;
    drawCircle(this.members[i].color[0],this.members[i].color[1], this.members[i].color[2], this.members[i].position.x, YCoordinate)
  }
}

  evolve(generations){
    
    for(let i = 0; i<generations; i++){
      const pool = this.selectMemberForMating();
      
      this.reproduce(pool);
    }
  }

  selectMemberForMating(){
    const matingPool = [];

    this.members.forEach((m) => {
      const f = Math.floor(m?.fitness() * 100) || 1;

      for (let i = 0; i < f; i += 1) {
        matingPool.push(m);
      }
    });

    return matingPool;
  }

  reproduce(matingPool){
    
    this.members.forEach((member)=> {
      // On choisi 2 parents random dans le tableau matingPool
      const parentA = matingPool[random(0, matingPool.length)];
      const parentB = matingPool[random(0, matingPool.length)];

      // Mélange des parents dans l'enfant 
      const child = parentA?.crossover(parentB);
       //Dessin de l'enfant avec un timeout
  
      setTimeout(() => {

        YCoordinate += 0.25;
        drawCircle(child?.color[0],child?.color[1], child?.color[2], child?.position.x, YCoordinate)
        snowflakes.push(child);

       }, 1000)

     child?.mutate(this.mutationRate);
     member = child;

    })
    
  }

}

function drawCircle(Red, Green, Blue, X, Y){

  var ctx = canvas.getContext('2d'); 
  var R = randomIntFromInterval(0,4);
  ctx.beginPath();
  ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
  ctx.lineWidth = 3;
  ctx.filter ='blur(5px)';
  ctx.fillStyle = `rgba(${Red},${Green},${Blue}, ${0.15})`;
  ctx.fill();

  
}
  // Fonction generate qui regroupe le tout 
  function generate(populationSize, target, mutationRate, generations) {
    // Acutalisation du canvas quand on appelle la fonction 
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width, canvas.height);
  
    // Creation de la population et évolution sur un nombre donné de génération
    const population = new Population(populationSize, target, mutationRate);
    population.evolve(generations);
    setTimeout(() => {
    console.log(snowflakes[0].updater(snowflakes[0]))
      
    }, 2000);
    
  }

  // Dessiner un canva
  //ctx.clearRect(0,0,canvas.width, canvas.height);

  generate(populationSize, target ,mutationRate, genNumber );

  //console.log(generate(populationSize, target ,mutationRate, genNumber))
  //console.log(new Population(10, target, 0.05))


  // animation loop
  function animate() {
    // clear canvas
console.log(snowflakes)
    // update and draw snowflakes
  /*  setTimeout(() => {
      for (var i = 0; i < snowflakes.length; i++) {
        let snowflake = snowflakes[i];
        console.log(snowflakes)
  
        snowflake[i]?.update();
  
        //snowflake[i]?.draw();
      }
    }, "5000");
    */
   
  

    // request another animation frame
   // requestAnimationFrame(animate);
  }

  // start animation
  animate();

