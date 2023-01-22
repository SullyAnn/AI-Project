export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

export function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }
  
  export function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  
    // Max inclusif et min exclusif 
    return Math.floor(Math.random() * (max - min)) + min;
  }