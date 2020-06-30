// @flow

export const BOARD_SIZE = 8;
export const N_MINES = 10;

export const hiddenTypes = Object.freeze({"hidden":0, "flag":1})
export const shownTypes = Object.freeze({"empty":0, "mine":1})

const isValid = (x: number, y: number): boolean => {
  return x >= 0 && y >= 0 && x < BOARD_SIZE && y < BOARD_SIZE;
}

export class Square {
    +x: number;
    +y: number;
    value: number;
    +hiddenType: number;
    shownType: number;

    constructor(x: number, y: number, hiddenType: number, shownType: number) {
      this.x = x;
      this.y = y;
      this.value = 0;
      this.hiddenType = hiddenType;
      this.shownType = shownType;
    }
}

export class Board {
  +size: number;
  +squares: Array<Array<Square>>;

  constructor(squares: Array<Array<Square>>) {
    this.size = BOARD_SIZE;  
    this.squares = squares;
  }

  getMines(): Array<Square> {
    var result = [];
    for (var i = 0; i < BOARD_SIZE; i++) {
      for (var j = 0; j < BOARD_SIZE; j++) {
        if (this.squares[i][j].shownType === shownTypes.mine) {
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