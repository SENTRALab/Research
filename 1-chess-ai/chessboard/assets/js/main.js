const board = document.getElementsByClassName("chess-board")[0];
const boardSize = 64;
const rank = ["A", "B", "C", "D", "E", "F", "G", "H"];
const file = [1, 2, 3, 4, 5, 6, 7, 8];

function generateBoard() {
  for (let i = 0; i < boardSize; i++) {
    board.appendChild(document.createElement("div")).style.backgroundColor =
      parseInt(i / 8 + i) % 2 == 0 ? "white" : "black";
  }
}

$(() => generateBoard());
