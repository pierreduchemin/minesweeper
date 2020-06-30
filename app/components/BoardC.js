// @flow

import React, { type Node } from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import { connect } from 'react-redux';
import { shownTypes, hiddenTypes, type Board, type Square } from '../types/minesweeper';
import board from '../reducers/minesweeper';

const deviceWidth = Dimensions.get('window').width;

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
    if (item.shownType === shownTypes.mine)
      content.push(<View key={"s" + (rowIndex * board.size + content.length)} style={getStyles(deviceWidth / board.squares.length).mineSquare} />);
    else
      content.push(<View key={"s" + (rowIndex * board.size + content.length)} style={getStyles(deviceWidth / board.squares.length).emptySquare} />);
  }
  return content;
};

export type Props = {
  board: Board,
};

class BoardC extends React.Component<Props> {
  render() {
    return (
      <View style={getStyles(deviceWidth / board.length).board}>{getBoard(this.props.board)}</View>
    )
  }
};

const getStyles = (squareWidth: number) => {
  return StyleSheet.create({
    board: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptySquare: {
      width: squareWidth, 
      height: squareWidth, 
      backgroundColor: 'powderblue', 
      borderColor: 'grey',
      borderWidth: 2,
    },
    mineSquare: {
      width: squareWidth, 
      height: squareWidth, 
      backgroundColor: 'red', 
      borderColor: 'grey',
      borderWidth: 2,
    },
})};

const mapStateToProps = (state) => {
  const { board } = state
  return { board }
};

export default connect(mapStateToProps)(BoardC);
