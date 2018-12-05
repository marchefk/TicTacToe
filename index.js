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

let hasAWinner = () => {
  const rows = [
    ['d0', 'd1', 'd2'],
    ['d3', 'd4', 'd5'],
    ['d6', 'd7', 'd8'],
    ['d0', 'd3', 'd6'],
    ['d1', 'd4', 'd7'],
    ['d2', 'd5', 'd8'],
    ['d0', 'd4', 'd8'],
    ['d2', 'd4', 'd6']
  ];
  for (let i = 0; i < rows.length; i++) {
    let elements = rows[i].map(el => document.getElementById(el));
    let [x, y, z] = elements;

    if (x.innerHTML && y.innerHTML && z.innerHTML &&
      x.innerHTML === y.innerHTML &&
      x.innerHTML === z.innerHTML) {
        elements.forEach(e => e.classList.add("green"));
        for (let i = 0; i < dContainer.length; i++){
          if (dContainer[i].classList.contains("empty")){
            dContainer[i].classList.remove("empty");
          }
        }
      playAgain.classList.remove("hide");
      return x.innerHTML;
    }
  }
  return false;
}
