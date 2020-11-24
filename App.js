import React, { useState, useEffect } from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";
import 'react-native-gesture-handler';


import { Container, Header, Text, Form, Button, Item, Label, Input, Content, Icon } from "native-base";
import * as Font from "expo-font";

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';


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

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const registerUser =()=>{
    if (confirmPassword===password){
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
    }
  }
  const validateEmail = () => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      console.log("You have entered a valid email!")
    } else {
      console.log("You have entered an invalid email address!")
    }
  }
  function checkPassword(e) { 
    const PASSWORD_RULES=  /^[A-Za-z]\w{7,35}$/;
    console.log(e.target.getNativeRef());
    if (password.match(PASSWORD_RULES)) { 
      console.log('valid password')
      return true;
    } else { 
      console.log('Please enter a Password from 8 to 35 digits long')
      return false;
    }
  }
  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item>
            <Input placeholder="Email" onChangeText={email=> {setEmail(email)}} onEndEditing={validateEmail}/>
          </Item>
          <Item last>
            <Input placeholder="Password" onChangeText={password=> {setPassword(password)}} onEndEditing={checkPassword} />
          </Item>
          <Item last>
            <Input placeholder="Confirm Password" onChangeText={confirmPassword=> {setConfirmPassword(confirmPassword)}}/>
            {/* <Icon name='close-circle' /> */}
          </Item>
        </Form>
        <Button block info onPress={registerUser}>
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


