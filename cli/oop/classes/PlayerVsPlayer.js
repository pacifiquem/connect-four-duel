const Game = require("./Game.js");

class PlayerVsPlayer extends Game {
  constructor() {
    super();
  }

  // Play the game
  async playGame() {
    let currentPlayer = "X";

    while (true) {

      console.log("\n\n");
      this.initBoard();
      this.printBoard();
      console.log("\n");

      // Get the player's move
      let col = await this.getPlayerMove(currentPlayer);

      // Place the player's piece on the board
      let row = this.ROWS - 1;
      while (row >= 0 && this.board[row][col] !== ".") {
        row--;
      }

      if (row < 0) {
        console.log("Column is full, try again");
      } else {
        this.board[row][col] = currentPlayer;
        if (this.checkWin(currentPlayer)) {
            this.printBoard();
          console.log(`${currentPlayer} wins!`);
          return;
        } else if (this.board.every((row) => row.every((col) => col !== "."))) {
            this.printBoard();
          console.log("Game over, tie!");
          return;
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }
}

module.exports = PlayerVsPlayer;