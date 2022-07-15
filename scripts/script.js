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
      arr.push(true, "P1 wins!");
      return arr;
    } else if (isThreeInARow("o")) {
      clearBoard();
      arr.push(true, "P2 wins!");
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
    if (isBoardEmpty()) {
      init();
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = "";
      }
    }
  }
  return {
    printArray,
    place,
    getGameOverStatus,
    clearBoard
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
  const move = (row, col) => {
    let res = [row, col];
    return res;
  }


  const removeListeners = () => {
    let elements = document.getElementsByClassName("block");
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeEventListener('click', myFunction, false);
    }
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
  let keyMove = [0, 0];
  let curPlayer = true;
  let elements = document.getElementsByClassName("block");
  let player1 = document.querySelector(".player1");
  let player2 = document.querySelector(".player2");
  let winningDisplay = document.querySelector(".results");
  let result = "";
  const play = () => {
    reset();
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', allowMove);
      elements[i].addEventListener('mouseover', mouseHover);
      elements[i].addEventListener('mouseout', mouseOff);
    }
    alert("Start Game Player 1 Begin!");
    showPlayer(1);
    winningDisplay.textContent = "";
  }

  const endGame = () => {
    let color = result.includes("P1") ? "red" : "green";
    winningDisplay.textContent = result;
    winningDisplay.setAttribute(
      'style',
      `margin-top: 16px;
      font-size: 48px;
      font-weight: bolder;
      color: ${color};`
    );

    for (let i = 0; i < elements.length; i++) {
      elements[i].removeEventListener('click', allowMove);
      elements[i].removeEventListener('mouseover', mouseHover);
      elements[i].removeEventListener('mouseout', mouseOff);
    }
    reset();
  }

  const reset = () => {
    player1.setAttribute(
      'style',
      `border-style: none;
          transform: scale(1);`
    );
    player2.setAttribute(
      'style',
      `border-style: none;
          transform: scale(1);`
    );
    for (let i = 0; i < elements.length; i++) {
      elements[i].removeEventListener('click', allowMove);
      elements[i].textContent = "";
      elements[i].setAttribute(
        'style',
        `opacity: 0.8;`
      );
    }
    gameBoard.clearBoard();
  }
  const showPlayer = (player) => {
    if (player === 1) {
      player1.setAttribute(
        'style',
        `border: 1px;
          border-radius: 50%;
          border-style: solid;
          border-color: red;
          transform: scale(1.1);`
      );
      player2.setAttribute(
        'style',
        `border-style: none;
            transform: scale(1);`
      );

    } else {
      player2.setAttribute(
        'style',
        `border: 1px;
          border-radius: 50%;
          border-style: solid;
          border-color: green;
          transform: scale(1.1);`
      );
      player1.setAttribute(
        'style',
        `border-style: none;
            transform: scale(1);`
      );
    }
  }

  const formatText = (elementText, player) => {
    let color = player === 1 ? "red" : "green";
    elementText.setAttribute(
      'style',
      `font-size: 170px;
      line-height: 125px;
      color: ${color};
      opacity: 1.1;`
    );
  }

  function allowMove(e) {
    let row = e.target.getAttribute("data-key1");
    let col = e.target.getAttribute("data-key2");
    if (curPlayer) {
      showPlayer(1);
      let m = p1.move(row, col);
      let valid = gameBoard.place(m[0], m[1], "x");
      if (valid) {
        showPlayer(2);
        e.target.textContent = "X";
        formatText(e.target, 1);
        curPlayer = curPlayer ? false : true;
      }
    } else {
      showPlayer(2);
      let m = p2.move(row, col);
      let valid = gameBoard.place(m[0], m[1], "o");
      if (valid) {
        showPlayer(1);
        e.target.textContent = "O";
        formatText(e.target, 2);
        curPlayer = curPlayer ? false : true;
      }
    }
    //gameBoard.printArray();
    arr = gameBoard.getGameOverStatus();
    if (arr[0]) {
      game = false;
      result = arr[1];
      endGame();
    }
  };
  function mouseHover(e) {
    if(e.target.style["opacity"] !== "1.1") {
      e.target.style["opacity"] = "1"
      e.target.style["cursor"] = "pointer";
    }

  }
  function mouseOff(e) {
    if(e.target.style["opacity"] !== "1.1") {
      e.target.style["opacity"] = "0.8";
      e.target.style["cursor"] = "pointer";
    }

  }
  return {
    play,
    reset
  };
})();
/*****************************DRIVER******************************************/
function startGame() {
  controller.play();
}

function resetGame() {
  controller.reset();
}


let playBtn = document.querySelector(".play-btn");
playBtn.addEventListener('click', startGame);

let resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener('click', resetGame);
