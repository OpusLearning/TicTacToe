const turn = {
  changeturn: (current) => (current === "X" ? "O" : "X"),
};

const checkWinningPattern = (() => {
  const winPatterns = [
    "111000000",
    "000111000",
    "000000111", // Horizontal wins
    "100100100",
    "010010010",
    "001001001", // Vertical wins
    "100010001",
    "001010100", // Diagonal wins
  ];

  return (currentGame, turn) => {
    let g = currentGame.map((e) => (e === turn ? "1" : "0")).join("");
    return winPatterns.includes(g);
  };
})();

const gameBoardAdd = (() => {
  let currentGame = new Array(9).fill(false);

  const resetGame = () => {
    currentGame = new Array(9).fill(false);
  };

  const addMove = (turn, position) => {
    if (!currentGame[position]) {
      currentGame[position] = turn;
      return currentGame;
    } else {
      return false;
    }
  };

  return { addMove, resetGame };
})();

const playGame = () => {
  createGrid();
  let currentTurn = "X";

  while (true) {
    let gameBoard = gameBoardAdd.addMove(currentTurn);

    if (gameBoard === false) {
      continue;
    }

    if (checkWinningPattern(gameBoard, currentTurn)) {
      break;
    }

    if (!gameBoard.includes(false)) {
      break;
    }
  }

  if (confirm("Play again?")) {
    gameBoardAdd.resetGame();
    playGame();
  }
};

const gameGrid = (() => {
  return function createGrid() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.id = `cell${i}`;
      cell.classList.add("tictactoe-cell");
      cell.dataset.index = i;

      cell.addEventListener("click", function () {
        gameManager.cellClick(i);
      });

      gridContainer.appendChild(cell);
    }
  };
})();

const gameManager = (() => {
  let currentGame = new Array(9).fill(false);
  let currentPlayer = "X";
  let gameActive = true;

  const initializeGame = () => {
    currentPlayer = "X";
    gameActive = true;
    currentGame = new Array(9).fill(false);
    updateDisplay();
  };

  const handleCellClick = (cellIndex) => {
    if (gameActive && !currentGame[cellIndex]) {
      let updatedGame = gameBoardAdd.addMove(currentPlayer, cellIndex);
      if (updatedGame) {
        currentGame = updatedGame;
        updateDisplay();
        checkWinOrDraw();
        if (gameActive) {
          switchTurn();
        }
      }
    }
  };

  const checkWinOrDraw = () => {
    if (checkWinningPattern(currentGame, currentPlayer)) {
      alert(`Player ${currentPlayer} wins!`);
      gameActive = false;
    } else if (!currentGame.includes(false)) {
      alert("It's a draw!");
      gameActive = false;
    }
  };

  const switchTurn = () => {
    currentPlayer = turn.changeturn(currentPlayer);
  };

  const resetGame = () => {
    currentPlayer = "X";
    gameActive = true;
    currentGame = new Array(9).fill(false);
    gameBoardAdd.resetGame();
    updateDisplay();
  };

  const updateDisplay = () => {
    document.querySelectorAll(".tictactoe-cell").forEach((cell, index) => {
      cell.textContent = currentGame[index] || "";
    });
  };

  return {
    startGame: initializeGame,
    cellClick: handleCellClick,
    reset: resetGame,
  };
})();

document.getElementById("resetButton").addEventListener("click", () => {
  gameManager.reset();
});

window.addEventListener("load", () => {
  gameGrid();
  gameManager.startGame();
});
