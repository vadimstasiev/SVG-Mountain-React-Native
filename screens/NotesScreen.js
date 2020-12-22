import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
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

let db = firestore();

const Notes = (props) => {
   const { user, dayNum, monthSvgScreen, moods, defaultMood, colorOptions } = props.route.params;
   
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
      const unsubscribe = db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(String(dayNum)).onSnapshot( async querySnapshot=>{
         let data = await querySnapshot.data()
         // console.log('querySnapshot.data()', querySnapshot.data())
         setFirestoreInput(data.message);
         setInput(firestoreInput)
         setFirestoreMood(data.mood)
         if(mood === defaultMood){
            setMood(firestoreMood)
         }
      })
      // markComplete(13, '#9B59B6');
      // markComplete(31, '#9B59B6');
      // console.log('helloasasda', snapshotData);
      return () => {
         unsubscribe()
      }
   }, [firestoreInput, firestoreMood]);
 

   return <Container>
         <Header>
            <Text style={{
               textAlign: 'center',
               fontWeight: 'bold',
               fontSize: 18,
               marginTop: 15,
               width: 200,
               color: 'white',
            }}>Write about your day</Text>
        </Header>
      <Content padder>
      <Form>
         <Textarea rowSpan={5} onChangeText={setInput} value={input} onEndEditing={submit}
         bordered placeholder="" />
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

export default Notes;