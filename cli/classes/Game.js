class Game {
  constructor() {
    this.ROWS = 6;
    this.COLS = 7;
    this.EMPTY = ".";
    this.PLAYER_PIECE = "X";
    this.CPU_PIECE = "O";
    this.WINNING_LENGTH = 4;
    this.board = [];
    this.board = [];
    this.currentPlayer = this.PLAYER_PIECE;
  }

  // Initialize the game board
  initBoard() {
    for (let row = 0; row < this.ROWS; row++) {
      let newRow = [];
      for (let col = 0; col < this.COLS; col++) {
        newRow.push(this.EMPTY);
      }
      this.board.push(newRow);
    }
  }

  // Print the game board to the console
  printBoard() {
    console.log("1 2 3 4 5 6 7");
    for (let row = 0; row < this.ROWS; row++) {
      console.log(this.board[row].join(" "));
    }
  }

  // Get the player's move from the console
  getPlayerMove(player) {
    return new Promise((resolve) => {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      readline.question(
        `${player}, enter column number between (1, 7): `,
        (col) => {
          readline.close();
          resolve(parseInt(col) - 1);
        }
      );
    });
  }

  // Check if the specified player has won the game
  checkWin(player) {
    // Check for horizontal wins
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS - 3; col++) {
        if (
          this.board[row][col] === player &&
          this.board[row][col + 1] === player &&
          this.board[row][col + 2] === player &&
          this.board[row][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check for vertical wins
    for (let row = 0; row < this.ROWS - 3; row++) {
      for (let col = 0; col < this.COLS; col++) {
        if (
          this.board[row][col] === player &&
          this.board[row + 1][col] === player &&
          this.board[row + 2][col] === player &&
          this.board[row + 3][col] === player
        ) {
          return true;
        }
      }
    }

    // Check for diagonal wins (down-right)
    for (let row = 0; row < this.ROWS - 3; row++) {
      for (let col = 0; col < this.COLS - 3; col++) {
        if (
          this.board[row][col] === player &&
          this.board[row + 1][col + 1] === player &&
          this.board[row + 2][col + 2] === player &&
          this.board[row + 3][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Check for diagonal wins (down-left)
    for (let row = 0; row < this.ROWS - 3; row++) {
      for (let col = 3; col < this.COLS; col++) {
        if (
          this.board[row][col] === player &&
          this.board[row + 1][col - 1] === player &&
          this.board[row + 2][col - 2] === player &&
          this.board[row + 3][col - 3] === player
        ) {
          return true;
        }
      }
    }

    // No win condition met
    return false;
  }

  // Check if a move is valid
  isValidMove(col) {
    return this.board[0][col] === this.EMPTY;
  }

  // Get a random valid move for CPU player
  getRandomMove() {
    let validMoves = [];
    for (let col = 0; col < this.COLS; col++) {
      if (this.isValidMove(col)) {
        validMoves.push(col);
      }
    }
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }
}

module.exports = Game;