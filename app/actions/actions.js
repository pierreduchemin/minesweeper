// @flow

import * as types from './actionTypes';

export const INIT_ACTION = () => {
    return {
        type: types.INIT
    };
};

export const FLAG_ACTION = (x: Number, y: number) => {
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