const gameState = {
  playerName: ["x", "o"],
  inputName: ["", ""],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  wins: [0, 0],
  currentPlayeridx: 0,
};

const board = document.querySelector(".board");

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const box = document.createElement("div");
    box.classList.add("cell");
    box.id = `${i}-${j}`;
    board.appendChild(box);
  }
}

function updateScore() {
  let xScore = document.querySelector(".xScore");
  const xScoreDisplay = document.createElement("span");
  xScore.appendChild(xScoreDisplay);
  xScoreDisplay.innerText = gameState.wins[0];

  let oScore = document.querySelector(".oScore");
  const oScoreDisplay = document.createElement("span");
  oScore.appendChild(oScoreDisplay);
  oScoreDisplay.innerText = gameState.wins[1];
}

function checkWin() {
  let hasWon = false;
  // Check rows for a win
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[i][0] !== null &&
      gameState.board[i][0] === gameState.board[i][1] &&
      gameState.board[i][1] === gameState.board[i][2]
    ) {
      hasWon = true;
    }
  }

  // Check columns for a win
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[0][i] !== null &&
      gameState.board[0][i] === gameState.board[1][i] &&
      gameState.board[1][i] === gameState.board[2][i]
    ) {
      hasWon = true;
    }
  }

  // Check diagonals for a win
  if (
    gameState.board[0][0] !== null &&
    gameState.board[0][0] === gameState.board[1][1] &&
    gameState.board[1][1] === gameState.board[2][2]
  ) {
    hasWon = true;
  }

  if (
    gameState.board[0][2] !== null &&
    gameState.board[0][2] === gameState.board[1][1] &&
    gameState.board[1][1] === gameState.board[2][0]
  ) {
    hasWon = true;
  }
  if (hasWon) {
    let playerName = gameState.playerName[gameState.currentPlayeridx];
    playerText.innerText = `${playerName} wins`;
    gameState.wins[gameState.currentPlayeridx]++;
    updateScore();
    resetGame();
  }
}

function checkTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const currentCell = gameState.board[i][j];
      if (currentCell === null) {
        return;
      }
    }
  }
  playerText.innerText = "it's a tie!";
}

const resetButton = document.querySelector(".resetButton");
resetButton.addEventListener("click", resetGame);

//Reset Game
function resetGame() {
  gameState.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  gameState.wins = [0, 0];

  const allDivs = document.querySelectorAll("div");
  allDivs.forEach((xClass) => {
    xClass.classList.remove("X");
  });
  allDivs.forEach((oClass) => {
    oClass.classList.remove("O");
  });

  cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerText = "";
  });
}

let player = document.querySelector(".currentPlayer");
const playerText = document.createElement("p");
player.appendChild(playerText);

board.addEventListener("click", (event) => {
  // console.log(gameState);

  const row = event.target.id[0];
  const column = event.target.id[2];

  if (gameState.playerName[gameState.currentPlayeridx] === "x") {
    gameState.board[row][column] = "X";
    event.target.innerText = "X";
    event.target.classList.add("X");
    checkWin();
    checkTie();

    gameState.currentPlayeridx = 1;
  } else if (gameState.playerName[gameState.currentPlayeridx] === "o") {
    gameState.board[row][column] = "O";
    event.target.innerText = "O";
    event.target.classList.add("O");
    checkWin();
    checkTie();

    gameState.currentPlayeridx = 0;
  }
});
