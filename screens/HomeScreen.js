import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Container, Text, Button, Content, Footer, FooterTab } from "native-base";
import auth from "@react-native-firebase/auth";


import InitialLogoScreen from './InitialLogoScreen';
import MountainScreen from './MountainScreen';
import HabitsScreen from './HabitsScreen';


const HomeScreen = (props) => {

  const monthSvgScreen = 'January21';
  
  const {navigation} = props;
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // In this section screens are handled differently as we want to keep the same footer for both screens
  const [screen, setScreen] = useState('Mood');


  // Handle user state changes
  const onAuthStateChanged = async user => {
    if(user){
      setUser(user);
      await auth().currentUser.reload();
    }
    if (initializing) setInitializing(false);
  }
  
  const signOut =()=>{
    auth().signOut().then(() => {
      // Sign-out successful.
      setUser(undefined);
    })
  }
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user, screen]);
  
  if (initializing) return <InitialLogoScreen/>; 

  
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