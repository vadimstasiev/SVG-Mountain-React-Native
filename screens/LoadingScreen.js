import * as React from "react"
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import Svg, { Path, Circle, Rect } from "react-native-svg"

function SvgComponent(props) {
  return <View
      style={[
        StyleSheet.absoluteFill,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Svg height="50%" width="50%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="blue"
          strokeWidth="2.5"
          fill="green"
        />
        <Rect
          x="15"
          y="15"
          width="70"
          height="70"
          stroke="red"
          strokeWidth="2"
          fill="yellow"
        />
      </Svg>
  </View>
}

export default SvgComponent
