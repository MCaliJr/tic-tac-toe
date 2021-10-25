// add class X or O to div with class .board once it is turn of X or O player, so it will fire the hover effect

// After game finishes, add .show class to div  with .winning-message, so the message will show.

// After player clicks on any part of the board, add HIS element into it (so either O or X, depending on whose round it is)

function popupToggle() {
  console.log("hello");
}

const X_CLASS = "X";
const O_CLASS = "O";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("#board");
let circlesTurn;

startGame();

function startGame() {
  cellElements.forEach((cell) => {
    circlesTurn = false;
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circlesTurn ? O_CLASS : X_CLASS;
  // placeMark
  placeMark(cell, currentClass);
  // check for win
  if (checkWin(currentClass)) {
  }
  // check for draw
  // switch turns
  swapTurns();
  setBoardHover();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circlesTurn = !circlesTurn;
}

function setBoardHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (circlesTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

/*
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
*/
