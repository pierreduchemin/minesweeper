// @flow

import * as types from './actionTypes';

export const initAction = () => {
  return {
    type: types.INIT
  };
};

export const toggleFlagAction = (x: Number, y: number) => {
  return {
    type: types.FLAG,
    x,
    y
  };
};

export const clickAction = (x: Number, y: number) => {
  return {
    type: types.CLICK,
    x: x,
    y: y
  };
};