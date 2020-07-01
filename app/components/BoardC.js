// @flow

import React, { type Node } from 'react';
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { connect } from 'react-redux';
import { type Board, type Square } from '../types/minesweeper';
import SquareC from './SquareC';
import board from '../reducers/minesweeper';

const getBoard = (board: Board) => {
  let content = [];
  for (let rowIndex = 0; rowIndex < board.squares.length; rowIndex++) {
    content.push(<View key={"r" + rowIndex}>{getRow(board, rowIndex)}</View>);
  }
  return content;
};

const getRow = (board: Board, rowIndex: number) => {
  let content = [];
  for (let colIndex = 0; colIndex < board.squares.length; colIndex++) {
    const item = board.squares[rowIndex][colIndex];
    content.push(<SquareC key={"s" + (rowIndex * board.size + content.length)} square={item} />);
  }
  return content;
};

export type Props = {
  board: Board,
};

const BoardC = (props: Props) => {
    return (
      <View style={styles.board}>{getBoard(props.board)}</View>
    )
};

const styles = StyleSheet.create({
    board: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
});

const mapStateToProps = (state) => {
  const { board } = state
  return { board }
};

export default connect(mapStateToProps)(BoardC);
