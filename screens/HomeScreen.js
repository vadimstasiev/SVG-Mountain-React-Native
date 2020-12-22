import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { Container, Header, Text, Form, Button, Item, Label, Input, Content, Icon, Footer, FooterTab } from "native-base";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './LoadingScreen';
import MountainScreen from './MountainScreen';

let db = firestore();

const HomeScreen = (props) => {
  
  const {navigation} = props;
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
  if (initializing) return <LoadingScreen/>; 

  
  return (
    <Container>
      {/* <Text>Home Screen</Text> */}
      {
        user?
        // <>
        // <Text>Welcome!</Text>
        //   <Text>You're logged in!</Text>
        //   <Button onPress={() => navigation.navigate('Mountain', {user})}>
        //     <Text>Mountain Screen</Text>
        //   </Button>
        //   <Button onPress={signOut}>
        //     <Text>Sign out</Text>
        //   </Button>
        // </>
        
          <>
          {/* <Header /> */}
          <Content >
            <MountainScreen user={user} {...props}/>
          </Content>
          <Footer>
            <FooterTab>
              <Button active>
                <Text>Mood</Text>
              </Button>
              <Button active>
                <Text>Habbits</Text>
              </Button>
              <Button onPress={signOut}>
                <Text>Sign Out</Text>
              </Button>
            </FooterTab>
          </Footer>
          </>
          :
          <View>
          <Button full light info onPress={() => navigation.navigate('Login')} style={{margin:5}}>
            <Text>Login Screen</Text>
          </Button>
          <Button full onPress={() => navigation.navigate('Register')} style={{margin:5}}>
            <Text>Register Screen</Text>
          </Button>
          </View>
      }
    </Container>
  );
}
export default HomeScreen;