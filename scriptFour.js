let random = parseInt(Math.random()*100 + 1) // for random value

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas') 

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if(playGame){
    submit.addEventListener('click', (e)=>{
        e.preventDefault(); // for pause default event listener
        const guess = parseInt(userInput.value);
        console.log(guess)
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert("Please give a valid number");
    }
    else if(guess<1){
        alert("please enter a number more than 1");
    }
    else if(guess>100){
        alert("please enter a number less than 100");
    }
    else {
        prevGuess.push(guess);
        if(numGuess === 11){
            displayGuess(guess);
            displayMessage(`GAME OVER. The Random Number Was : ${random}`);
            endGame();
        }
        else {
            displayGuess(guess);  
            checkGuess(guess);  //check if the number is correct
        }
    }

}

function checkGuess(guess){
    if(guess === random){
        displayMessage(`Congratulations! You guessed right`);
        endGame();
    }
    else if(guess < random){
        displayMessage(`Your number is Too low`);
    }
    else if(guess > random){
        displayMessage(`Your number is Too high`);
    }
}

function displayGuess(guess){
    userInput.value = '' //Cleanup
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${10-numGuess} `;

}
function displayMessage(message){
    lowOrHi.innerHTML = `<h1>${message}</h1>`;

}
function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h1 id="newGame" >Start New Game</h1>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}
function newGame(){
   const newGameButton = document.querySelector('#newGame');
   newGameButton.addEventListener('click', function(e){
   random = parseInt(Math.random()*100 + 1);
   prevGuess = [];
   numGuess = 1;
   guessSlot.innerHTML = '';
   remaining.innerHTML = `${10-numGuess} `;
   userInput.removeAttribute('disabled');
   startOver.removeChild(p);
   playGame = 'true';

   });
}