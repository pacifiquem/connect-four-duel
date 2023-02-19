const Game = require("./Game.js");

class PlayerVsCpu extends Game {
  constructor() {
    super();
  }

  async playGame() {

    this.initBoard();
    this.printBoard();

    while (true) {
      if (this.currentPlayer === this.PLAYER_PIECE) {
        // Player turn
        let col = await this.getPlayerMove("You");

        if (this.isValidMove(col)) {
          let row = 0;
          while (row < this.ROWS && this.board[row][col] === this.EMPTY) {
            row++;
          }
          this.placePiece(row - 1, col, this.PLAYER_PIECE);
          if (this.checkWin(this.PLAYER_PIECE)) {
            console.log("Player wins!");
            break;
          }
          this.currentPlayer = this.CPU_PIECE;
        } else {
          console.log("Invalid move, please try again.");
        }
      } else {
        // CPU turn
        this.makeCPUMove();
        console.log("CPU plays:");
        this.printBoard();
        if (this.checkWin(this.CPU_PIECE)) {
          console.log("CPU wins!");
          break;
        }
        this.currentPlayer = this.PLAYER_PIECE;
      }
    }
  }

  // Make a move for the CPU player
  makeCPUMove() {
    let col = this.getRandomMove();
    let row = 0;
    while (row < this.ROWS && this.board[row][col] === this.EMPTY) {
      row++;
    }
    this.placePiece(row - 1, col, this.CPU_PIECE);
  }

  // Place a piece on the board
  placePiece(row, col, piece) {
    this.board[row][col] = piece;
  }

}

const playGround = new PlayerVsCpu();
playGround.playGame();