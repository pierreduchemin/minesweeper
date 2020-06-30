// @flow

import { hiddenTypes, shownTypes } from '../types/minesweeper';
import type { Board, Square } from '../types/minesweeper';
import { create } from 'react-test-renderer';
import { CLICK } from '../actions/actionTypes';
import { combineReducers } from 'redux';

const BOARD_SIZE = 8;
const N_MINES = 10;

const createBoard = (squares: Array<Array<Square>>): Board => ({
    size: BOARD_SIZE,
    squares: squares,
});

const createSquare = (hiddenType: number, shownType: number): Square => ({
    value: 0,
    hiddenType,
    shownType,
});

const init = () : Board => {
  var a = new Array(BOARD_SIZE);
  for (var i = 0; i < BOARD_SIZE; i++) {
      a[i] = new Array(BOARD_SIZE);
      for (var j = 0; j < BOARD_SIZE; j++) {
          a[i][j] = createSquare(hiddenTypes.hidden, shownTypes.empty);
      }
  }

  var x, y, nMines = 0;
  do {
    x = Math.floor(Math.random() * BOARD_SIZE);
    y = Math.floor(Math.random() * BOARD_SIZE);
    if (a[x][y] === undefined || a[x][y].shownType === shownTypes.empty) {
      a[x][y].shownType = shownTypes.mine;
      nMines++;
    }
  } while (nMines < N_MINES);

  return createBoard(a);
};

const boardReducer = (state: Board = init(), action): Board => {
  switch (action.type) {
    case 'INIT':
      return init();
    case 'IDLE':
      return state;
/*    case 'FLAG':
      return addFlag(state, x, y);
    case 'CLICK':
      return click(state, x, y);
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

export default combineReducers({
  board: boardReducer,
});