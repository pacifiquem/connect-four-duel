#!/usr/bin/env node

const PlayerVsPlayer = require("./classes/PlayerVsPlayer.js");
const PlayerVsCpu = require("./classes/PlayerVsCpu.js");

function getInput() {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Enter Your option : `, (option) => {
      readline.close();
      resolve(parseInt(option));
    });
  });
}

async function play() {
  console.log("\n\n== Choose a game mode or display Help ==\n");
  console.log("1. Player vs CPU");
  console.log("2. Player vs Player\n");

  let gameMode = await getInput();
  let playGround;
  switch (gameMode) {
    case 1:
      console.log("\n\n === Player(X) vs CPU(0) ===\n\n");
      playGround = new PlayerVsCpu();
      playGround.playGame();
      break;
    case 2:
      console.log("\n\n === Player(X) vs Player(0) ===\n\n");
      playGround = new PlayerVsPlayer();
      playGround.playGame();
      break;
    default:
      console.log("Invalid option, please try again.");
      break;
  }
}

play();
