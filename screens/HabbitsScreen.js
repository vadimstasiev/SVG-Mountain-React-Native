import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Container, Header, Content, Card, CardItem,  Body, } from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";


const TodoList = (props) => {
   const inputReference = useRef();
   const [isEditing, setIsEditing] = useState('false');
   const [habbit, setHabbit] = useState(props.habbit)
   const editClicked=()=>{
      setIsEditing(!isEditing);
      props.editHabbit(props.habbit.key, habbit);
   }
   return (
     <View style={styles.listTile}>
      {/* <Text style={styles.title}>{props.habbit.name}</Text> */}
      {isEditing?<></>:
         <Icon
            name="delete"
            size={20}
            color="red"
            onPress={() => props.deleteHabbit(props.habbit.key)}
         />
      }
      <Card style={isEditing?{width: "85%"}:{width: "70%"}}>
         <CardItem>
            <Body>
            {isEditing?
               <Text >
               {props.habbit.name}
               {'     '}
               </Text>
            :
            <>
               <TextInput
               defaultValue={props.habbit.name}
               autoFocus={true}
               // onEndEditing={()=>{
               //    editClicked()
               // }}
               onChangeText={value => setHabbit(value)}
               />
               {/* {console.log(inputReference)} */}
            </>
            }
            </Body>
         </CardItem>
      </Card>
      {isEditing?
      <TouchableOpacity
      style={styles.button}
      onPress={editClicked}
      >
        <Icon
            name={"edit"}
            size={20}
            color="#666666"
            // onPress={() => props.checkHabbit(props.habbit.key)}
            />
      </TouchableOpacity>
      :
      <TouchableOpacity
      style={styles.button}
      onPress={editClicked}
      >
        <Icon
            name={"check"}
            size={20}
            color="green"
            onEndEditing={()=>{
               editClicked()
            }}
            />
      </TouchableOpacity>}
      
     </View>
   );
 }


const HabbitsScreen = ({navigation, user}) => {

  const [title, setTitle] = useState("");

  // iniitalize empty object habbit
  const [habbit, setTodo] = useState({});

  // Initalize empty array to store habbits
  const [habbits, setHabbits] = useState([]);

  // function to add habbit object in habbit list
  const addHabbit = () => {
    if (title.length > 0) {
      // Add habbit to the list
      setHabbits([...habbits, { key: Date.now(), name: title}]);
      // clear the value of the textfield
      setTitle("");
    }
  };

  const editHabbit = (id, title) => {
      setHabbits([...habbits.filter((habbit)=>habbit.key!==id), { key: id, name: title}])
      console.log(id, title)
  }


  // function to delete habbit from the habbit list
  const deleteHabbit = id => {
    // loop through habbit list and return habbits that don't match the id
    // update the state using setHabbits function
    setHabbits(habbits.filter(habbit => {
      return habbit.key !== id;
    }));
  };

  useEffect(() => {
    console.log(habbits.length, "TodoList length");
    //console.log(habbits);
  }, [habbits]);

  return (
    <View style={styles.container}>
      <View style={styles.habbit}>
        <TextInput
          placeholder="Add a Habbit"
          value={title}
          onChangeText={value => setTitle(value)}
          style={styles.textbox}
        />
        <Button title="Add" color="#4050b5" onPress={() => addHabbit()} />
      </View>

      <ScrollView >
        {habbits.map(habbit => (
          <TodoList
            key={habbit.key}
            habbit={habbit}
            editHabbit={editHabbit}
            deleteHabbit={deleteHabbit}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
   statusBar: {
      backgroundColor: "#4050b5",
      color: "#fff",
      width: "100%",
      height: 30
   },
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start"
   },
   habbit: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
   },
   textbox: {
      borderWidth: 1,
      borderColor: "#4050b5",
      borderRadius: 8,
      padding: 10,
      margin: 10,
      width: "80%", 
      fontSize:16,
      height: 39
   },
   listTile: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "white",
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomColor: "#666666"
   },
   button: {
      alignItems: "center",
      backgroundColor: "white",
      padding: 10
    },
});

export default HabbitsScreen;