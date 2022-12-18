const tiles = Array.from(document.querySelectorAll(".tile"));
const playerDisplay = document.querySelector(".display-player");
const resetButton = document.querySelector("#reset");
const announcer = document.querySelector(".announcer");

let board;
let currentPlayer;
let isGameActive;

const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const DRAW = "DRAW";

const WINNING_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function announce(type) {
  switch (type) {
    case PLAYERO_WON:
      announcer.innerHTML = 'Player <span class="playerO">0</span> Won!';
      break;
    case PLAYERX_WON:
      announcer.innerHTML = 'Player <span class="playerX">X</span> Won!';
      break;
    case DRAW:
      announcer.innerHTML = "Draw!";
  }
  announcer.classList.remove("hide");
}

function handleResultValidation() {
  for (let i = 0; i <= 7; i++) {
    const [a, b, c] = WINNING_CONDITIONS[i].map((idx) => board[idx]);
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }
  }
  console.log(board, board.every(Boolean));

  if (board.every(Boolean)) {
    announce(DRAW);
  }
}

function userAction(tile, index) {
  if (isValidAction(tile) && isGameActive) {
    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
}

function updateBoard(index) {
  board[index] = currentPlayer;
}

function startGame() {
  board = Array(9).fill("");
  isGameActive = true;
  currentPlayer = "X";
  announcer.classList.add("hide");

  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.classList.remove("playerX");
    tile.classList.remove("playerO");
  });
}

function isValidAction(tile) {
  return tile.innerText === "";
}

function changePlayer() {
  playerDisplay.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`);
}

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userAction(tile, index));
});

resetButton.addEventListener("click", startGame);

startGame();
