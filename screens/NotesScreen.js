import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Header, Text, Form, Textarea, Button, Item, Label, Input, Content, Icon, Footer, FooterTab} from "native-base";
import ColorPalette from 'react-native-color-palette';


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

const Notes = (props) => {
   const { id, color } = props.route.params;

   // const [inputHistory, setInputHistory] = useState([])
   const [input, setInput] = useState('')

   const onSubmit=()=>{
      console.log(input);
   }

   const onChangeText = (text) =>{
      // setInputHistory([...inputHistory, text]);
      setInput(text);
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
         <Button style={{marginTop:20}} onPress={onSubmit} block success>
            <Text>Save</Text>
         </Button>
      </Form>
      </Content>
      <Footer>
          <FooterTab>
            <Button>
              <Text></Text>
            </Button>
            <Button>
              <Text style={{fontSize:30, paddingTop:10}}>↶</Text>
            </Button>
            <Button active>
              <Text style={{fontSize:30, paddingTop:10}}>↷</Text>
            </Button>
            <Button>
              <Text></Text>
            </Button>
          </FooterTab>
        </Footer>
   </Container>
}

export default Notes;