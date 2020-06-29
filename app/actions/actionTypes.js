// @flow

// Game actions
export const INIT = 'INIT';
export const IDLE = 'IDLE';
export const FLAG =  (x: Number, y: number) => {
    return {
      type: 'FLAG',
      x,
      y
    };
  };
  export const CLICK =  (x: Number, y: number) => {
      return {
        type: 'CLICK',
        x,
        y
      };
    };
export const NO_MINE = 'NO_MINE';
export const LOST = 'LOST';
export const WON = 'WON';
export const RETRY = 'RETRY';
