import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { Container, Header, Text, Form, Button, Item, Label, Input, Content, Icon } from "native-base";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

let db = firestore();

const HomeScreen = ({navigation}) => {
  
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // const [userData, setUserData] = useState({});

  // Handle user state changes
  const onAuthStateChanged = async user => {
    if(user){
      setUser(user);
      // db.collection("users").doc(user.uid).get().then((doc)=>{
      //   setUserData(doc.data());
      // })
      // let currentUser = auth().currentUser;
      await auth().currentUser.reload();
      // await db.collection("users").doc(user.uid).set({
      //   displayName: user.displayName,
      //   email: user.email
      // })
      console.log(user)
    }
    if (initializing) setInitializing(false);
  }
  
  const signOut =()=>{
    auth().signOut().then(() => {
      // Sign-out successful.
      console.log("Sign-out successful");
      setUser(undefined);
    })
  }
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user]);
  
  // could return a loading screen instead
  if (initializing) return null; 

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {
        user?
        <>
        <Text>Welcome!</Text>
          <Text>You're logged in!</Text>
          <Button onPress={() => navigation.navigate('Mountain', {user})}>
            <Text>Mountain Screen</Text>
          </Button>
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