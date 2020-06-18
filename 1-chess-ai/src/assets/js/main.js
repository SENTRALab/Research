$(function () {
  const board = $("#chessboard");
  const boardSize = 64;
  const rank = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const file = [8, 7, 6, 5, 4, 3, 2, 1];
  const cells = {};

  // load starting position
  const chess = new Chess();
  chess.loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  console.log(chess.board.pieceCoords);
  
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

  function toXY(coordinate) {
    return {
      x: rank.indexOf(coordinate[0]),
      y: file.indexOf(parseInt(coordinate[1]))
    };
  }

  function updateBoard() {
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        const piece = Chess.piece.toHumanInfo(chess.board.get(x, y));

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