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
    hiddenType: number;
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
  +squares: Array<Array<Square>>;
  status: number;
  isMinesInit: boolean;

  constructor() {
    var squares = [];
    for (var x = 0; x < BOARD_SIZE; x++) {
      squares[x] = [];
        for (var y = 0; y < BOARD_SIZE; y++) {
          squares[x].push(new Square(x, y, HIDDEN_TYPES.hidden, SHOWN_TYPES.empty));
        }
    }
    this.squares = squares;
    this.status = STATUS_TYPES.idle;
    this.isMinesInit = false;
  }

  initMines(clickedX: number, clickedY: number) {
    var x, y, nMines = 0;
    do {
      x = Math.floor(Math.random() * BOARD_SIZE);
      y = Math.floor(Math.random() * BOARD_SIZE);
      if (this.squares[x][y].hidden
            && this.squares[x][y].shownType === SHOWN_TYPES.empty
            && !this.isInNeighborhood(clickedX, clickedY, x, y)) {
        this.squares[x][y].shownType = SHOWN_TYPES.mine;
        nMines++;
      }
    } while (nMines < N_MINES);
    
    const self = this;
    this.getMines().forEach(function(m) {
      self.getNeighbours(m.x, m.y)
      .filter(n => n.shownType !== SHOWN_TYPES.mine)
      .forEach(function(n) {
        n.value++;
      });
    });

    this.isMinesInit = true;
  }

  getMines(): Array<Square> {
    var result = [];
    for (var x = 0; x < BOARD_SIZE; x++) {
      for (var y = 0; y < BOARD_SIZE; y++) {
        if (this.squares[x][y].shownType === SHOWN_TYPES.mine) {
          result.push(this.squares[x][y]);
        }
      }
    }
    return result;
  }

  getRemaining(): Array<Square> {
    var result = [];
    for (var x = 0; x < BOARD_SIZE; x++) {
      for (var y = 0; y < BOARD_SIZE; y++) {
        if (this.squares[x][y].hidden) {
          result.push(this.squares[x][y]);
        }
      }
    }
    return result;
  }

  reveal() {
    for (var x = 0; x < BOARD_SIZE; x++) {
      for (var y = 0; y < BOARD_SIZE; y++) {
        if (this.squares[x][y].hidden) {
          this.squares[x][y].hidden = false;
        }
      }
    }
  }

  unhide (x: number, y: number) {
    const self = this;
    const square = this.squares[x][y];
    if (square !== undefined) {
      this.getNeighbours(square.x, square.y)
      .filter(s => s.hidden)
      .forEach(function(s) {
        s.hidden = false;
        if (s.value === 0 && s.shownType !== SHOWN_TYPES.mine) {
          self.unhide(s.x, s.y);
        }
      });
    }
  };

  getNeighbours(x: number, y: number): Array<Square> {
    var result = [];
    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        var tempX = x + dx;
        var tempY = y + dy;
        if ((dx !== 0 || dy !== 0) && isValid(tempX, tempY)) {
          result.push(this.squares[tempX][tempY]);
        }
      }
    }
    return result;
  }

  isInNeighborhood(clickedX: number, clickedY: number, x: number, y: number): boolean {
    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        var tempX = clickedX + dx;
        var tempY = clickedY + dy;
        if ((dx !== 0 || dy !== 0) && isValid(tempX, tempY) && (tempX === x || tempY === y)) {
          return true;
        }
      }
    }
    return false;
  }
};