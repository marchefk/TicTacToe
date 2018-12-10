let msgContainer = document.getElementById('msg_container');
let currentPlayer = "X";
let askContainer = document.getElementById('ask_container');
let available;
let dContainer = document.getElementsByClassName('dcon');
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

const rows2 = [{
    first: 'd0',
    second: 'd1',
    third: 'd2'
  },
  {
    first: 'd3',
    second: 'd4',
    third: 'd5'
  },
  {
    first: 'd6',
    second: 'd7',
    third: 'd8'
  },
  {
    first: 'd0',
    second: 'd3',
    third: 'd6'
  },
  {
    first: 'd1',
    second: 'd4',
    third: 'd7'
  },
  {
    first: 'd2',
    second: 'd5',
    third: 'd8'
  },
  {
    first: 'd0',
    second: 'd4',
    third: 'd8'
  },
  {
    first: 'd2',
    second: 'd4',
    third: 'd6'
  }
];

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
    askContainer.classList.add("hide");
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
  boardContainer.classList.add("hide");
  askContainer.classList.remove("hide");
  playAgain.classList.add("hide");
  msgContainer.innerHTML = "";
};

//computer's move
let computersMove = () => {
  msgContainer.innerHTML = "Computer's move";
  available = document.getElementsByClassName("empty");
  for (let i = 0; i < 9; i++) {
    dContainer[i].removeEventListener("click", enableClick);
  }
  let chosenID = getComputersResponse(available, dContainer);
  setTimeout(() => {
    document.getElementById(chosenID).innerHTML = currentPlayer;
    document.getElementById(chosenID).classList.remove("empty");
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
      if (currentPlayer === chosenPlayer) {
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
  for (let i = 0; i < rows.length; i++) {
    let elements = rows[i].map(el => document.getElementById(el));
    let [x, y, z] = elements;
    let [a, b, c] = [x.innerHTML, y.innerHTML, z.innerHTML];

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

let getComputersResponse = (available, dcon) => {
  let dconArray = Array.from(dcon);
  let board = dconArray.map(el => el.innerHTML);
  if (available.length === 9) {
    return "d0";
  }
  if (available.length === 8) {
    if (board[4] === "") {
      return "d4";
    }
    return "d0";
  }
  if (available.length === 7) {
    if (board[1] === chosenPlayer || board[2] === chosenPlayer ||
      board[5] === chosenPlayer || board[7] === chosenPlayer ||
      board[8] === chosenPlayer) {
      return "d6";
    }
    if (board[4] === chosenPlayer) {
      return "d8";
    }
    if (board[3] === chosenPlayer || board[4] === chosenPlayer ||
      board[6] === chosenPlayer) {
      return "d2";
    }
  }
  if (available.length <= 6) {
    let id = "";
    for (let i = 0; i < rows2.length; i++) {
      let row = rows2[i];
      let first = document.getElementById(row.first);
      let second = document.getElementById(row.second);
      let third = document.getElementById(row.third);
      id = compareElements(first, second, third, currentPlayer);
      if (id) {
        return id;
      }
    }
    for (let i = 0; i < rows2.length; i++) {
      let row = rows2[i];
      let first = document.getElementById(row.first);
      let second = document.getElementById(row.second);
      let third = document.getElementById(row.third);
      id = compareElements(first, second, third);
      if (id) {
        return id;
      }
    }

    if (board[8] === "") {
      return "d8";
    }
    if (board[6] === "") {
      return "d6";
    }
    if (board[2] === "") {
      return "d2";
    }
    if (board[1] === "") {
      return "d1";
    }
    if (board[0] === "") {
      return "d0";
    }
  }
};

let compareElements = (a, b, c, player) => {
  let [aIH, bIH, cIH] = [a.innerHTML, b.innerHTML, c.innerHTML];
  if (aIH && bIH && aIH === bIH && c.classList.contains("empty")) {
    if ((player && aIH === player) || !player) {
      return c.id;
    }
  }
  if (aIH && cIH && aIH === cIH && b.classList.contains("empty")) {
    if ((player && aIH === player) || !player) {
      return b.id;
    }
  }
  if (bIH && cIH && bIH === cIH && a.classList.contains("empty")) {
    if ((player && bIH === player) || !player) {
      return a.id;
    }
  }
};
