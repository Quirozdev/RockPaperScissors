const possibleChoices = ["Rock", "Paper", "Scissors"];
// this object has the relation between which beats each other
const beatRelation = {
    "Rock": "Scissors",
    "Scissors": "Paper",
    "Paper": "Rock",
}


function getComputerChoice() {
    const indexChoice = Math.floor(Math.random() * possibleChoices.length);
    return possibleChoices[indexChoice];
}


function playRound(playerSelection, computerSelection) {
    playerSelection = capitalize(playerSelection);
    if (playerSelection === computerSelection) {
        return `Draw! ${playerSelection} and ${computerSelection}`
    }

    if (beatRelation[playerSelection] === computerSelection) {
        return `You Won! ${playerSelection} beats ${computerSelection}`;
    }

    return `You Lose! ${computerSelection} beats ${playerSelection}`;
}

function game(numberOfPlays = 5) {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 1; i <= numberOfPlays; i++) {
        const resultString = playRound(prompt("Rock, Paper or Scissors?"), getComputerChoice());
        if (resultString.includes("Won")) {
            playerScore++;
        } else if (resultString.includes("Lose")) {
            computerScore++;
        }
        console.log(`${resultString}\nPlayer Score: ${playerScore}\tComputer Score: ${computerScore}`);
    }
    if (playerScore === computerScore) {
        console.log("Final result: Draw!!!!");
        return;
    }

    if (playerScore > computerScore) {
        console.log("Final result: You Won!!!!");
        return;
    }

    console.log("Final result: The Computer Won!!!!");
}

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}



game(5);