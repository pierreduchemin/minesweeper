// @flow

import React, { type Node } from 'react';
import { View, Text, Image, ScrollView } from "react-native";
import { shownTypes, hiddenTypes } from '../types/minesweeper';
import type { Square } from '../types/minesweeper';

export type Props = {
  square: Square,
};

const SquareC = ({ square }: Props) => {
  if (square.shownType === shownTypes.empty) {
    return <Text>{square.value}</Text>;
  }
  if (square.shownType === shownTypes.mine) {
    return <Text>M</Text>;
  }
  if (square.hiddenType === hiddenTypes.hidden) {
    return <Text></Text>;
  }
  return <Text>F</Text>;
};

export default SquareC;
