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

  const addMove = (turn) => {
    let position = prompt(`Player ${turn}'s turn. Enter a square 0 - 8`);
    position = parseInt(position);

    if (isNaN(position) || position < 0 || position > 8) {
      alert("Not a valid position. Pick a number between 0 and 8.");
      return false;
    }

    if (!currentGame[position]) {
      currentGame[position] = turn;
      alert(`${turn} placed at position ${position}`);
      return currentGame;
    } else {
      alert("This square has been taken");
      return false;
    }
  };

  return { addMove, resetGame };
})();

const playGame = () => {
  let currentTurn = "X";

  while (true) {
    let gameBoard = gameBoardAdd.addMove(currentTurn);

    if (gameBoard === false) {
      alert("Invalid move, try again.");
      continue;
    }

    if (checkWinningPattern(gameBoard, currentTurn)) {
      alert(`Winner! ${currentTurn} wins the game!`);
      break;
    }
    currentTurn = turn.changeturn(currentTurn);

    if (!gameBoard.includes(false)) {
      alert("Game over, it's a draw!");
      break;
    }
  }

  if (confirm("Play again?")) {
    gameBoardAdd.resetGame();
    playGame();
  }
};

// Start the game
playGame();
