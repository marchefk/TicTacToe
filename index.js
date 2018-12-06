let msgContainer = document.getElementById('msg_container');
let currentPlayer = "X";
let askContainer = document.getElementById('ask_container');
let available;
let dContainer = document.getElementsByClassName('dcon');

// prepare the board
let boardContainer = document.getElementById('board_container');
(() => {
  for (let i = 0; i < 9; i++) {
    let div = document.createElement("div");
    div.id = `d${i}`;
    div.classList.add("dcon", "col-xs-4", "empty");
    boardContainer.appendChild(div);
  }
})();


// choosing the symbol to play (x or o) and starting the game
let chosenPlayer;
let symbolButtons = document.getElementsByClassName("choose-symbol");
for (let i = 0; i < symbolButtons.length; i++) {
  symbolButtons[i].onclick = () => {
    chosenPlayer = symbolButtons[i].innerHTML;
    askContainer.className = "hide";
    boardContainer.classList.remove("hide");
    if (currentPlayer === chosenPlayer) {
      playersMove();
    } else {
      computersMove();
    }
  };
}

// play again action
let playAgain = document.getElementById('play_again');
let playAgainButton = document.getElementById("play_again_button");

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
};

//computer's move
let computersMove = () => {
  msgContainer.innerHTML = "Computer's move";
  available = document.getElementsByClassName("empty");
  for (let i = 0; i < 9; i++){
    dContainer[i].removeEventListener("click", enableClick);
  }
  let random = Math.floor(Math.random() * available.length);
  setTimeout(() => {
    available[random].innerHTML = currentPlayer;
    available[random].classList.remove("empty");
    if (hasAWinner()) {
      msgContainer.innerHTML = "Computer won!";
    } else {
      continueGame();
    }
  }, 1000);
};

// callback function for clicking on empty spaces
let enableClick = function() {
    this.innerHTML = chosenPlayer;
    this.classList.remove("empty");
    if (hasAWinner()) {
      msgContainer.innerHTML = "You won!";
    } else {
      continueGame();
    }

};

// player's move
let playersMove = () => {
  msgContainer.innerHTML = "Your move";
  let available = document.getElementsByClassName("empty");
  for (let i = 0; i < available.length; i++) {
    available[i].addEventListener("click", enableClick);
  }
};

// check for empty space and if the game can continue, continue the game
let continueGame = () => {
  for (let i = 0; i < 9; i++) {
    if (document.getElementById(`d${i}`).classList.contains("empty")) {
      togglePlayer();
      if (currentPlayer === chosenPlayer){
        playersMove();
        return;
      } else {
        computersMove();
        return;
      }
    }
  }
  msgContainer.innerHTML = "No winner";
  playAgain.classList.remove("hide");
};

// change the current symbol
let togglePlayer = () => {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
};

// check if there is a winner
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
      for (let i = 0; i < dContainer.length; i++) {
        if (dContainer[i].classList.contains("empty")) {
          dContainer[i].classList.remove("empty");
          dContainer[i].removeEventListener("click", enableClick);
        }
      }
      playAgain.classList.remove("hide");
      return x.innerHTML;
    }
  }
  return false;
};
