import React, { useState, useEffect } from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";
import 'react-native-gesture-handler';

import { Container, Header, Text, Form, Button, Item, Label, Input, Content, Icon } from "native-base";


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {AuthProvider} from './context/authContext';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';



const Stack = createStackNavigator();

function App() {

    //   <View>
    //   <Text>Welcome {user.email}</Text>
    //   <Button block light>
    //     <Text>Light</Text>
    //   </Button>
    //   <Button block>
    //     <Text>Primary</Text>
    //   </Button>
    //   <Button block success>
    //     <Text>Success</Text>
    //   </Button>
    //   <Button block info>
    //     <Text>Info</Text>
    //   </Button>
    //   <Button block warning>
    //     <Text>Warning</Text>
    //   </Button>
    //   <Button block danger>
    //     <Text>Danger</Text>
    //   </Button>
    //   <Button block dark>
    //     <Text>Dark</Text>
    //   </Button>
    // </View>

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"  screenOptions={{title: 'JournaliZZe'}}>
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={{}} />}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} extraData={{}} />}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {props => <RegisterScreen {...props} extraData={{}} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

export default App;


