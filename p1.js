// Array to store coordinates
let board = [];
// Canvas variables
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// Set square size
let squareSize = 100;

// Current player's color
let currentPlayer = 'red'; // I am assuming red starts first

// Set Piece Object
function createPiece(row, col, color) {
  return {
    row: row,
    col: col,
    color: color,
    isClicked: false,
    isKing: false,
    draw: function (ctx, squareSize) {
      const x = this.col * squareSize + squareSize / 2;
      const y = this.row * squareSize + squareSize / 2;

      if (this.isClicked) {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();

      if (this.isKing) {
        // Circle  
        ctx.beginPath();
        ctx.arc(x, y - 20, 10, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x - 8, y - 10, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 8, y - 10, 3, 0, Math.PI * 2);
        ctx.fill();

        // Smile Arc
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y + 5, 8, 0, Math.PI);
        ctx.stroke();
      }
    },
    checkKing: function () {
      if ((this.color === 'red' && this.row === 7) || (this.color === 'gray' && this.row === 0)) {
        this.isKing = true;
      }
    },
    move: function (newRow, newCol) {
      this.row = newRow;
      this.col = newCol;
      this.checkKing();
    },
    isValidMove: function (newRow, newCol) {
      if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
        return false;
      }

      // Calculate the direction based on the current player's color
      let direction;
      if (this.color === 'red') {
        direction = 1;
      } else {
        direction = -1;
      }

      const rowDifference = newRow - this.row;
      const colDifference = Math.abs(newCol - this.col);

      // Check if the destination cell is empty
      if (board[newRow][newCol] !== null) {
        return false;
      }

      // Normal move for non-kings
      if (!this.isKing && rowDifference === direction && colDifference === 1) {
        return true;
      }

      // Check for capturing move
      if (rowDifference === 2 * direction && colDifference === 2) {
        const middleRow = this.row + direction;
        const middleCol = this.col + (newCol - this.col) / 2;

        // Check if there's an opponent's piece at the middle position
        if (board[middleRow][middleCol] && board[middleRow][middleCol].color !== this.color) {
          const behindRow = newRow + direction;
          const behindCol = newCol + (this.col - newCol) / 2;

          // Check if the square behind the opponent's piece is empty
          if (!board[behindRow][behindCol]) {
            // Capturing move
            board[middleRow][middleCol] = null; // Remove the captured piece from the board
            this.move(newRow, newCol); // Move the current piece to the new position
            return true;
          }
        }
      }

      // King can move diagonally in any direction
      if (this.isKing && colDifference === rowDifference && colDifference > 0) {
        let stepRow = direction;
        let stepCol = 1;
        if (newRow < this.row) {
          stepRow *= -1;
        }
        if (newCol < this.col) {
          stepCol *= -1;
        }
        for (let i = this.row + stepRow, j = this.col + stepCol; i !== newRow; i += stepRow, j += stepCol) {
          if (board[i][j]) {
            return false;
          }
        }
        return true;
      }

      return false; // Default: invalid move
    }
  };
}

// Draw Board
function drawBoard(ctx, squareSize) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let color;
      if ((i + j) % 2 === 0) {
        color = 'white';
      } else {
        color = 'black';
      }
      ctx.fillStyle = color;
      ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
    }
  }
}

// Draw Pieces
function drawPieces(ctx, squareSize) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piece = board[i][j];
      if (piece) {
        piece.draw(ctx, squareSize);
      }
    }
  }
}

// Get selected piece
function getSelectedPiece() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piece = board[i][j];
      if (piece && piece.isClicked === true) {
        return piece;
      }
    }
  }
  return null;
}

// Function to switch players
function switchPlayer() {
  if (currentPlayer === 'red') {
    currentPlayer = 'gray';
  } else {
    currentPlayer = 'red';
  }
}

// Set red and grey boxes with for loop
for (let i = 0; i < 8; i++) {
  board[i] = [];
  for (let j = 0; j < 8; j++) {
    if ((i >= 0 && i <= 2) || (i >= 5 && i <= 7)) {
      if ((i % 2 == 0 && j % 2 != 0) || (j % 2 == 0 && i % 2 != 0)) {
        if (i >= 0 && i <= 2) {
          board[i][j] = createPiece(i, j, "red");
        } else {
          board[i][j] = createPiece(i, j, "gray");
        }
      } else {
        board[i][j] = null;
      }
    } else {
      board[i][j] = null;
    }
  }
}

// Call functions on load of page
document.addEventListener('DOMContentLoaded', function () {
  drawBoard(ctx, squareSize);
  drawPieces(ctx, squareSize);
});

// Click event on canvas
canvas.addEventListener("click", function (event) {
  var x = event.offsetX;
  var y = event.offsetY;

  var cellWidth = canvas.width / board.length;
  var cellHeight = canvas.height / board.length;

  var clickedRow = Math.floor(y / cellHeight);
  var clickedCol = Math.floor(x / cellWidth);

  var clickedPiece = board[clickedRow][clickedCol];

  // Check if the clicked piece belongs to the current player
  if (clickedPiece && clickedPiece.color === currentPlayer) {
    var selectedPiece = getSelectedPiece();
    if (selectedPiece) {
      selectedPiece.isClicked = false;
      if (selectedPiece.isValidMove(clickedRow, clickedCol)) {
        board[selectedPiece.row][selectedPiece.col] = null;
        selectedPiece.move(clickedRow, clickedCol);
        board[clickedRow][clickedCol] = selectedPiece;
        switchPlayer(); // Switch turn after successful move
      }
    }
    board[clickedRow][clickedCol].isClicked = !board[clickedRow][clickedCol].isClicked;
  } else {
    var selectedPiece = getSelectedPiece();
    if (selectedPiece) {
      if (selectedPiece.isValidMove(clickedRow, clickedCol)) {
        board[selectedPiece.row][selectedPiece.col] = null;
        selectedPiece.move(clickedRow, clickedCol);
        board[clickedRow][clickedCol] = selectedPiece;
        switchPlayer(); // Switch turn after successful move
      }
      selectedPiece.isClicked = false;
    }
  }
  // Call functions
  drawBoard(ctx, squareSize);
  drawPieces(ctx, squareSize);
});