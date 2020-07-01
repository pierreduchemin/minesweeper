// @flow

import React, { type Node, Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Square, SHOWN_TYPES, HIDDEN_TYPES } from '../types/minesweeper';
import { BOARD_SIZE } from '../types/minesweeper';
import { connect } from 'react-redux';
import Icon from '../assets/mine.js';

const deviceWidth = Dimensions.get('window').width;

export type Props = {
  square: Square,
};

class SquareC extends Component<Props> {
  
  render = () => {
    const { square } = this.props;

    // hidden by default
    let result = <View style={getStyles(deviceWidth / BOARD_SIZE).hiddenSquare} />;
    if (square.hidden) {
      if (square.hiddenType === HIDDEN_TYPES.flag) {
        result = (<View style={getStyles(deviceWidth / BOARD_SIZE).hiddenSquare} />);
      }
    } else {
      if (square.shownType === SHOWN_TYPES.empty) {
        result = (<View style={getStyles(deviceWidth / BOARD_SIZE).emptySquare}><Text style={{textAlign: 'center'}}>{square.value > 0 ? square.value : ""}</Text></View>);
      }
      if (square.shownType === SHOWN_TYPES.mine) {
        result = (<View style={getStyles(deviceWidth / BOARD_SIZE).mineSquare} />);
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

export default SquareC;
