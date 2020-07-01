// @flow

import { HIDDEN_TYPES, SHOWN_TYPES, BOARD_SIZE, N_MINES, Board, Square } from '../types/minesweeper';
import { create } from 'react-test-renderer';
import { INIT, IDLE, CLICK } from '../actions/actionTypes';
import { combineReducers } from 'redux';

const init = () : Board => {
  var a = [];
  for (var x = 0; x < BOARD_SIZE; x++) {
      a[x] = [];
      for (var y = 0; y < BOARD_SIZE; y++) {
          a[x].push(new Square(x, y, HIDDEN_TYPES.hidden, SHOWN_TYPES.empty));
      }
  }

  var x, y, nMines = 0;
  do {
    x = Math.floor(Math.random() * BOARD_SIZE);
    y = Math.floor(Math.random() * BOARD_SIZE);
    if (a[x][y] === undefined || a[x][y].shownType === SHOWN_TYPES.empty) {
      a[x][y].shownType = SHOWN_TYPES.mine;
      nMines++;
    }
  } while (nMines < N_MINES);

  var b = new Board(a);

  b.getMines().forEach(function(m) {
    b.getNeighbours(m).forEach(function(n) {
      if (n.shownType !== SHOWN_TYPES.mine) {
        n.value++;
      }
    });
  });

  return b;
};

const click = (board: Board, x: number, y: number): Board => {
  board.squares[x][y].hidden = false;

  // unhide all 0 value neighbours
  if (board.squares[x][y].value === 0) {
    unhide(board, x, y);
  }

  // todo: check lost/won

  return board;
};

const unhide = (board: Board, x: number, y: number) => {
  const square = board.squares[x][y];
  if (board !== undefined && square !== undefined) {
    board.getNeighbours(square).filter(s => s.hidden).forEach(function(s) {
      s.hidden = false;
      if (s.value === 0 && s.shownType !== SHOWN_TYPES.mine) {
        unhide(board, s.x, s.y);
      }
    });
  }
}

export type State = {
  board: Board,
  currentSquare: Square,
};

const boardReducer = (state: State = { board: init(), currentSquare: {} }, action: Object): Object => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        board: init(),
      };
    case CLICK:
      var b = click(state.board, action.x, action.y);
      return {
        ...state,
        board: b,
        currentSquare: {},
      };
/*    case 'FLAG':
      return addFlag(state, x, y);
    case 'NO_MINE':
      return state;
    case 'LOST':
      return displayLost();
    case 'WON':
      return displayWon();
*/  default:
      return state;
  }
};

export default boardReducer;