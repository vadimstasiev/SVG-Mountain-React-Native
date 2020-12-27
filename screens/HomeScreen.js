import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { Container, Header, Text, Form, Button, Item, Label, Input, Content, Icon, Footer, FooterTab } from "native-base";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";


import InitialLogoScreen from './InitialLogoScreen';
import MountainScreen from './MountainScreen';
import HabitsScreen from './HabitsScreen';
import LoadingScreen from "./LoadingScreen";

let db = firestore();

const HomeScreen = (props) => {

  const monthSvgScreen = 'January21';
  
  const {navigation} = props;
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [screen, setScreen] = useState('Mood');


  // Handle user state changes
  const onAuthStateChanged = async user => {
    if(user){
      setUser(user);
      await auth().currentUser.reload();
      // console.log(user)
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
  }, [user, screen]);
  
  if (initializing) return <InitialLogoScreen/>; 
  
  // return <LoadingScreen backgroundColor={'blue'}/>; 

  
  return (
    <Container>
      {
        user?
          <>
          <Content >
          {screen==='Mood'?
            <MountainScreen monthSvgScreen={monthSvgScreen} user={user} {...props}/>
            :<></>}
          {screen==='Habits'?
            <HabitsScreen monthSvgScreen={monthSvgScreen} user={user} {...props}/>
          :<></>}
          </Content>
          <Footer>
            <FooterTab>
              <Button active={screen==='Mood'} onPress={(e)=>setScreen('Mood')}>
                <Text>Mood</Text>
              </Button>
              <Button active={screen==='Habits'} onPress={(e)=>setScreen('Habits')}>
                <Text>Habits</Text>
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