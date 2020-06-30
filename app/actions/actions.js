// @flow

import { INIT, FLAG, CLICK } from './actionTypes';

export const INIT_ACTTION = () => {
    return {
        type: INIT
    };
};

export const FLAG_ACTION = (x: Number, y: number) => {
    return {
        type: FLAG,
        x,
        y
    };
};
export const CLICK_ACTION = (x: Number, y: number) => {
    return {
        type: CLICK,
        x,
        y
    };
};