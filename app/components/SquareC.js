// @flow

import React, { type Node, Component } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Square, SHOWN_TYPES, HIDDEN_TYPES, BOARD_SIZE, Board } from '../types/minesweeper';
import * as actions from '../actions/actions';
import * as types from '../actions/actionTypes';

const deviceWidth = Dimensions.get('window').width;

export type Props = {
  board: Board,
  square: Square,
  actions: Object,
};

export type State = {
  square: Square,
};

class SquareC extends Component<Props, State> {

  render = () => {
    const { square, actions } = this.props;

    // hidden by default
    let result = <TouchableOpacity
        activeOpacity = { .5 }
        onPress={ () => actions.clickAction(square.x, square.y) }
        onLongPress={ () => actions.toggleFlagAction(square.x, square.y) }>
      <View style={getStyles(deviceWidth / BOARD_SIZE).hiddenSquare} />
    </TouchableOpacity>;

    if (square.hidden) {
      if (square.hiddenType === HIDDEN_TYPES.flag) {
        result = <View style={getStyles(deviceWidth / BOARD_SIZE).flagSquare} />;
      }
    } else {
      if (square.shownType === SHOWN_TYPES.empty) {
        result = <View style={getStyles(deviceWidth / BOARD_SIZE).emptySquare}>
          <Text style={{textAlign: 'center'}}>{square.value > 0 ? square.value : ""}</Text>
        </View>;
      }
      if (square.shownType === SHOWN_TYPES.mine) {
        result = <View style={getStyles(deviceWidth / BOARD_SIZE).mineSquare} />;
      }
    }
    return result;
  }
};

const getStyles = (squareWidth: number) => {
  return StyleSheet.create({
    hiddenSquare: {
      width: squareWidth, 
      height: squareWidth, 
      backgroundColor: 'darkgrey', 
      borderColor: 'grey',
      borderWidth: 2,
      justifyContent: 'center',
    },
    flagSquare: {
      width: squareWidth, 
      height: squareWidth, 
      backgroundColor: 'yellow', 
      borderColor: 'grey',
      borderWidth: 2,
      justifyContent: 'center',
    },
    emptySquare: {
      width: squareWidth, 
      height: squareWidth, 
      backgroundColor: 'powderblue', 
      borderColor: 'grey',
      borderWidth: 2,
      justifyContent: 'center',
    },
    mineSquare: {
      width: squareWidth, 
      height: squareWidth, 
      backgroundColor: 'red', 
      borderColor: 'grey',
      borderWidth: 2,
      justifyContent: 'center',
    },
})};

const mapStateToProps = (state, props) => {
  return {
    currentSquare: state.currentSquare,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SquareC);
