import React, { useState, useEffect } from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";
import 'react-native-gesture-handler';


import { Container, Header, Text, Form, Button, Item, Label, Input, Content } from "native-base";
import * as Font from "expo-font";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Login')}>
        <Text>Login Screen</Text>
      </Button>
    </View>
  );
}

function LoginScreen({navigation}) {
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Login Screen</Text>
    //   <Button block light onPress={() => navigation.navigate('Home')}>
    //     <Text>Go Home</Text>
    //   </Button>
      
      
    //   <Form>
    //     <Item fixedLabel>
    //       <Label>Username</Label>
    //       <Input />
    //     </Item>
    //     <Item fixedLabel last>
    //       <Label>Password</Label>
    //       <Input />
    //     </Item>
        // <Button block info onPress={()=>{}}>
        //   <Text>Login</Text>
        // </Button>
    //   </Form>

      // <Button block info onPress={()=>{() => navigation.navigate('Register')}}>
      //   <Text>Click to register instead</Text>
      // </Button>
    // </View>

    <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Email" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
          </Form>
          <Button block info onPress={()=>{}}>
            <Text>Login</Text>
          </Button>
          <Button block info onPress={() => navigation.navigate('Register')}>
            <Text>Click to register instead</Text>
          </Button>
        </Content>
      </Container>
  );
}

function RegisterScreen({navigation}) {
  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item>
            <Input placeholder="Email" />
          </Item>
          <Item last>
            <Input placeholder="Password" />
          </Item>
          <Item last>
            <Input placeholder="Confirm Password" />
          </Item>
        </Form>
        <Button block info onPress={()=>{}}>
          <Text>Register</Text>
        </Button>
        <Button block info onPress={() => navigation.navigate('Login')}>
          <Text>Click to login instead</Text>
        </Button>
      </Content>
    </Container>
  );
}


const Stack = createStackNavigator();

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  let output;
  if (!user) {
    output = (
      <View>
        <Text>Login</Text>
      </View>
    );
  } else {
    output = 
      <View>
      <Text>Welcome {user.email}</Text>
      <Button block light>
        <Text>Light</Text>
      </Button>
      <Button block>
        <Text>Primary</Text>
      </Button>
      <Button block success>
        <Text>Success</Text>
      </Button>
      <Button block info>
        <Text>Info</Text>
      </Button>
      <Button block warning>
        <Text>Warning</Text>
      </Button>
      <Button block danger>
        <Text>Danger</Text>
      </Button>
      <Button block dark>
        <Text>Dark</Text>
      </Button>
    </View>
  }
  // return <NavigationContainer>{output}</NavigationContainer>
  return (
    // For performance optimizations
    // please refer to https://reactnavigation.org/docs/hello-react-navigation/#passing-additional-props
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
  )
}

export default App;


