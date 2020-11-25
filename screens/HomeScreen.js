import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { Container, Header, Text, Form, Button, Item, Label, Input, Content, Icon } from "native-base";

import AuthContext from '../context/authContext';

const HomeScreen = ({navigation}) => {
  const user = useContext(AuthContext)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {
        user?
        <Button onPress={() => {}}>
          <Text>You're logged in!</Text>
        </Button>
        :
        <>
          <Button onPress={() => navigation.navigate('Login')}>
            <Text>Login Screen</Text>
          </Button>
          <Button onPress={() => navigation.navigate('Register')}>
            <Text>Register Screen</Text>
          </Button>
        </>
      }
    </View>
  );
}
export default HomeScreen;