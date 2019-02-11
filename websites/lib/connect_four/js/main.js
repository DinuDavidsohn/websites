const PLAYER_ONE = "player_one";
const PLAYER_TWO = "player_two";
const EMPTY = "player_none";

const PLAYERS = { EMPTY, PLAYER_ONE, PLAYER_TWO };

const GAME_STATE = {
  PLAYER_ONE,
  PLAYER_TWO,
  DRAW: 0,
  ONGOING: -1
};
const GLOBAL = {
  boardState: initializeBoardState(),
  nextPlayerTurn: PLAYERS.PLAYER_ONE
};

function buildBoard() {
  const boardContainer = document.getElementById("boardContainer");

  for (let i = 0; i < 42; i++) {
    const cellElement = document.createElement("DIV");
    cellElement.classList.add("cell");

    cellElement.addEventListener("click", function () {
      const column = i % 7;
      makeMove(GLOBAL.boardState, column);
      // makeRandomMove();
    });

    boardContainer.appendChild(cellElement);
  }
}

buildBoard();

function initializeBoardState() {
  const boardState = [];
  for (let i = 0; i < 42; i++) {
    boardState.push(PLAYERS.EMPTY);
  }
  return boardState;
}

function togglePlayerTurn() {
  GLOBAL.nextPlayerTurn =
    GLOBAL.nextPlayerTurn === PLAYERS.PLAYER_ONE
      ? PLAYERS.PLAYER_TWO
      : PLAYERS.PLAYER_ONE;
}

function makeMove(boardState, column) {
  let gameState = getGameState(boardState);
  if (gameState !== GAME_STATE.ONGOING) {
    console.log("game ended, player won: ", gameState);
    return;
  }

  const index = findIndexOfLowestRow(boardState, column);
  if (index > -1) {
    boardState[index] = GLOBAL.nextPlayerTurn;
    togglePlayerTurn();
    updateDOM(boardState, index);
  }

  gameState = getGameState(boardState);
  if (gameState !== GAME_STATE.ONGOING) {
    console.log("game ended, player won: ", gameState);
    return;
  }

  return boardState;
}

// Returns the index of lowest empty row at the specific column, -1 if no available empty cells.
function findIndexOfLowestRow(boardState, column) {
  for (let r = 5; r >= 0; r--) {
    if (boardState[r * 7 + column] === PLAYERS.EMPTY) {
      return r * 7 + column;
    }
  }
  return -1;
}

function updateDOM(boardState, index) {
  const cellElement = document.getElementsByClassName("cell")[index];
  cellElement.classList.add(boardState[index]);
}

/*
 Returns the ID of the winning player if the game is won.
 Returns 0 if the game is a draw.
 Returns -1 if the game is ongoing
*/
function getGameState(boardState) {
  // Check rows for a win
  for (let r = 0; r <= 5; r++) {
    for (let c = 0; c < 4; c++) {
      const i = r * 7 + c;
      const isWinning = isWinningSlice(boardState.slice(i, i + 4));
      if (isWinning !== false) return isWinning;
    }
  }

  // Check columns
  for (let c = 0; c < 7; c++) {
    for (let r = 0; r <= 2; r++) {
      const boardSlice = [
        boardState[r * 7 + c],
        boardState[(r + 1) * 7 + c],
        boardState[(r + 2) * 7 + c],
        boardState[(r + 3) * 7 + c]
      ];
      const isWinning = isWinningSlice(boardSlice);
      if (isWinning !== false) return isWinning;
    }
  }

  // Check diagonals for a win
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 7; c++) {
      // Checks left diagonal
      if (c < 4) {
        const boardSlice = [
          boardState[r * 7 + c],
          boardState[(r + 1) * 7 + c + 1],
          boardState[(r + 2) * 7 + c + 2],
          boardState[(r + 3) * 7 + c + 3]
        ];
        const isWinning = isWinningSlice(boardSlice);
        if (isWinning !== false) return isWinning;
      }

      // Checks right diagonal
      if (c >= 3) {
        const boardSlice = [
          boardState[r * 7 + c],
          boardState[(r + 1) * 7 + c - 1],
          boardState[(r + 2) * 7 + c - 2],
          boardState[(r + 3) * 7 + c - 3]
        ];
        const isWinning = isWinningSlice(boardSlice);
        if (isWinning !== false) return isWinning;
      }
    }
  }

  if (boardState.some(val => val === PLAYERS.EMPTY)) {
    return GAME_STATE.ONGOING;
  }

  return GAME_STATE.DRAW;
}

