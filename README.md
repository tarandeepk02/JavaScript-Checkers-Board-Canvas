# Checkers Board Canvas Project 🎯

## Overview
This is a JavaScript-based checkers game board project. It visually represents a standard 8x8 checkers board using the HTML5 Canvas, initializes the pieces (red and gray), and allows interaction via mouse clicks.

## Features
- ✅ 8x8 checkers board drawn on HTML5 Canvas.
- 🎨 Colored squares in alternating black and white.
- 🔴 Red and gray checkers pieces drawn in their starting positions.
- 🖱️ Mouse click interaction to detect and alert the contents of the clicked square.
- 🧠 Board is backed by a 2D JavaScript array.

## Technologies Used
- HTML5
- CSS3
- JavaScript (DOM manipulation & Canvas API)

## How It Works
1. A canvas of 800x800 is created in HTML.
2. A 2D array (`board`) is initialized with `"red"`, `"gray"`, or `""` representing the pieces.
3. `drawBoard()` uses nested loops to render alternating square colors.
4. `drawPieces()` draws circular checker pieces based on the board's array values.
5. On page load, the board and pieces are drawn.
6. On canvas click:
   - The square clicked is calculated.
   - The row and column are printed to the console.
   - An alert shows what is stored in the board array at that square.

## Screenshots

<img width="591" alt="game" src="https://github.com/user-attachments/assets/197f12fd-57a7-4230-abc0-2d8862e6f092" />

## How to Run
1. Clone the repo or download the ZIP:
2. Open `index.html` in any modern browser.
