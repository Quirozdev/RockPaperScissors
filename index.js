const possibleChoices = ["Rock", "Paper", "Scissors"];
// this object has the relation between which beats each other
const beatRelation = {
    "Rock": "Scissors",
    "Scissors": "Paper",
    "Paper": "Rock",
}

const selectionButtons = document.querySelectorAll(".card-selection");
const resultsDiv = document.querySelector("#results");
const playerScoreSpan = resultsDiv.querySelector("#player-score");
const computerScoreSpan = resultsDiv.querySelector("#computer-score");
const currentResultParagraph = resultsDiv.querySelector("#current-result");

const gameState = {
    playerScore: 0,
    computerScore: 0,
    draws: 0
};

selectionButtons.forEach((selectionButton) => {
    selectionButton.addEventListener("click", game);
});

function showResults(message) {
    currentResultParagraph.textContent = message;
    playerScoreSpan.textContent = gameState.playerScore;
    computerScoreSpan.textContent = gameState.computerScore;
}

function updateGameState(code) {
    if (code === 0) {
        gameState.draws += 1;
    } else if (code === 1) {
        gameState.playerScore += 1;
    } else {
        gameState.computerScore += 1;
    }
}

function getComputerChoice() {
    const indexChoice = Math.floor(Math.random() * possibleChoices.length);
    return possibleChoices[indexChoice];
}


function playRound(playerSelection, computerSelection) {
    playerSelection = capitalize(playerSelection);
    if (playerSelection === computerSelection) {
        return {
            code: 0,
            message: `Draw! ${playerSelection} and ${computerSelection}`
        };
    }

    if (beatRelation[playerSelection] === computerSelection) {
        return {
            code: 1,
            message: `You Won! ${playerSelection} beats ${computerSelection}`
        };
    }

    return {
        code: -1,
        message: `You Lose! ${computerSelection} beats ${playerSelection}`
    };
}

function game(event) {
    const result = playRound(event.target.id, getComputerChoice());
    updateGameState(result.code);
    showResults(result.message);

    if (gameState.playerScore === 5) {
        endGame("Player");
    }

    if (gameState.computerScore === 5) {
        endGame("Computer");
    }
}

function endGame(winner) {
    alert(`The ${winner} won!!`)
    
    selectionButtons.forEach((selectionButton) => {
        selectionButton.removeEventListener("click", game);
    });
}

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}



// game(5);