import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text} from "react-native";
import Spinner from 'react-native-spinkit';


const LoadingScreen = ({backgroundColor='#d35400', color='red'}) => {
    var styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
      },

      spinner: {
        marginBottom: 50
      },

      btn: {
        marginTop: 20
      },

      text: {
        color: "white"
      }
    });

    return (
      <View style={styles.container}>
        <Spinner style={styles.spinner} isVisible={true} size={100} type={'Circle'} color={color}/>
      </View>
    );
}



export default LoadingScreen;