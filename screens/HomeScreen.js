import React, { useState, useEffect, useContext } from "react";
import auth from "@react-native-firebase/auth";
import { View } from "react-native";
import { Container, Header, Text, Form, Button, Item, Label, Input, Content, Icon } from "native-base";


const HomeScreen = ({navigation, user}) => {
  const signOut =()=>{
    auth().signOut().then(() => {
      // Sign-out successful.
      console.log("Sign-out successful");
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {
        user?
        <Button onPress={() => {}}>
          <Text>You're logged in!</Text>
          <Button onPress={signOut}>
            <Text>Sign out</Text>
          </Button>
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