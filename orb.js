

const orbCanvas = document.getElementById('canvas5');
const ctx = orbCanvas.getContext('2d');
const body = document.querySelector("body")

const orbPositionX = 1400
let orbPositionY = 550
let vitesse = 0.5
const yMax = 565
const yMin = 535

const orb = new Image();
orb.src="./assets/orb.png"

console.log('orb', orb)

// Animation of the orb
orb.onload = () => {
    ctx.drawImage(orb, orbPositionX, orbPositionY, 150, 150);
   

    setInterval(()=> {

        ctx.clearRect(0, 0, orbCanvas.width, orbCanvas.height);

        // dessiner l'image à sa nouvelle position
        ctx.drawImage(orb, orbPositionX, orbPositionY, 150, 150);
      
        // mettre à jour la position de l'image
        orbPositionY += vitesse;
      
        // inverser la direction de la gravité lorsque l'image atteint une des deux valeurs limites
        if (orbPositionY > yMax || orbPositionY < yMin) {
            //console.log(orbPositionY)
            vitesse = -vitesse;
        }
    },10)
}

// CREATION OF DIALOG BOX IN THE DOM //
const newDiv = document.createElement("div");
const dialogBox = document.createElement("img");
dialogBox.src="./assets/dialog.png"

//create text dialog
let newText = document.createElement("p");
newText.style.position ="absolute"
newText.style.fontSize="24px"
newText.style.top="70px"
newText.style.left="50px"

const realText = "ᛁᛠᚲᚣ !!"

// add the text node to the newly created div
newDiv.appendChild(dialogBox);
newDiv.appendChild(newText);
newDiv.style.position ="absolute";
newDiv.style.alignSelf= "flex-end";

//create text name
let name = document.createElement("p");
name.style.position ="absolute"
name.style.fontSize="28px"
name.style.top="0px"
name.style.left="160px"

newDiv.appendChild(name);

const nameText = "Orbe magique"




// INTERACTION WITH ORB //
orbCanvas.addEventListener("click", function(event) {
    // Récupérer les coordonnées du clic par rapport au canvas
    let rect = orbCanvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
  
    // Vérifier si le clic se trouve dans la zone à détecter
    if (mouseX >= orbPositionX-150 && mouseX <= orbPositionX + 150 &&
        mouseY >= orbPositionY-150 && mouseY <= orbPositionY + 150) {
           // add the newly created element and its content into the DOM
            const currentDiv = document.getElementById("divbackgroundCanvas");
            document.body.insertBefore(newDiv, currentDiv);  
            let interval = setInterval(()=> ecrireTexte(realText,interval), vitesseEcriture)
            name.innerHTML="";
            for(let i =0; i<nameText.length;i++){
                name.innerHTML += nameText.charAt(i);
            }
           // let interval2 = setInterval(()=> ecrireTexte(nameText,interval2), vitesseEcriture)
            
    }
  });


  // ANIMATION DIALOG TEXT
  const vitesseEcriture = 100
  let index=0

  function ecrireTexte(texteComplet,interval) {
    
    newText.innerHTML += texteComplet.charAt(index);
    //console.log(newText)
    index++;
    if (index >= texteComplet.length) {
        clearInterval(interval)
    }
}


// INTERACTION WITH DIALOG BOX //
let i = 0

newDiv.addEventListener("click", function(event) {

    //dialog text
    const textArray=[
        "ᛁᛠᚲᚣ !!",
        "*...Décode sa langue runique.*",
        "HELP! Au secours! Je suis prisonnier.",
        "Mais comment vous retrouver ?",
        "Suivez la route des trois sorcières, mon amie vous aidera...",
        "..."
    ]

    const nameArray=[
        "Sorcière",
        "Orbe magique",
        "Sorcière",
        "Orbe magique",
        "Sorcière"
    ]
    // Récupérer les coordonnées du clic par rapport au canvas

    let rect = newDiv.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    console.log("souris", mouseX)
    console.log("souris", mouseY)
    console.log("dialogBox",dialogBox.width)
  
    // Vérifier si le clic se trouve dans la zone à détecter
    if (mouseX >= 20 && mouseX <= 900 &&
        mouseY >= 55 && mouseY <= 220) {

        newText.innerHTML = " ";
        index = 0
        //console.log('i =', i)
        name.innerHTML=""
        
        for(let j =0; j<nameArray[i].length;j++){
            name.innerHTML += nameArray[i].charAt(j);
        }
        let interval = setInterval(()=> ecrireTexte(textArray[i],interval), vitesseEcriture)
        i++
        if(i == 5){
          newDiv.remove();
          i = 0  
        }
    }

  });
