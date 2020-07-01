// @flow

export const BOARD_SIZE = 8;
export const N_MINES = 10;
export const HIDDEN_TYPES = Object.freeze({"hidden": 0, "flag": 1});
export const SHOWN_TYPES = Object.freeze({"empty": 0, "mine": 1});
export const STATUS_TYPES = Object.freeze({"won": 0, "lost": 1, "idle": 2});

const isValid = (x: number, y: number): boolean => {
  return x >= 0 && y >= 0 && x < BOARD_SIZE && y < BOARD_SIZE;
}

export class Square {
    +x: number;
    +y: number;
    +hiddenType: number;
    shownType: number;
    value: number;
    hidden: boolean;

    constructor(x: number, y: number, hiddenType: number, shownType: number) {
      this.x = x;
      this.y = y;
      this.value = 0;
      this.hiddenType = hiddenType;
      this.shownType = shownType;
      this.hidden = true;
    }
}

export class Board {
  +size: number;
  +squares: Array<Array<Square>>;
  status: number;

  constructor(squares: Array<Array<Square>>) {
    this.size = BOARD_SIZE;  
    this.squares = squares;
    this.status = STATUS_TYPES.idle;
  }

  getMines(): Array<Square> {
    var result = [];
    for (var i = 0; i < BOARD_SIZE; i++) {
      for (var j = 0; j < BOARD_SIZE; j++) {
        if (this.squares[i][j].shownType === SHOWN_TYPES.mine) {
          result.push(this.squares[i][j]);
        }
      }
    }
    return result;
  }

  getNeighbours(square: Square): Array<Square> {
    var result = [];

    var x = square.x - 1;
    var y = square.y - 1;
    if (isValid(x, y))
      result.push(this.squares[x][y]);

    x = square.x;
    y = square.y - 1;
    if (isValid(x, y))
      result.push(this.squares[x][y]);

    x = square.x + 1;
    y = square.y - 1;
    if (isValid(x, y))
      result.push(this.squares[x][y]);

    x = square.x - 1;
    y = square.y;
    if (isValid(x, y))
      result.push(this.squares[x][y]);

    x = square.x + 1;
    y = square.y;
    if (isValid(x, y))
      result.push(this.squares[x][y]);

    x = square.x - 1;
    y = square.y + 1;
    if (isValid(x, y))
      result.push(this.squares[x][y]);

    x = square.x;
    y = square.y + 1;
    if (isValid(x, y))
      result.push(this.squares[x][y]);

    x = square.x + 1;
    y = square.y + 1;
    if (isValid(x, y))
      result.push(this.squares[x][y]);

    return result;
  }
};