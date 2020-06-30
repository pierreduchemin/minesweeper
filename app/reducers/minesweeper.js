// @flow

import { hiddenTypes, shownTypes, BOARD_SIZE, N_MINES, Board, Square } from '../types/minesweeper';
import { create } from 'react-test-renderer';
import { CLICK } from '../actions/actionTypes';
import { combineReducers } from 'redux';

const init = () : Board => {
  var a = new Array<Array<Square>>(BOARD_SIZE);
  for (var i = 0; i < BOARD_SIZE; i++) {
      a[i] = new Array(BOARD_SIZE);
      for (var j = 0; j < BOARD_SIZE; j++) {
          a[i][j] = new Square(i, j, hiddenTypes.hidden, shownTypes.empty);
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

  var b = new Board(a);

  b.getMines().forEach(function(m) {
    b.getNeighbours(m).forEach(function(n) {
      if (n.shownType !== shownTypes.mine) {
        n.value++;
      }
    });
  });

  return b;
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