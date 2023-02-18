#!/usr/bin/env
const playerVsCpu = require('./player-cpu');
const playerVsPlayer = require('./player-player');


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

    console.log("\n\n");
    console.log("== Choose a game mode or display Help ==\n");
    console.log("1. Player vs CPU");
    console.log("2. Player vs Player");

    let gameMode = await getInput();

    switch(gameMode) {
        case 1:
            playerVsCpu();
            break;
        case 2:
            playerVsPlayer();
            break;
        default:
            console.log("Invalid option, please try again.");
            break;
    }

}

play();