const ROWS = 6;
const COLS = 7;
const EMPTY = " ";
const PLAYER_PIECE = "X";
const CPU_PIECE = "O";
const WINNING_LENGTH = 4;

let board = [];
let currentPlayer = PLAYER_PIECE;

// Initialize the game board
function initBoard() {
  for (let row = 0; row < ROWS; row++) {
    let newRow = [];
    for (let col = 0; col < COLS; col++) {
      newRow.push(EMPTY);
    }
    board.push(newRow);
  }
}

// Print the game board to the console
function printBoard() {
  for (let row = 0; row < ROWS; row++) {
    let rowStr = "| ";
    for (let col = 0; col < COLS; col++) {
      rowStr += board[row][col] + " | ";
    }
    console.log(rowStr);
  }
  console.log("-----------------------------");
}

// Check if a move is valid
function isValidMove(col) {
  return board[0][col] === EMPTY;
}

// Place a piece on the board
function placePiece(row, col, piece) {
  board[row][col] = piece;
}

// Check if a player has won the game
function checkWin(player) {
  // Check horizontal
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col <= COLS - WINNING_LENGTH; col++) {
      let hasWon = true;
      for (let i = 0; i < WINNING_LENGTH; i++) {
        if (board[row][col + i] !== player) {
          hasWon = false;
          break;
        }
      }
      if (hasWon) {
        return true;
      }
    }
  }

  // Check vertical
  for (let row = 0; row <= ROWS - WINNING_LENGTH; row++) {
    for (let col = 0; col < COLS; col++) {
      let hasWon = true;
      for (let i = 0; i < WINNING_LENGTH; i++) {
        if (board[row + i][col] !== player) {
          hasWon = false;
          break;
        }
      }
      if (hasWon) {
        return true;
      }
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let row = 0; row <= ROWS - WINNING_LENGTH; row++) {
    for (let col = 0; col <= COLS - WINNING_LENGTH; col++) {
      let hasWon = true;
      for (let i = 0; i < WINNING_LENGTH; i++) {
        if (board[row + i][col + i] !== player) {
          hasWon = false;
          break;
        }
      }
      if (hasWon) {
        return true;
      }
    }
  }

  // Check diagonal (bottom-left to top-right)
  for (let row = WINNING_LENGTH - 1; row < ROWS; row++) {
    for (let col = 0; col <= COLS - WINNING_LENGTH; col++) {
      let hasWon = true;
      for (let i = 0; i < WINNING_LENGTH; i++) {
        if (board[row - i][col + i] !== player) {
          hasWon = false;
          break;
        }
      }
      if (hasWon) {
        return true;
      }
    }
  }

  // No winning configuration found
  return false;
}

// Get a random valid move for CPU player
function getRandomMove() {
  let validMoves = [];
  for (let col = 0; col < COLS; col++) {
    if (isValidMove(col)) {
      validMoves.push(col);
    }
  }
  return validMoves[Math.floor(Math.random() * validMoves.length)];
}

// Make a move for the CPU player
function makeCPUMove() {
  let col = getRandomMove();
  let row = 0;
  while (row < ROWS && board[row][col] === EMPTY) {
    row++;
  }
  placePiece(row - 1, col, CPU_PIECE);
}

// Start the game
function startGame() {
  initBoard();
  printBoard();

  while (true) {
    if (currentPlayer === PLAYER_PIECE) {
      // Player turn
      let col = prompt(" Enter a column number (1-7) to place your piece: ");

      col--; // Adjust column index
      if (isValidMove(col)) {
        let row = 0;
        while (row < ROWS && board[row][col] === EMPTY) {
          row++;
        }
        placePiece(row - 1, col, PLAYER_PIECE);
        if (checkWin(PLAYER_PIECE)) {
          console.log("Player wins!");
          break;
        }
        currentPlayer = CPU_PIECE;
      } else {
        console.log("Invalid move, please try again.");
      }
    } else {
      // CPU turn
      makeCPUMove();
      console.log("CPU plays:");
      printBoard();
      if (checkWin(CPU_PIECE)) {
        console.log("CPU wins!");
        break;
      }
      currentPlayer = PLAYER_PIECE;
    }
  }
}

// start the game
module.exports.playerVsCpu = startGame;
