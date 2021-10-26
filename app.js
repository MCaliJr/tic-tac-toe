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
const winningMessageElement = document.querySelector("#winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restartButon = document.querySelector("#restartButton");
let circlesTurn;

startGame();

restartButon.addEventListener("click", startGame);

function startGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    circlesTurn = false;
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circlesTurn ? O_CLASS : X_CLASS;
  // placeMark
  placeMark(cell, currentClass);
  // check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHover();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${
      circlesTurn ? "O's" : "X's"
    } Wins!!!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return Array.from(cellElements).every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
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

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
