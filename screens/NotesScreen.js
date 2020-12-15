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
   const { user, dayNum, monthSvgScreen } = props.route.params;
   
   const [input, setInput] = useState('');

   const [color, setColor] = useState('#C0392B');
   const colorOptions = ['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9'];
   let defaultMood = 'Good';
   const moods = {
      '#C0392B':'Perfect',
      '#E74C3C':'Good',
      '#9B59B6':'Average',
      '#8E44AD':'Bad',
      '#2980B9':'Fucking Terrible'
   }
   const [mood, setMood] = useState(defaultMood);

   
   
   const onChangeText = async (text) =>{
      setInput(text);
      console.log('currentUser', user);
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc(dayNum).set({
         mood,
         message: input
      })
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
         <Textarea rowSpan={5} onChangeText={(text)=>onChangeText(text)}
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
                  setColor(color);
                  setMood(moods[color]);
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