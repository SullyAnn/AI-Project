import { drawTree } from "./elements.js";
import { randomIntFromInterval } from "./mathFunction.js";
//import { boidFunction } from "./elements.js";

const backgroundCanvas = document.getElementById('backgroundCanvas');
const boidsDiv = document.getElementById('boids');
const gameOfLifeCanvas = document.getElementById("gameOfLife");
const ctx = backgroundCanvas.getContext('2d');
export let xPositon = 0;
let witchXPosition = 50;
let numberOfTrees = 20;
let boidsPos = 0;
let treeXPositions = []; 
let depthRatios = []; 
let angleRatios = [];
//const boids = boidFunction(backgroundCanvas)


let witch = new Image();
witch.src="./assets/witch.png"

let witchTranslated = new Image();
witchTranslated.src="./assets/witch_translated.png"



// set background image
let backgroundImage = new Image();
backgroundImage.src ="./assets/bg-image.webp"
backgroundImage.onload = () => {
    console.log(backgroundImage.width)
    ctx.drawImage(backgroundImage, xPositon, (-backgroundCanvas.height/3-80), backgroundImage.width*1.25, backgroundImage.height*1.25);
    for(let i = 0 ; i<numberOfTrees; i++){ 
        treeXPositions.push(randomIntFromInterval(0, backgroundCanvas.width*2));
        depthRatios.push(randomIntFromInterval(1, 3))
        angleRatios.push(randomIntFromInterval(20,40));
        drawTree(ctx, treeXPositions[i]+=5, depthRatios[i], angleRatios[i])
    }
   console.log(boids)

    ctx.drawImage(witchTranslated, witchXPosition, backgroundCanvas.height-400, witch.width/1.5, witch.height/1.5);
}


// keypressed move the background
document.onkeydown = checKey;
function checKey(e){
    if(e.keyCode == '37' && xPositon!=0) {
        //left arrow 
        ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)
        ctx.drawImage(backgroundImage, xPositon+=5, (-backgroundCanvas.height/3-80), backgroundImage.width*1.25, backgroundImage.height*1.25);
        for(let i = 0 ; i<numberOfTrees; i++){ 
            drawTree(ctx, treeXPositions[i]+=5,depthRatios[i], angleRatios[i])
        }
        gameOfLifeCanvas.scrollLeft -= 5;
       
        boidsDiv.style.left = `${boidsPos-=10}px`
        ctx.drawImage(witch, witchXPosition-=10, backgroundCanvas.height-400, witch.width/1.5, witch.height/1.5);
    }
    if(e.keyCode == '39'  && xPositon>-520) {
        //right arrow 
        ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height)
        ctx.drawImage(backgroundImage, xPositon-=5, (-backgroundCanvas.height/3-80), backgroundImage.width*1.25, backgroundImage.height*1.25);
        for(let i = 0 ; i<numberOfTrees; i++){ 
            drawTree(ctx, treeXPositions[i]-=5, depthRatios[i], angleRatios[i])
        }
        gameOfLifeCanvas.scrollLeft +=5;
        boidsDiv.style.left = `${boidsPos+=10}px`

        ctx.drawImage(witchTranslated,witchXPosition+=10, backgroundCanvas.height-400, witch.width/1.5, witch.height/1.5);

    }
};

