$(function () {
  const chess = new Chess();

  const board = $("#chessboard");
  const boardSize = 64;
  const rank = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const file = [8, 7, 6, 5, 4, 3, 2, 1];
  const cells = {};

  generateBoard();
  updateBoard();

  function generateBoard() {
    for (var y = 0; y < 8; y++) {
      const row = $("<div>");
      row.addClass("row");

      for (var x = 0; x < 8; x++) {
        const coordinate = toCoordinate(x, y);
        const cell = $("<div>");
        cell.attr("data-coordinate", coordinate);
        cell.addClass("cell");
        cell.on('click', onCellClicked);

        cells[coordinate] = cell;

        row.append(cell);
      }

      board.append(row);
    }
  }

  function onCellClicked() {
    const coordinate = $(this).attr("data-coordinate");
    const color = this.classList[1];
    const piece = this.classList[2];

    console.log({
      coordinate,
      color,
      piece
    });
  }

  function toCoordinate(x, y) {
    return rank[x] + file[y];
  }

  function updateBoard() {
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        const piece = chess.board[y][x];

        if (!piece) {
          continue;
        }

        const coordinate = toCoordinate(x, y);
        cells[coordinate].addClass(piece.color);
        cells[coordinate].addClass(piece.type);
      }
    }
  }
});