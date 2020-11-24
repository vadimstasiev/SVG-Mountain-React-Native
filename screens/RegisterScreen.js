import React, { useState, useEffect } from "react";

import { Container, Header, Text, Form, Button, Item, Label, Input, Content, Icon } from "native-base";
import * as Font from "expo-font";

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';


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

  export default RegisterScreen;
