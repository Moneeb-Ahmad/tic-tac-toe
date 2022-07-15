/*****************************Game Board***************************************/
const gameBoard = (() => {
  let board = [];
  const init = () => {
    for (let i = 0; i < 3; i++) {
      board.push(["", "", ""]);
    }
  }
  const printArray = () => {
    console.log(board);
  }

  const place = (row, col, val) => {
    if (isBoardEmpty()) {
      init();
    }
    let valid = board[row][col] !== "" ? false : true;
    board[row][col] = valid ? val : board[row][col];
    return valid;
  }
  const getGameOverStatus = () => {
    let arr = [];
    if (isThreeInARow("x")) {
      clearBoard();
      arr.push(true, "X wins");
      return arr;
    } else if (isThreeInARow("y")) {
      clearBoard();
      arr.push(true, "Y wins");
      return arr;
    } else if (isBoardFull()) {
      clearBoard();
      arr.push(true, "Tie");
      return arr;
    } else {
      arr.push(false, "inProgress");
      return arr;
    }

  }

  const isThreeInARow = (val) => {
    if (checkRows(val)) {
      return true;
    }
    if (checkCol(val)) {
      return true;
    }
    if (checkDiag(val)) {
      return true;
    }
    return false;
  }

  const checkRows = (val) => {
    for (let i = 0; i < 3; i++) {
      let chain = 0;
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === val) {
          chain++;
        } else {
          break;
        }
      }
      if (chain === 3) {
        return true;
      }
      chain = 0;
    }
    return false;
  }

  const checkCol = (val) => {
    for (let i = 0; i < 3; i++) {
      let chain = 0;
      for (let j = 0; j < 3; j++) {
        if (board[j][i] === val) {
          chain++;
        } else {
          break;
        }
      }
      if (chain === 3) {
        return true;
      }
      chain = 0;
    }
    return false;
  }
  const checkDiag = (val) => {
    let left =
      board[0][0] === val &&
      board[1][1] === val &&
      board[2][2] === val ? true : false;
    let right =
      board[0][2] === val &&
      board[1][1] === val &&
      board[2][0] === val ? true : false;
    return left || right;
  }

  const isBoardFull = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  }
  const isBoardEmpty = () => {
    return board.length === 0 ? true : false;
  }
  const clearBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = "";
      }
    }
  }
  return {
    printArray,
    place,
    getGameOverStatus
  };
})();
/********************************Player***************************************/
const player = (number) => {
  let playerNumber = number;
  let score = 0;
  const getNumber = () => {
    return playerNumber;
  }
  const getScore = () => {
    return score;
  }
  const incScore = () => {
    score++;
  }
  const move = () => {
    let row = Number(prompt(`${getNumber()} Row:`));
    row -= 1;
    let col = Number(prompt(`${getNumber()} Col:`));
    col -= 1;
    let res = [row, col];
    return res;
  }
  return {
    getNumber,
    getScore,
    incScore,
    move
  };
};
/***************************Controller ***************************************/
const controller = (() => {
  let p1 = player(1);
  let p2 = player(2);
  const play = () => {
    let game = true;
    let result = "";
    while (game) {
      while (true) {
        let m = p1.move();
        let valid = gameBoard.place(m[0], m[1], "x");
        if (valid) {
          break;
        } else {
          alert("Invalid move!");
        }
      }
      gameBoard.printArray();
      let arr = gameBoard.getGameOverStatus();
      if (arr[0]) {
        game = false;
        result = arr[1];
        break;
      }

      while (true) {
        let m = p2.move();
        let valid = gameBoard.place(m[0], m[1], "y");
        if (valid) {
          break;
        } else {
          alert("Invalid move!");
        }
      }
      gameBoard.printArray();
      arr = gameBoard.getGameOverStatus();
      if (arr[0]) {
        game = false;
        result = arr[1];
        break;
      }
    }
    return result;
  }
  return {
    play
  };
})();
/*****************************DRIVER******************************************/
function driver() {
  while (true) {
    let results = controller.play();
    alert(results);
    let playAgain = prompt("Play again?");
    if (playAgain.includes("n") || playAgain.includes("N")) {
      break;
    }
  }
  alert("Thanks for Playing!");
}

driver();
