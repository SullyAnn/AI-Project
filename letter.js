import { randomIntFromInterval } from "./mathFunction.js";
import { getRandomFloat } from "./mathFunction.js";

//Creation of the objet boid
  const canvas = document.getElementById('canvas4');
  const ctx = canvas.getContext('2d');
  let flou = 1;
 
// Src: MDN
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateLetter() {
  const code = random(97, 123); // ASCII char codes
  return String.fromCharCode(code);
}

class Member {
  constructor(target) {
    this.target = target;
    this.keys = [];

    for (let i = 0; i < target.length; i += 1) {
      this.keys[i] = generateLetter();
    }
  }

  fitness() {
    let match = 0;

    for (let i = 0; i < this.keys.length; i += 1) {
      if (this.keys[i] === this.target[i]) {
        match += 1;
      }
    }

    return match / this.target.length;
  }
  mutate(mutationRate) {
    for (let i = 0; i < this.keys.length; i += 1) {
      // If below predefined mutation rate,
      // generate a new random letter on this position.
      if (Math.random() < mutationRate) {
        this.keys[i] = generateLetter();
      }
    }
  }

  crossover(partner) {
    const { length } = this.target;
    const child = new Member(this.target);
    const midpoint = random(0, length);

    for (let i = 0; i < length; i += 1) {
      if (i > midpoint) {
        child.keys[i] = this.keys[i];
      } else {
        child.keys[i] = partner.keys[i];
      }
    }

    return child;
  }

}

class Population {
  constructor(size, target, mutationRate) {
    size = size || 1;
    this.members = [];
    this.mutationRate = mutationRate

    for (let i = 0; i < size; i += 1) {

      this.members.push(new Member(target));
    }
  }

  
  _selectMembersForMating() {
    const matingPool = [];

    this.members.forEach((m) => {
      // The fitter it is, the more often it will be present in the mating pool
      // i.e. increasing the chances of selection
      // If fitness == 0, add just one member
      const f = Math.floor(m.fitness() * 100) || 1;

      for (let i = 0; i < f; i += 1) {
        matingPool.push(m);
      }
    });

    return matingPool;
  }

  

  _reproduce(matingPool) {
    for (let i = 0; i < this.members.length; i += 1) {
      // Pick 2 random members/parents from the mating pool
      const parentA = matingPool[random(0, matingPool.length)];
      const parentB = matingPool[random(0, matingPool.length)];
      const child = parentA.crossover(parentB);

      // Perform crossover
        drawWords(child)


      // Perform mutation
      child.mutate(this.mutationRate);
      this.members[i] = child;
    }
  }

  evolve(generations) {
    for (let i = 0; i < generations; i += 1) {

      //evolve every 2 second 
      setInterval(() => {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        const pool = this._selectMembersForMating();
        this._reproduce(pool);
      }, 2000);
      
   }
  }
}

function drawWords(word){
  ctx.font = "24px serif";
  for(let i = 0; i< word.keys.length; i++){
    switch(word.keys[i]){
      case 'a':
        word.keys[i] = "ᚠ"
        break;
      case 'b':
        word.keys[i] = "ᚰ"
        break;
      case 'c':
        word.keys[i] = "ᛀ"
        break;
      case 'd':
        word.keys[i] = "ᛐ"
        break;  
      case 'e':
        word.keys[i] = "ᛠ"
        break;
      case 'f':
        word.keys[i] = "ᛰ"
        break;
      case 'g':
        word.keys[i] = "ᚱ"
        break;
      case 'h':
        word.keys[i] = "ᛁ"
        break;
      case 'i':
        word.keys[i] = "ᛑ"
        break;
      case 'j':
        word.keys[i] = "ᛡ"
        break;
      case 'k':
        word.keys[i] = "ᚢ"
        break;
      case 'l':
        word.keys[i] = "ᚲ"
        break;
      case 'm':
        word.keys[i] = "ᛂ"
        break;
      case 'n':
        word.keys[i] = "ᛒ"
        break;
      case 'o':
        word.keys[i] = "ᛢ"
        break;
      case 'p':
        word.keys[i] = "ᚣ"
        break;  
      case 'q':
        word.keys[i] = "ᚳ"
        break;
      case 'r':
        word.keys[i] = "ᛃ"
        break;
      case 's':
        word.keys[i] = "ᛓ"
        break;
      case 't':
        word.keys[i] = "ᛣ"
        break;
      case 'u':
        word.keys[i] = "ᚤ"
        break;
      case 'v':
        word.keys[i] = "ᚴ"
        break;
      case 'w':
        word.keys[i] = "ᛄ"
        break;
      case 'x':
        word.keys[i] = "ᛔ"
        break;
      case 'y':
        word.keys[i] = "ᛤ"
        break;
      case 'z':
        word.keys[i] = "ᛥ"
        break;
    }
  


  }
  const fullWord = word.keys[0]+word.keys[1]+word.keys[2]+word.keys[3]
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.filter = `blur(${flou}px)`

  ctx.fillText(fullWord, randomIntFromInterval(0, canvas.width), randomIntFromInterval(550, canvas.height-150) )
}

function generate(populationSize, target, mutationRate, generations) {
  // Create a population and evolve for N generations
  const population = new Population(populationSize, target, mutationRate);
  population.evolve(generations);

  // Get the typed words from all members, and find if someone was able to type the target
  const membersKeys = population.members.map((m) => m.keys.join(''));
  const perfectCandidatesNum = membersKeys.filter((w) => w === target);

  // Print the results
  console.log(membersKeys);
  console.log(`${perfectCandidatesNum ? perfectCandidatesNum.length : 0} member(s) typed "${target}"`);
}
generate(20, 'help', 0.05, 5);