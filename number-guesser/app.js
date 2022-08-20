/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Values

let min = 1,
    max = 10,
    winningNum = getRandomNo(),
    guessLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'), 
      message = document.querySelector('.message');
      
      minNum.textContent = min;
      maxNum.textContent = max;

guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if the guess is equal to winning a number 
    if(guess === winningNum) {
        gameOver(true, `${winningNum} is correct!, You Win!`);
    } else {
        guessLeft -= 1;
        if(guessLeft === 0) {
            gameOver(false, `Game Over!, You Lost! Correct number was ${winningNum}`);
        } else {
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessLeft} guesses left.`, 'red');
        }
    }
});

game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

function gameOver(won, msg) {
    let color;
    won ? color = 'green' : color = 'red';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'; 
}

function setMessage(errorMsg, color) {
    message.textContent = errorMsg;
    message.style.color = color;
}

function getRandomNo() {
    return Math.floor(Math.random() * (max - min + 1) + min);
}