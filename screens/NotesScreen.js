import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {Text} from 'native-base';
import ColorPalette from 'react-native-color-palette';


import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Text as SvgText,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";

const Notes = (props) => {
   // const id = props.navigation.getParam('id');
   const { id } = props.route.params;
   return <View><Text>Hello {id}</Text></View>
}

export default Notes;