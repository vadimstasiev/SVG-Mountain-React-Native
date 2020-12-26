import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

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


let db = firestore();

const TodoList = (props) => {
   const [isEditing, setIsEditing] = useState('false');
   const [habit, setHabit] = useState(props.habit)
   const editClicked=()=>{
      setIsEditing(!isEditing);
      props.editHabit(props.habit.key, habit.name);
   }
   return (
     <View style={styles.listTile}>
      {/* <Text style={styles.title}>{props.habit.name}</Text> */}
      {isEditing?<></>:
         <Icon
            name="delete"
            size={20}
            color="red"
            onPress={() => props.deleteHabit(props.habit.key)}
         />
      }
      <Card style={isEditing?{width: "85%"}:{width: "70%"}}>
         <CardItem>
            <Body>
            {isEditing?
               <Text >
               {props.habit.name}
               {'     '}
               </Text>
            :
            <>
               <TextInput
               defaultValue={String(props.habit.name)}
               autoFocus={true}
               // onEndEditing={()=>{
               //    editClicked()
               // }}
               onChangeText={value => setHabit({...habit, name: value})}
               />
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
            // onPress={() => props.checkHabit(props.habit.key)}
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


const HabitsScreen = ({navigation, user, monthSvgScreen}) => {

  const [title, setTitle] = useState("");

  // iniitalize empty object habit
  const [habit, setTodo] = useState({});

  // Initalize empty array to store habits
  const [habits, setHabits] = useState([]);

  // function to add habit object in habit list
  const addHabit = () => {
    if (title.length > 0) {
      // Add habit to the list
      setHabits([...habits, { key: Date.now(), name: title}]);
      // clear the value of the textfield
      setTitle("");
    }
    console.log(habits)
  };

  const editHabit = (id, title) => {
      setHabits([...habits.filter((habit)=>habit.key!==id), { key: id, name: title}])
      console.log(id, title)
  }


  // function to delete habit from the habit list
  const deleteHabit = id => {
    // loop through habit list and return habits that don't match the id
    // update the state using setHabits function
    setHabits(habits.filter(habit => {
      return habit.key !== id;
    }));
  };

  useEffect(() => {
    let unsubscribe = () => {};
    try {
       unsubscribe = db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').onSnapshot( async querySnapshot=>{
          let data = await querySnapshot.data()
          let firebaseHabits = []
          if (data) {
            for (const key in data) {
               const name = data[key];
               // console.log('here', key, name)
               firebaseHabits.push({key, name})
            }
          habits.map((habit) => {
            firebaseHabits = firebaseHabits.filter((firebaseHabit) => firebaseHabit.key!==habit.key)
          })
          setHabits([...habits, ...firebaseHabits])
          }
       })
    } catch (error) {
       console.log('Firestore error', error);
    }


    const navUnsubscribe = navigation.addListener('submitBeforeGoing', (e) => {
       submit();
    })
    return () => {
       unsubscribe();
       navUnsubscribe();
    }
 }, []);

  return (
    <View style={styles.container}>
      <View style={styles.habit}>
        <TextInput
          placeholder="Add a Habit"
          value={title}
          onChangeText={value => setTitle(value)}
          style={styles.textbox}
        />
        <Button title="Add" color="#4050b5" onPress={() => addHabit()} />
      </View>

      <ScrollView >
        {habits.map(habit => (
          <TodoList
            key={habit.key}
            habit={habit}
            editHabit={editHabit}
            deleteHabit={deleteHabit}
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
   habit: {
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

export default HabitsScreen;