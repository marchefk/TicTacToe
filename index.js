let mainContainer = document.getElementById('mainContainer');
let msgContainer = document.getElementById('msgContainer');
let boardContainer = document.getElementById('boardContainer');
let dContainer = document.getElementsByClassName('dcon');
let chosenPlayer;
let random;
let available;
let currentPlayer = "X";
let askContainer = document.getElementById('askContainer');
askContainer.innerHTML = 'Choose a player. </br>';
let oButton = document.createElement('button');
let xButton = document.createElement('button');
oButton.id = "oButton";
xButton.id = "xButton";
askContainer.appendChild(oButton);
askContainer.appendChild(xButton);
oButton.innerHTML = 'O';
xButton.innerHTML = 'X';
let playAgain = document.getElementById('playAgain');
let playAgainButton = document.createElement('button');
playAgainButton.id = ("playAgainButton");
playAgain.appendChild(playAgainButton);
playAgainButton.innerHTML = "Play Again";
let matchArray = ["row1", "row2", "row3", "col1", "col2", "col3", "cr1", "cr2"];
let allButtons = document.getElementsByTagName("button");
for (var b = 0; b < allButtons.length; b++) {
    allButtons[b].classList.add("btn");
}

oButton.onclick = function() {
    chosenPlayer = "O";
    play();
}

xButton.onclick = function() {
    chosenPlayer = "X";
    play();
}

playAgainButton.onclick = function() {
    for (var k = 0; k < dContainer.length; k++) {
        dContainer[k].innerHTML = "";
        dContainer[k].classList.add("empty");
        if (dContainer[k].classList.contains("green")) {
            dContainer[k].classList.remove("green");
        }
    }
    boardContainer.className = "hide";
    askContainer.classList.remove("hide");
    playAgain.className = "hide";
    msgContainer.innerHTML = "";
}

function computersMove() {
        available = document.getElementsByClassName("empty");
        random = Math.floor(Math.random() * available.length);
        available[random].innerHTML = currentPlayer;
        available[random].classList.remove("empty");
        if (hasAWinner()) {
            msgContainer.innerHTML = "Computer won!";
        } else {
            if (hasEmptySpace()) {
                togglePlayer();
                playersMove();
            } else {
                msgContainer.innerHTML = "No winner";
                playAgain.classList.remove("hide");
            }
        }

}

function play() {
    askContainer.className = "hide";
    boardContainer.classList.remove("hide");
    if (currentPlayer === chosenPlayer) {
        playersMove();
    } else {
        msgContainer.innerHTML = "Computer's move";
        computersMove();
    }
}

function playersMove() {
    msgContainer.innerHTML = "Your move";
    for (var i = 0; i < 9; i++) {
        dContainer[i].addEventListener("click", function() {
            if (this.classList.contains("empty")) {
                this.innerHTML = chosenPlayer;
                this.classList.remove("empty");
                if (hasAWinner()) {
                    msgContainer.innerHTML = "You won!";
                } else {
                    if (hasEmptySpace()) {
                        togglePlayer();
                        msgContainer.innerHTML = "Computer's move";
                        computersMove();
                    } else {
                        msgContainer.innerHTML = "No winner";
                        playAgain.classList.remove("hide");
                    }
                }
            }
        })
    }
}

function hasEmptySpace() {
    for (var i = 0; i < 9; i++) {
        if (document.getElementById(`d${i}`).classList.contains("empty")) {
            return true;
        }
    }
    return false;
}

function togglePlayer() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
}

function isCurrentPlayer(x) {
    return x.innerHTML === currentPlayer;
}

function match() {
    for (var c = 0; c < matchArray.length; c++) {
        let currClass = document.getElementsByClassName(matchArray[c]);
        let arr = [];
        for (var a = 0; a < currClass.length; a++) {
            arr.push(currClass[a]);
        }
        if (arr.every(isCurrentPlayer)) {
            for (var m = 0; m < arr.length; m++) {
                arr[m].classList.add("green");
            }
            return true;
        }
    }
    return false;
}

function hasAWinner() {
    if (match()) {
        for (var l = 0; l < dContainer.length; l++) {
            if (dContainer[l].classList.contains("empty")) {
                dContainer[l].classList.remove("empty");
            }
        }
        playAgain.classList.remove("hide");
        return true;
    } else {
        return false;
    }
}
