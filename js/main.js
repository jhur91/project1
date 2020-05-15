/*----- constants -----*/



/*----- app's state (variables) -----*/
let hangMan;
let secretWord;
let guesses;
let newSpace;

/*----- cached element references -----*/
const winnerLine = document.getElementById('winnerLine');

const head = document.getElementById('head');
const torso = document.getElementById('torso');
const leftArm = document.getElementById('leftArm');
const rightArm = document.getElementById('rightArm');
const leftLeg = document.getElementById('leftLeg');
const rightLeg = document.getElementById('rightLeg');


const blankSpaces = document.getElementById('wrapper');
const board = document.getElementById('wordWrapper');
const inputSpace = document.querySelector('input');
const prevGuessDisplay = document.querySelector('ul');

/*----- event listeners -----*/
document.getElementById('submit').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', reset);

inputSpace.addEventListener("keyup", function(event) {
    if(event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submit").click();
    }
});


/*----- functions -----*/
// These are the secret words and how it is randomly chosen from the array.
const secretWordsArray = ["pizza", "watermelon", "book", "guitar", "dog", "apple", "cheese", "broccoli", "chicken", "carrot", "banana", "chocolate", "chimichanga", "spaghetti", "daiquiri", "colleague", "caribbean", "parliament", "perseverance", "restaurant", "questionnaire", "mischievous", "fluorescent", "smorgasbord"]
secretWord= secretWordsArray[Math.floor(Math.random() * secretWordsArray.length)];
//boardsize gets the secret word to split up into individual letters
let boardSize = secretWord.split('');
//currentStanding creates a blank new array based off the length of the secret word and fills in the gaps with null.
let currentStanding = new Array(boardSize.length).fill(null);

//empty array where prevGuesses will fill
let prevGuesses = [];

init()

//this function checks if the secretWord has the input letter.  
function handleClick() {
    if(secretWord.includes(inputSpace.value)) {     
        //this will go through each letter and compare it with input and replace the null space of currentStanding with the correct letter
        boardSize.forEach(function(e,i){       
            if(e===inputSpace.value) {
                currentStanding[i]= e;
            }
        })
    } else {
      //if secretWord doesn't include the input value, it will just push the value into prevGuesses array.
        prevGuesses.push(inputSpace.value);
        guesses = guesses - 1;
    }    
    render();
}

function init() {
    winnerLine.innerText = " ";
    head.classList.add("noDisplay");
    torso.classList.add("noDisplay");
    leftArm.classList.add("noDisplay");
    rightArm.classList.add("noDisplay");
    leftLeg.classList.add("noDisplay");
    rightLeg.classList.add("noDisplay");
    guesses=6;
    prevGuesses= [];

    render();
}

function reset() {
    document.getElementById('submit').addEventListener('click', handleClick);
    secretWord= secretWordsArray[Math.floor(Math.random() * secretWordsArray.length)];
    boardSize = secretWord.split('');
    currentStanding = new Array(boardSize.length).fill(null);
    init();
}

//for each space of currentStanding, we will create a div and fill it in with either underline or letter.
function render() {
    
  board.textContent = "";
  currentStanding.forEach(function(e,i){
      newSpace = document.createElement('div');
      newSpace.setAttribute("class", "boxes");
      if(e===null) {
        newSpace.innerHTML = "__________"
      } else {
        newSpace.innerHTML = `____${e}_____`
      }
      board.appendChild(newSpace);
    })
  if(guesses===0){
      winnerLine.innerText = `You're a LOSER! The secret word is: ${secretWord}`;
    }
   prevGuessDisplay.innerHTML = `Previous Guesses: ${prevGuesses}`;
    
  if(currentStanding.join('')===secretWord){
      winnerLine.innerText = "You win!";
      document.getElementById('submit').removeEventListener('click', handleClick);
    }  
  inputSpace.value = "";  
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
    document.getElementById('submit').removeEventListener('click', handleClick);
  }
}