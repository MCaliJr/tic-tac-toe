// Whole game module, returning nothing as game elements call on each other in never ending loop
const game = (() => {
  const X_CLASS = "X";
  const O_CLASS = "O";

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Choose elements from the site
  const cellElements = document.querySelectorAll("[data-cell]");
  const board = document.querySelector("#board");

  const startingMessageElement = document.querySelector("#startingMessage");
  const winningMessageElement = document.querySelector("#winningMessage");
  const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
  );
  const restartButton = document.querySelector("#restartButton");
  const startButton = document.querySelector("#startButton");
  let circlesTurn;

  restartButton.addEventListener("click", resetGame);
  startButton.addEventListener("click", startGame);

  function startGame() {
    cellElements.forEach((cell) => {
      // Delete mark from every cell
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
      // Make sure it is X's turn
      circlesTurn = false;
      cell.removeEventListener("click", handleClick);
      // Make sure user can click on a given board part only once
      cell.addEventListener("click", handleClick, { once: true });
    });
    // Set hover effect for the board
    setBoardHover();
    // Delete starting game message
    startingMessageElement.classList.remove("show");
  }

  function resetGame() {
    // Reset the board and all settings
    startGame();
    // Remove winner alert and display new game screen
    winningMessageElement.classList.remove("show");
    startingMessageElement.classList.add("show");
  }

  function handleClick(e) {
    // Choose clicked cell
    const cell = e.target;
    const currentClass = circlesTurn ? O_CLASS : X_CLASS;
    // Place X or O inside the clicked cell
    placeMark(cell, currentClass);
    // Check for win, draw or continue playing
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
      // Get player nicknames from input fields
      let playerOneName = document.querySelector("#playerOne").value;
      let playerTwoName = document.querySelector("#playerTwo").value;

      // Display winner's name in final message
      winningMessageTextElement.innerText = `${
        !circlesTurn ? `${playerOneName}` : `${playerTwoName}`
      } Wins!!!`;
    }
    winningMessageElement.classList.add("show");
  }

  // Check if there is a draw (no win and every cell taken by some mark)
  function isDraw() {
    return Array.from(cellElements).every((cell) => {
      return (
        cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
      );
    });
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function swapTurns() {
    circlesTurn = !circlesTurn;
  }

  // Make sure board hover effect resets and work only on cells that were not chosen yet!
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
    // Go through winning combinations and return true if any marks happend to take specified cells indexes.
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }
})();
