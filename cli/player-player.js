// Set up the game board
const ROWS = 6;
const COLS = 7;
let board = [];

for (let row = 0; row < ROWS; row++) {
  board.push([]);
  for (let col = 0; col < COLS; col++) {
    board[row].push(".");
  }
}

// Print the game board to the console
function printBoard() {
  console.log(" 1 2 3 4 5 6 7");
  for (let row = 0; row < ROWS; row++) {
    console.log(board[row].join(" "));
  }
}

// Check if the specified player has won the game
function checkWin(player) {
  // Check for horizontal wins
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // Check for vertical wins
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      ) {
        return true;
      }
    }
  }

  // Check for diagonal wins (down-right)
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        return true;
      }
    }
  }

  // Check for diagonal wins (down-left)
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 3; col < COLS; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col - 1] === player &&
        board[row + 2][col - 2] === player &&
        board[row + 3][col - 3] === player
      ) {
        return true;
      }
    }
  }

  // No win condition met
  return false;
}

// Get the player's move from the console
function getPlayerMove(player) {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`${player}, enter column number: `, (col) => {
      readline.close();
      resolve(parseInt(col) - 1);
    });
  });
}

// Play the game
async function playGame() {
  let currentPlayer = "X";

  while (true) {

    console.log("\n\n");
    printBoard();
    console.log("\n");

    // Get the player's move
    let col = await getPlayerMove(currentPlayer);

    // Place the player's piece on the board
    let row = ROWS - 1;
    while (row >= 0 && board[row][col] !== ".") {
      row--;
    }

    if (row < 0) {
      console.log("Column is full, try again");
    } else {
      board[row][col] = currentPlayer;
      if (checkWin(currentPlayer)) {
        printBoard();
        console.log(`${currentPlayer} wins!`);
        return;
      } else if (board.every((row) => row.every((col) => col !== "."))) {
        printBoard();
        console.log("Game over, tie!");
        return;
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

playGame();