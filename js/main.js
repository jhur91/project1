/*----- constants -----*/



/*----- app's state (variables) -----*/
let hangMan;
let secretWord;
let guesses;
let newSpace;

/*----- cached element references -----*/
const head = document.getElementById('head');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightArm = document.getElementById('rightArm');
const leftLeg = document.getElementById('leftLeg');
const rightLeg = document.getElementById('rightLeg');


const blankSpaces = document.getElementById('wrapper');
const board = document.getElementById('wordWrapper');
console.log(board)
const inputSpace = document.querySelector('input');
const prevGuessDisplay = document.querySelector('ul');

/*----- event listeners -----*/
document.getElementById('submit').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', reset);

/*----- functions -----*/

let secretWordsArray = ["pizza", "watermelon", "book", "guitar", "dog"]
secretWord= secretWordsArray[Math.floor(Math.random() * secretWordsArray.length)];

// secretWord= secretWordsArray[Math.floor(Math.random() * secretWordsArray.length)];
let boardSize = secretWord.split('');
let currentStanding = new Array(boardSize.length).fill(null);


let prevGuesses = [];

init()




function handleClick() {
    if(secretWord.includes(inputSpace.value)) {
        console.log("included!");
       
        boardSize.forEach(function(e,i){
            console.log(e);
            console.log(e===inputSpace.value);
            if(e===inputSpace.value) {
                currentStanding[i]= e;
            }
        })
    } else {
        console.log("not included!")
        prevGuesses.push(inputSpace.value);
        guesses = guesses - 1;

    }
    console.log(currentStanding);
    
    render();
}

function init() {
    guesses=6;
    prevGuesses= [];

    render();
}

function reset() {
    secretWord= secretWordsArray[Math.floor(Math.random() * secretWordsArray.length)];
    console.log(secretWord);
    boardSize = secretWord.split('');
    currentStanding = new Array(boardSize.length).fill(null);
    init();
}

function render() {
    
    board.textContent = "";
    currentStanding.forEach(function(e,i){
    newSpace = document.createElement('div');
    console.log(newSpace);
    newSpace.setAttribute("class", "boxes");
    if(e===null) {
        newSpace.innerHTML = "__________"
    } else {
        newSpace.innerHTML = `____${e}_____`
    }
   
    console.log(newSpace);
    board.appendChild(newSpace);
    })
    console.log(`remaining guesses: ${guesses}`);
    if(guesses===0){
        alert("you're a loser!");
    }
    prevGuessDisplay.innerHTML = `Previous Guesses: ${prevGuesses}`;
    
    if(currentStanding.join('')===secretWord){
    alert("winner")
    }  
  bodyParts();
}
    

function bodyParts(){
  if(guesses===5){
    head.classList.remove("noDisplay");
  }
  if(guesses===4){
    torso.classList.remove("noDisplay");
  }
  if(guesses===3){
    leftArm.classList.remove("noDisplay");
  }
  if(guesses===2){
    rightArm.classList.remove("noDisplay");
  }
  if(guesses===1){
    leftLeg.classList.remove("noDisplay");
  }
  if(guesses===0){
    rightLeg.classList.remove("noDisplay");
  }
}