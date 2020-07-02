// @flow

import React, { type Node, Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { connect } from 'react-redux';
import { type Board, type Square, STATUS_TYPES } from '../types/minesweeper';
import SquareC from './SquareC';
import board from '../reducers/minesweeper';

export type Props = {
  board: Board,
  status: number,
};

class BoardC extends Component<Props> {

  getBoard = () => {
    let content = [];
    for (let rowIndex = 0; rowIndex < this.props.board.squares.length; rowIndex++) {
      content.push(<View key={"r" + rowIndex}>{this.getRow(rowIndex)}</View>);
    }
    return content;
  };
  
  getRow = (rowIndex: number) => {
    let content = [];
    for (let colIndex = 0; colIndex < this.props.board.squares.length; colIndex++) {
      const item = this.props.board.squares[rowIndex][colIndex];
      content.push(<SquareC key={"s" + (rowIndex * this.props.board.size + content.length)} square={item} />);
    }
    return content;
  };

  render = () => {
    if (this.props.status === STATUS_TYPES.lost) {
      alert('Lost!');
    }
    if (this.props.status === STATUS_TYPES.won) {
      alert('Won!');
    }

    return <View style={styles.board}>{this.getBoard()}</View>
  }
};

const styles = StyleSheet.create({
    board: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
});

const mapStateToProps = (state, props) => ({
  board: state.board,
  status: state.board.status,
});

export default connect(mapStateToProps)(BoardC);
