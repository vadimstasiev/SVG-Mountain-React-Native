import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { Container, Header, Body, Text, Form, Textarea, Button, Item, Label, Input, Content, ListItem, CheckBox, Icon, Footer, FooterTab} from "native-base";
import ColorPalette from 'react-native-color-palette';

import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { NavigationAction } from '@react-navigation/native';


import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Text as SvgText,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";
import { sub } from "react-native-reanimated";

let db = firestore();


const HabitCheckBox = ({habit, toggleChecked, checked}) => {
   // const [isChecked, setIsChecked] = useState(false);
   return <ListItem>
      <CheckBox onPress={()=>toggleChecked(habit.id, checked)} checked={checked} color={'green'}/>
      <Body>
         <Text>{habit.name}</Text>
      </Body>
   </ListItem>
}

const Notes = ({route, navigation}) => {
   const { user, dayNum, monthSvgScreen, moods, defaultMood, colorOptions } = route.params;
   
   const [input, setInput] = useState('');
   const [firestoreInput, setFirestoreInput] = useState();

   // const [color, setColor] = useState('#C0392B');
   
   const [mood, setMood] = useState(defaultMood);
   const [firestoreMood, setFirestoreMood] = useState();

   const [habits, setHabits] = useState([]);
   const [habitsChecked, setHabitsChecked] = useState([]);
   
   const setSortHabbits = (inputHabbits) => {
      // var temp = habits.slice(0);
      setHabits([...inputHabbits.sort((a,b) => {
         var x = a.id.toLowerCase();
         var y = b.id.toLowerCase();
         return x < y ? -1 : x > y ? 1 : 0;
      })])
  }

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

   const submit = (submitMood=mood) => {
      console.log(user.uid, monthSvgScreen, dayNum)
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(String(dayNum)).set({
         message: input,
         mood: submitMood, 
         habitsChecked: habitsChecked
      })
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
   }

   const deleteDay = () =>{
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(String(dayNum)).delete()
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
      // navigation.goBack();
      // NavigationAction.resetAction()
      // const resetAction = NavigationAction.reset({
      //    index: 0,
      //    actions: [NavigationAction.navigate({ routeName: 'Home' })],
      // });
   }

   useEffect(() => {
      navigation.setOptions({ title: `JournaliZZe - ${dayNum}` })
      let unsubscribeDay = () => {};
      try {
         unsubscribeDay = db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(String(dayNum)).onSnapshot( async querySnapshot=>{
            let data = await querySnapshot.data()
            if (data){
               setFirestoreInput(data.message);
               setInput(firestoreInput)
               setFirestoreMood(data.mood)
               console.log(mood)
               if(mood === defaultMood){
                  setMood(data.mood);
               }
               setHabitsChecked(data.habitsChecked || [])
            }
         })
      } catch (error) {
         console.log('Firestore error', error);
      }

      let unsubscribeHabbits = () => {};
      try {
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

      const navUnsubscribe = navigation.addListener('submitBeforeGoing', (e) => {
         submit();
      })
      return () => {
         unsubscribeDay();
         unsubscribeHabbits();
         navUnsubscribe();
      }
   }, [firestoreInput, firestoreMood]);
 

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
            {/* <View style={styles.textAreaContainer} >
               <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Type something"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                  onChangeText={setInput} value={input} onEndEditing={submit}
               />
            </View> */}
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
               // fontWeight: 'bold',
               fontSize: 18,
               marginTop: 0,
               // width: "100%",
            }}>{habits.length>0?'Habits Performed':''}</Text>
            {habits.map((habit) => {
               return <HabitCheckBox key={habit.id} habit={habit} toggleChecked={habitToggleChecked} checked={habitsChecked.includes(String(habit.id))}/>
            })}
            
         </Content>
      </Content>
      <Footer>
         <FooterTab>
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

// const styles = StyleSheet.create({
//    textAreaContainer: {
//      borderColor: 'grey',
//      borderWidth: 1,
//      padding: 5
//    },
//    textArea: {
//      height: 150,
//      justifyContent: "flex-start",
//      textAlignVertical: 'top'
//    }
//  })

export default Notes;