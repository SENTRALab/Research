const EMPTY = 0;
const KING = 1;
const QUEEN = 2;
const BISHOP = 3;
const KNIGHT = 4;
const ROOK = 5;
const PAWN = 6;

const BLACK = 8;
const WHITE = 0;

const TYPE = 7;
const COLOR = 8;

const colorStrings = {
  [BLACK]: "black",
  [WHITE]: "white"
};

const typeStrings = {
  [EMPTY]: "empty",
  [KING]: "king",
  [QUEEN]: "queen",
  [BISHOP]: "bishop",
  [KNIGHT]: "knight",
  [ROOK]: "rook",
  [PAWN]: "pawn"  
};

const fen2type = {
  "r": ROOK,
  "n": KNIGHT,
  "b": BISHOP,
  "q": QUEEN,
  "k": KING,
  "p": PAWN 
};

function Chess() {
  const self = this;

  this.board = new ChessBoard();

  this.loadFEN = function(fen) {
    const fenIdx = 0;
    let x = 0;
    let y = 0;
    for (let i = 0; i < fen.length; i++) {
      const fenChar = fen[i];

      if (fenChar === ' ') {
        // don't care about the other stuff for now
        break;
      } else if (fenChar === '/') {
        // next row
        y++;
        x = 0;
      } else if (isNaN(fenChar)) {
        // this is a piece
        const isUpperCase = fenChar === fenChar.toUpperCase();
        const color = isUpperCase ? WHITE : BLACK;
        const type = fen2type[fenChar.toLowerCase()];
        self.board.set(x, y, color | type);

        x++;
      } else if (!isNaN(fenChar)) {
        // this is a number of empty spots
        x += parseInt(fenChar);
      } else {
        throw new Error("Unknown token in FEN string: " + fenChar);
      }
    }
  };
}

Chess.piece = {
  toHumanInfo: function(piece) {
    return {
      color: colorStrings[piece & ~TYPE],
      type: typeStrings[piece & ~COLOR]
    };
  },
  getColor: function(piece) {
    return piece & ~TYPE;
  },
  getType: function(piece) {
    return piece & ~COLOR;
  }
};

function ChessBoard() {
  this.boardData = [
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY]
  ];
  this.pieceCoords = {};

  this.set = function(x, y, piece) {
    const currentPiece = this.boardData[y][x];
    if (currentPiece) {
      // remove the existing coordinate entry
      this.pieceCoords[currentPiece] = this.pieceCoords[currentPiece].filter(loc => loc.x !== x && loc.y !== y);
    }

    this.boardData[y][x] = piece;

    if (!piece) {
      // when it's an empty piece, we do not want to keep track of that in pieceCoords
      return;
    }

    if (!this.pieceCoords[piece]) {
      this.pieceCoords[piece] = [];
    }

    this.pieceCoords[piece].push({x, y});
  };

  this.get = function(x, y) {
    return this.boardData[y][x];
  };

}