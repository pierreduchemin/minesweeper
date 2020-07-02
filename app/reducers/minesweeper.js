// @flow

import { HIDDEN_TYPES, SHOWN_TYPES, BOARD_SIZE, N_MINES, Board, Square, STATUS_TYPES } from '../types/minesweeper';
import { create } from 'react-test-renderer';
import { INIT, CLICK, FLAG } from '../actions/actionTypes';
import { combineReducers } from 'redux';

const click = (board: Board, x: number, y: number): Board => {
  board.squares[x][y].hidden = false;

  // initializing mines like this avoid the case where user 1st click is on a mine
  if (!board.isMinesInit) {
    board.initMines(x, y);
  }

  // unhide all 0 value neighbours
  if (board.squares[x][y].value === 0) {
    board.unhide(x, y);
  }

  if (board.squares[x][y].shownType === SHOWN_TYPES.mine) {
    board.status = STATUS_TYPES.lost;
    board.reveal();
  }
  if (board.getRemaining().length === N_MINES) {
    board.status = STATUS_TYPES.won;
  }

  return board;
};

const toggleFlag = (board: Board, x: number, y: number): Board => {
  const square = board.squares[x][y];
  if (square.hiddenType === HIDDEN_TYPES.flag) {
    square.hiddenType = HIDDEN_TYPES.hidden;
  } else {
    square.hiddenType = HIDDEN_TYPES.flag;
  }
  return board;
};

export type State = {
  board: Board,
};

const boardReducer = (state: State = { board: new Board() }, action: Object): Object => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        board: new Board(),
      };
    case CLICK:
      var b = click(state.board, action.x, action.y);
      return {
        ...state,
        board: b,
        currentSquare: {},
      };
    case FLAG:
      return {
        ...state,
        board: toggleFlag(state.board, action.x, action.y),
        currentSquare: {},
      };
    default:
      return state;
  }
};

export default boardReducer;