import React, { useState, useEffect, useContext } from "react";
import auth from "@react-native-firebase/auth";
import { View } from "react-native";
import { Container, Header, Text, Form, Button, Item, Label, Input, Content, Icon } from "native-base";


const HomeScreen = ({navigation}) => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const signOut =()=>{
    auth().signOut().then(() => {
      // Sign-out successful.
      console.log("Sign-out successful");
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // could return a loading screen instead
  if (initializing) return null; 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {
        user?
        <>
        <Text>Welcome, {user.displayName}!</Text>
          <Text>You're logged in!</Text>
          <Button onPress={signOut}>
            <Text>Sign out</Text>
          </Button>
        </>
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