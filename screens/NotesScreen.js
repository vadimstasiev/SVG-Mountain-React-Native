import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Header, Text, Form, Textarea, Button, Item, Label, Input, Content, Icon, Footer, FooterTab} from "native-base";
import ColorPalette from 'react-native-color-palette';

import auth from "@react-native-firebase/auth";
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

   // const [color, setColor] = useState('#C0392B');
   
   const [mood, setMood] = useState(defaultMood);

   
   
   const submit = text =>{
      setInput(text);
      console.log('User: ', user.uid);
      // db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(dayNum).set
      // await db.collection("users").doc(user.uid).collection(monthSvgScreen).add({asd:'hello', dayNum})
      console.log('dayNum: ', String(dayNum))
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(String(dayNum)).set({
         message: input,
         mood
      })
      .then((docRef) => {
         console.log("Document written with ID: ", docRef);
      })
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
   }

   const submitMood = () => {
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(String(dayNum)).update({
         mood
      })
      .then((docRef) => {
         console.log("Document written with ID: ", docRef);
      })
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
   }

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
         <Textarea rowSpan={5} onChangeText={setInput} onEndEditing={submit}
         bordered placeholder="" />
         <Text style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 0,
            width: 200,
         }}>{mood}</Text>
         <ColorPalette
               onChange={color => {
                  setMood(moods[color]);
                  submitMood();
               }}
               defaultColor={Object.keys(moods).find(key => moods[key] === defaultMood)}
               colors={colorOptions}
               titleStyles={{display:"none"}}
            />
      </Form>
      </Content>
   </Container>
}

export default Notes;