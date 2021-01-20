import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Container, Header, Body, Text, Form, Textarea, Button, Content, ListItem, CheckBox, Footer, FooterTab} from "native-base";
import ColorPalette from 'react-native-color-palette';

import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import LoadingScreen from "./LoadingScreen";

let db = firestore();


// Singular Checkbox item
const HabitCheckBox = ({habit, toggleChecked, checked}) => {
   return <ListItem>
      <CheckBox onPress={()=>toggleChecked(habit.id, checked)} checked={checked} color={'green'}/>
      <Body>
         <Text>{habit.name}</Text>
      </Body>
   </ListItem>
}

// main component
const Notes = ({route, navigation}) => {
   // get screen variables from the parent route, in this case, the mountain screen
   const { user, dayNum, monthSvgScreen, moods, defaultMood, colorOptions } = route.params;
   const [initializing, setInitializing] = useState(true)
   const [input, setInput] = useState('');
   const [firestoreInput, setFirestoreInput] = useState();
   const [mood, setMood] = useState(defaultMood);
   const [firestoreMood, setFirestoreMood] = useState();
   const [habits, setHabits] = useState([]);
   const [habitsChecked, setHabitsChecked] = useState([]);
   
   // sort the habbits list before commiting it to the habits state
   const setSortHabbits = (inputHabbits) => {
      setHabits([...inputHabbits.sort((a,b) => {
         var x = a.id.toLowerCase();
         var y = b.id.toLowerCase();
         return x < y ? -1 : x > y ? 1 : 0;
      })])
   }

   // toggles item on the checkbox list and submits
   const habitToggleChecked = (id, checked) => {
      if(checked){
         temp = habitsChecked;
         for (let i = temp.length - 1; i >= 0; i--) {
            if (temp[i] === id) {
               temp.splice(i, 1);
            }
         }
         setHabitsChecked(temp);
      } else {
         if(!habitsChecked.includes(id)){
            habitsChecked.push(id);
         }
      }
      submit();
   }

   // commits all the notes data to firestore
   const submit = (submitMood=mood) => {
      // commit data to firestore
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(String(dayNum)).set({
         message: input,
         mood: submitMood, 
         habitsChecked: habitsChecked
      })
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
   }

   // deletes the data for the given day from firestore
   const deleteDay = () =>{
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(String(dayNum)).update({
         message:firebase.firestore.FieldValue.delete(),
         mood: firebase.firestore.FieldValue.delete(), 
         habitsChecked: firebase.firestore.FieldValue.delete()
      })
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
      navigation.goBack();

   }

   // sets up subscriptions to the firstore, such that, if the data in firestore changes it will automatically 
   // update the data on this screen as well 
   useEffect(() => {
      navigation.setOptions({ title: `JournaliZZe - ${dayNum}` })
      let unsubscribeDay = () => {};
      setInitializing(true);
      try {
         unsubscribeDay = db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(String(dayNum)).onSnapshot( async querySnapshot=>{
            let data = await querySnapshot.data()
            if (data){
               setFirestoreInput(data.message);
               setInput(firestoreInput);
               setFirestoreMood(data.mood);
               if(mood === defaultMood){
                  setMood(data.mood);
               }
               setHabitsChecked(data.habitsChecked || []);
            }
         })
      } catch (error) {
         console.log('Firestore error', error);
      }

      let unsubscribeHabbits = () => {};
      try {
         // it is necessary to use another subscriptuon as the habits are located on a different firestore document
         unsubscribeHabbits = db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').onSnapshot( async querySnapshot=>{
            let data = await querySnapshot.data();
            let firebaseHabits = [];
            if (data) {
               for (const id in data) {
                  const name = data[id];
                  firebaseHabits.push({id, name});
               }
            setSortHabbits(firebaseHabits);
         }
         })
      } catch (error) {
         console.log('Firestore error', error);
      }

      // the listener name is irrelevant, but the listener itself ensures that the submit is called one last time
      // before leaving the current screen, this ensures that if the user has typed some data on the text input
      // and is still editing it, it will save it to firestore before leaving the page
      const navUnsubscribe = navigation.addListener('submitBeforeGoing', (e) => {
         submit();
      })
      setInitializing(false);
      return () => {
         unsubscribeDay();
         unsubscribeHabbits();
         navUnsubscribe();
      }
   }, [firestoreInput, firestoreMood]);
 

   // show the loading screen before the data is ready to display on the current screen
   if (initializing) return <View style={styles.loadingContainer}>
      <LoadingScreen backgroundColor={'white'} color={'#6aab6a'}/>
   </View>

   return <Container>
         <Header>
            <Text style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginTop: 15,
                  width: 200,
                  color: 'white',
               }}>Write about your day</Text>
        </Header>
      <Content padder>
         <Form>
            <Textarea rowSpan={5} onChangeText={setInput} value={input} onEndEditing={()=>submit()}
            bordered placeholder="" />
            <Text style={{
               textAlign: 'center',
               fontWeight: 'bold',
               fontSize: 18,
               marginTop: 0,
               width: "100%",
            }}>{mood}</Text>
            <ColorPalette
                  onChange={ color => {
                     setMood(moods[color]);
                     submit(moods[color]);
                  }}
                  value={Object.keys(moods).find(key => moods[key] === mood)}
                  colors={colorOptions}
                  titleStyles={{display:"none"}}
               />
         </Form>
         <Content>
            <Text style={{
               textAlign: 'center',
               fontSize: 18,
               marginTop: 0,
            }}>{habits.length>0?'Habits Performed':''}</Text>
            {habits.map((habit) => {
               return <HabitCheckBox key={habit.id} habit={habit} toggleChecked={habitToggleChecked} checked={habitsChecked.includes(String(habit.id))}/>
            })}
            
         </Content>
      </Content>
      <Footer>
         <FooterTab>
            {/* Creates an alert dialog box */}
            <Button active={true} onPress={() => Alert.alert(
               "Delete",
               "Are you sure you want to delete?",
               [
                 {
                   text: "Cancel",
                   style: "cancel"
                 },
                 { text: "OK", onPress: deleteDay }
               ],
               { cancelable: true }
             )}>
               <Text>Delete Day</Text>
            </Button>
         </FooterTab>
      </Footer>
   </Container>
}

const styles = StyleSheet.create({
   loadingContainer: {
      flex: 1,
      margin:0,
      justifyContent: 'center',
      paddingTop: 10,
      backgroundColor: 'white',
      padding: 8,
      height:700
   },
 })

export default Notes;