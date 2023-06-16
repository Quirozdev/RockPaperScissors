const possibleChoices = ["Rock", "Paper", "Scissors"];
// this object has the relation between which beats each other
const beatRelation = {
    "Rock": "Scissors",
    "Scissors": "Paper",
    "Paper": "Rock",
}

const gameState = {
    playerScore: 0,
    computerScore: 0,
    draws: 0
};

const selectionButtons = document.querySelectorAll(".player-selection .cards button");
const resultsContainer = document.querySelector("#results-container");
const playerScoreSpan = resultsContainer.querySelector("#player-score");
const computerScoreSpan = resultsContainer.querySelector("#computer-score");
const currentResultParagraph = resultsContainer.querySelector("#current-result");
const finalWinner = resultsContainer.querySelector("#final-winner");

const resetButton = document.querySelector("#reset");

resetButton.addEventListener("click", resetGame);


function activateSelectionButtons() {
    selectionButtons.forEach((selectionButton) => {
        selectionButton.addEventListener("click", game);
        selectionButton.disabled = false;
        selectionButton.classList.add("hoverable");
    });
}


function deactivateSelectionButtons() {
    selectionButtons.forEach((selectionButton) => {
        selectionButton.removeEventListener("click", game);
        selectionButton.disabled = true;
        selectionButton.classList.remove("hoverable");
    });
}


function getComputerChoice() {
    const indexChoice = Math.floor(Math.random() * possibleChoices.length);
    return possibleChoices[indexChoice];
}


function removeSelectedClassToComputerSelection() {
    const currentComputerSelection = document.querySelector(`.computer-selection .cards .selected`);
    if (currentComputerSelection) {
        currentComputerSelection.classList.remove("selected");
    }
}


function showComputerSelection(selection) {
    removeSelectedClassToComputerSelection();
    const selectedComputerButton = document.querySelector(`.computer-selection .cards .${selection.toLowerCase()}`);
    selectedComputerButton.classList.add("selected");
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
            message: `You Won this round! ${playerSelection} beats ${computerSelection}`
        };
    }

    return {
        code: -1,
        message: `You Lose this round! ${computerSelection} beats ${playerSelection}`
    };
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

function showCurrentScores() {
    playerScoreSpan.textContent = gameState.playerScore;
    computerScoreSpan.textContent = gameState.computerScore;
}

function showResults(message, code) {
    currentResultParagraph.textContent = message;
    currentResultParagraph.style.color = code === -1 ? "red" : code === 1 ? "green" : "yellow";
    showCurrentScores();
}


function game(event) {
    const playerChoice = event.target.classList[0];
    const computerChoice = getComputerChoice();
    const result = playRound(playerChoice, computerChoice);
    showComputerSelection(computerChoice)
    updateGameState(result.code);
    showResults(result.message, result.code);

    if (gameState.playerScore === 5) {
        endGame("Player");
    }

    if (gameState.computerScore === 5) {
        endGame("Computer");
    }
}


function endGame(winner) {
    finalWinner.textContent = winner;
    
    deactivateSelectionButtons();
}


function resetGame() {
    currentResultParagraph.textContent = "";
    gameState.playerScore = 0;
    gameState.computerScore = 0;
    gameState.draws = 0;
    showCurrentScores();
    finalWinner.textContent = "";
    removeSelectedClassToComputerSelection();
    activateSelectionButtons();
}


function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}



activateSelectionButtons();