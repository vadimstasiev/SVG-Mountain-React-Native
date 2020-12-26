import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Container, Header, Content, Card, CardItem,  Body, Input } from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";


const TodoList = (props) => {
   const [isEditing, setIsEditing] = useState('false');
   const editClicked=()=>{
      setIsEditing(!isEditing);
   }
   return (
     <View style={styles.listTile}>
      {/* <Text style={styles.title}>{props.habbit.name}</Text> */}
      <Card style={styles.card}>
         {/* <CardItem header>
            <Icon
               name="delete"
               size={20}
               color="#666666"
               onPress={() => props.deleteHabbit(props.habbit.key)}
            />
         </CardItem> */}
         <CardItem>
            <Body>
               <Text >
               {props.habbit.name}
               {'     '}
               </Text>
            </Body>
         </CardItem>
      </Card>
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
      setHabbits([...habbits, { key: Date.now(), name: title, isChecked: false }]);
      // clear the value of the textfield
      setTitle("");
    }
    console.log(habbits)
  };

  const editHabbits = (key, message) => {

  }

  // function to mark habbit as checked or unchecked
  const checkHabbit = id => {
    // loop through habbit list and look for the the habbit that matches the given id param
    // update the state using setHabbits function
    setHabbits(
      habbits.map(habbit => {
        if (habbit.key === id) {
          habbit.isChecked = !habbit.isChecked;
        }
        return habbit;
      })
    );
  };

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
        <Input
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
            checkHabbit={checkHabbit}
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
   card: {
      width: "85%",
   },
   button: {
      alignItems: "center",
      backgroundColor: "white",
      padding: 10
    },
});

export default HabbitsScreen;