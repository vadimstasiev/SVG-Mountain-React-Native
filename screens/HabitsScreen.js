import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Container, Header, Content, Card, CardItem,  Body, } from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";
import { firebase } from "@react-native-firebase/auth";


let db = firestore();

const TodoList = (props) => {
   const [isEditing, setIsEditing] = useState('false');
   const [habit, setHabit] = useState(props.habit)
   const editClicked=()=>{
      setIsEditing(!isEditing);
      console.log('update', props.habit.id, habit.name)
      props.editHabit(props.habit.id, habit.name);
   }
   return (
     <View style={styles.listTile}>
      {/* <Text style={styles.title}>{props.habit.name}</Text> */}
      {isEditing?
         <Icon
            name="delete"
            size={20}
            color="red"
            // onPress={() => props.deleteHabit(props.habit.id)}
            onPress={() => Alert.alert(
               "Delete",
               "Are you sure you want to delete?",
               [
                 {
                   text: "Cancel",
                   style: "cancel"
                 },
                 { text: "OK", onPress: () => props.deleteHabit(props.habit.id) }
               ],
               { cancelable: true }
             )}
         />
      :  
         <></>
      }
      <Card style={isEditing?{width: "72%"}:{width: "85%"}}>
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
               onEndEditing={()=>{
                  editClicked()
               }}
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
            // onPress={() => props.checkHabit(props.habit.id)}
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


  // Initalize empty array to store habits
  const [habits, setHabits] = useState([]);

  // function to add habit object in habit list
  const addHabit = async () => {
      if (title.length > 0) {
         // Add habit to the list
         let sendToFirestoreHabits = {}
         let habitMessage=title;
         // for (let habit in habits){
         //    console.log('habit', habits[habit])
         //    sendToFirestoreHabits[habits[habit].id]=habits[habit].name;
         // }
         // await setHabits([...habits, { id: Date.now(), name: title}]);
         // clear the value of the textfield
         await db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').update({[Date.now()]:habitMessage})
         .catch((error) => {
            db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').set({[Date.now()]:habitMessage})
            console.error("Error adding document: ", error);
         });
         setTitle("");
      }
      let temp = {}
      for (let habit in habits){
         console.log('habit', habits[habit])
         temp[habits[habit].id]=habits[habit].name;
      }

  };

  const editHabit = (id, habbitUpdate) => {
      // setSortHabbits([...habits.filter((habit)=>habit.id!==id), { id: id, name: title}]);
      // console.log(id, title)
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').update({[id]:habbitUpdate})
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
  }


  // function to delete habit from the habit list
  const deleteHabit = id => {
      // loop through habit list and return habits that don't match the id
      // update the state using setHabits function
      // setSortHabbits(habits.filter(habit => {
      //    return habit.id !== id;
      // }));
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').update({[id]:firebase.firestore.FieldValue.delete()})
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
  };

  const setSortHabbits = (inputHabbits) => {
      // var temp = habits.slice(0);
      setHabits([...inputHabbits.sort((a,b) => {
         var x = a.id.toLowerCase();
         var y = b.id.toLowerCase();
         return x < y ? -1 : x > y ? 1 : 0;
      })])
  }

  useEffect(() => {
      let unsubscribe = () => {};
      try {
         unsubscribe = db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').onSnapshot( async querySnapshot=>{
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
            key={habit.id}
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