console.log("winning slice test", isWinningSlice([1, 1, 1, 1]));
// Takes 4 cells and returns the winning player's ID if they all match that one player.
// Returns false otherwise.
function isWinningSlice(miniBoard) {
  if (miniBoard.some(p => p === PLAYERS.EMPTY)) {
    return false;
  }
  if (
    miniBoard[0] === miniBoard[1] &&
    miniBoard[1] === miniBoard[2] &&
    miniBoard[2] === miniBoard[3]
  ) {
    return miniBoard[0];
  }

  return false;
}



//main function which makes the change to the board
function decideNextMove() {
  // establish who's who
  var myPieces = GLOBAL.nextPlayerTurn;
  var rivalPieces =
    myPieces === PLAYERS.PLAYER_ONE
      ? PLAYERS.PLAYER_TWO
      : PLAYERS.PLAYER_ONE;

  if (GLOBAL.boardState.includes(PLAYERS.EMPTY)) {
    var bestMove = getBestMove(GLOBAL.boardState, myPieces, rivalPieces)
    makeMove(GLOBAL.boardState, bestMove)
  } else {
    return console.log("Game is over!")
  }
}

//returns the best column for the bot's next move
function getBestMove(gameState, myPieces, rivalPieces) {
  // did we win already? Are they about to win?
  var move = victoryCheck(gameState, myPieces);
  if (move != -1) {
    return move
  }
  var move = victoryCheck(gameState, rivalPieces)
  if (move != -1) {
    return move
  }
  // first move? second move?
  if (gameState.every((val) => val === PLAYERS.EMPTY)) {
    return 3
  }
  if (checkTurnTwo(gameState)) {
    return randomizeSelection([2, 4])
  }
  // game's on
  // search for connecting pieces wrt existing pieces and make sure it doesn't create a win for rival
  var options = getOptions(gameState)
  var optimalOptions = getOptimizedOptions(gameState, myPieces, rivalPieces, options)
  if (!optimalOptions) {
    return randomizeSelection(options)
  }
  return randomizeSelection(optimalOptions)
}


//support functions

// returns column of winning case or blocks winning case if exists or -1 if none
function victoryCheck(gameState, myPieces) {
  for (i = 0; i < 7; i++) {
    var quasiBoard = gameState.slice()
    makeShadowMove(quasiBoard, myPieces, i)
    if (getGameState(quasiBoard) === myPieces) {
      return i
    }
  }
  return -1
}
//modify a boardstate to put piece in a specific column
function makeShadowMove(boardState, player, column) {
  var index = findIndexOfLowestRow(boardState, column);
  if (index > -1) { boardState[index] = player }
  return boardState;
}
//check if the game is in its second turn
function checkTurnTwo(gameState) {
  var emptySpaces = 0
  for (i = 0; i < 42; i++) {
    if (GLOBAL.boardState[i] === "player_none") {
      emptySpaces++
    }
  }
  if (emptySpaces === 41) {
    return true
  }
  else return false
}
//randomly selects on element out of a list
function randomizeSelection(list) {
  return list[getRandomInteger(0, (list.length))]
}
//random integer between a min and a max
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//returns a list of possible placements for the next piece
function getOptions(gameState) {
  options = [];
  for (i=0; i<7; i++) {
    if (findIndexOfLowestRow(gameState, i) !== -1) {
      options.push(i)
    }
  }
  return options
}
//passes a list through tests to remove the suboptimal moves
function getOptimizedOptions(gameState, myPieces, rivalPieces, options) {
  removalList = [];
  for (i = 0; i < options.length; i++) {
    quasiBoard = gameState.splice()
    makeShadowMove(quasiBoard, myPieces, i)    
    if (victoryCheck(quasiBoard, rivalPieces) != 1) {
      removalList.push(i)
    }
  }
  for (j=0; j < removalList.length; j++) {
    var badColumn = removalList[j]
    if (options.includes[badColumn]) {
      options.delete[options.indexOf(badColumn)]
    }
  }
  
  if (options.length === 0) {
    return false
  }
  return options

}