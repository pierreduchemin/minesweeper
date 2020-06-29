// @flow

export const hiddenTypes = Object.freeze({"hidden":0, "flag":1})
export const shownTypes = Object.freeze({"empty":0, "mine":1})

export type Square = {
    +value: number,
    +hiddenType: number,
    shownType: number,
}

export type Board = {
  +size: number,
  +squares: Array<Array<Square>>,
};