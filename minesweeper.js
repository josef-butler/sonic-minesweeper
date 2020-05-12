document.addEventListener('DOMContentLoaded', startGame)

var boardSize = 6;
var board = {cells: []}

function createBoard() {
  for (i = 0; i < boardSize; i++) {
    for (j = 0; j < boardSize; j++) {
      let tileX = i;
      let tileY = j;
      let mineChance = generateMine();

      let newCell = {
        col: tileX,
        row: tileY,
        hidden: true,
        isMine: mineChance
      }
      board.cells.push(newCell);
    }
  }
}

function generateMine() {
  let chance = Math.random();
  if (chance <= 0.25) {
    return true;
  } else {
    return false;
  }
}

// Function to set up the game
function startGame () {
  createBoard();

  // For each cell, determine the number of surrounding cells that are mines to display as hints
  for (i = 0; i < board.cells.length; i++) {
    let cell = board.cells[i];
    cell.surroundingMines = countSurroundingMines(cell);
  }

  // Events to check for a win scenario
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

/* Function to check for a win condition -- if all non-mine cells are revealed.

Old logic (from the course material is):

1. All cells that are not mines are revealed, or;
2. All mines are marked and all cells are revealed

For reference, a "cell" here is a non-mine cell and a mine is a mine cell */

function checkForWin () {

  let countUnmarkedMines = 0;
  let countMarkedCells = 0;
  let countHiddenCells = 0;

  for (k = 0; k < board.cells.length; k++) {

    let cellBeingChecked = board.cells[k];
    
//    if (cellBeingChecked.isMine == true && cellBeingChecked.isMarked != true) {
//      countUnmarkedMines++;
//    }

    if (cellBeingChecked.isMine != true && cellBeingChecked.hidden == true) {
      countHiddenCells++;
    }

//    if (cellBeingChecked.isMine != true && cellBeingChecked.isMarked == true) {
//      countMarkedCells++;
//    }
  }

  if (countHiddenCells == 0) {
    lib.displayMessage('You win!')
  } else {
    return;
  }
}

/* Function to determine which of the surrounding cells are mines.
It uses the lib.getSurroundingCells function that was already defined */
function countSurroundingMines(cell) {
  let surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  let mineCount = 0;

  for (j = 0; j < surroundingCells.length; j++) {
    let individualCell = surroundingCells[j];
    if (individualCell.isMine == true) {
      mineCount++
    }
  }
  return mineCount;
}