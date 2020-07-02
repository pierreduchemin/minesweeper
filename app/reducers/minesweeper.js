// @flow

import { HIDDEN_TYPES, SHOWN_TYPES, BOARD_SIZE, N_MINES, Board, Square, STATUS_TYPES } from '../types/minesweeper';
import { create } from 'react-test-renderer';
import { INIT, CLICK, FLAG } from '../actions/actionTypes';
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

  if (board.squares[x][y].shownType === SHOWN_TYPES.mine) {
    board.status = STATUS_TYPES.lost;
    board.reveal();
  }
  if (board.getRemaining().length === N_MINES) {
    board.status = STATUS_TYPES.won;
    board.reveal();
  }

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

const boardReducer = (state: State = { board: init() }, action: Object): Object => {
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