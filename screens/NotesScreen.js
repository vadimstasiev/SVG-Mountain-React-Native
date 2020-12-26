import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Container, Header, Text, Form, Textarea, Button, Item, Label, Input, Content, Icon, Footer, FooterTab} from "native-base";
import ColorPalette from 'react-native-color-palette';

import auth, { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";


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

const Notes = ({route, navigation}) => {
   const { user, dayNum, monthSvgScreen, moods, defaultMood, colorOptions } = route.params;
   
   const [input, setInput] = useState('');
   const [firestoreInput, setFirestoreInput] = useState();

   // const [color, setColor] = useState('#C0392B');
   
   const [mood, setMood] = useState(defaultMood);
   const [firestoreMood, setFirestoreMood] = useState();

   
   

   const submit = (submitMood=mood) => {
      console.log(user.uid, monthSvgScreen, dayNum)
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(String(dayNum)).set({
         message: input,
         mood: submitMood
      })
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
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
            }
         })
      } catch (error) {
         console.log('Firestore error', error);
      }

      let unsubscribeHabbits = () => {};
      try {
         unsubscribeHabbits = db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').onSnapshot( async querySnapshot=>{
            let data = await querySnapshot.data()
            let firebaseHabits = []
             console.log('data', data)
            if (data) {
               for (const id in data) {
                  const name = data[id];
                  // console.log('here', id, name)
                  firebaseHabits.push({id, name})
               }
            // habits.map((habit) => {
            //    firebaseHabits = firebaseHabits.filter((firebaseHabit) => firebaseHabit.id!==habit.id)
            // })
            let localHabbits;
            firebaseHabits.map((habit) => {
               localHabbits = habits.filter((firebaseHabit) => firebaseHabit.id!==habit.id)
            })
            console.log(firebaseHabits)
            setSortHabbits([...habits, ...firebaseHabits]);
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
            width: 200,
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
      </Content>
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