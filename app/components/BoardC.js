// @flow

import React, { type Node, Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Board, Square, STATUS_TYPES, BOARD_SIZE } from '../types/minesweeper';
import SquareC from './SquareC';
import Popup from './Popup';
import * as actions from '../actions/actions';
import board from '../reducers/minesweeper';

export type Props = {
  board: Board,
  status: number,
  actions: Object,
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
      content.push(<SquareC key={"s" + (rowIndex * BOARD_SIZE + content.length)} square={item} />);
    }
    return content;
  };

  render = () => {
    const { actions } = this.props;

    return <View style={styles.container}>
      <Popup
        validateAction={ () => this.props.actions.initAction() }
        buttonText={ 'RETRY' }
        visible={ this.props.board.status !== STATUS_TYPES.idle }
        message={ this.props.board.status === STATUS_TYPES.won ? 'You Win!' : 'You Lose...' } />
      <View style={styles.board}>{this.getBoard()}</View>
    </View>
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
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

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardC);
