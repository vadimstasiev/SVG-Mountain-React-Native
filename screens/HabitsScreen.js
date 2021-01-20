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
import { Card, CardItem,  Body } from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";
import LoadingScreen from "./LoadingScreen";

import { firebase } from "@react-native-firebase/auth";


let db = firestore();

const HabitListItem = (props) => {
   const [isEditing, setIsEditing] = useState('false');
   const [habit, setHabit] = useState(props.habit)
   const editClicked=()=>{
      setIsEditing(!isEditing);
      props.editHabit(props.habit.id, habit.name);
   }
   return (
     <View style={styles.listTile}>
      {isEditing?
         <Icon
            name="delete"
            size={20}
            color="red"
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

   // Initalize empty array to store habits
   const [habits, setHabits] = useState([]);
   
   const [initializing, setInitializing] = useState(true)
   
   const [title, setTitle] = useState("");

   // function to add habit object in habit list
  const addHabit = async () => {
      if (title.length > 0) {
         // Add habit to the list
         let sendToFirestoreHabits = {}
         let habitMessage=title;
         await db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').update({[Date.now()]:habitMessage})
         .catch((error) => {
            db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').set({[Date.now()]:habitMessage})
            .catch((error) => {
               console.error("Error adding document: ", error);
            });
         });
         setTitle("");
      }
      let temp = {}
      for (let habit in habits){
         console.log('habit', habits[habit])
         temp[habits[habit].id]=habits[habit].name;
      }

  };
  // function to edit habit from the habit list
  const editHabit = (id, habbitUpdate) => {
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').update({[id]:habbitUpdate})
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
  }


  // function to delete habit from the habit list
  const deleteHabit = id => {
      db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').update({[id]:firebase.firestore.FieldValue.delete()})
      .catch((error) => {
         console.error("Error adding document: ", error);
      });
  };

  const setSortHabbits = (inputHabbits) => {
      setHabits([...inputHabbits.sort((a,b) => {
         var x = a.id.toLowerCase();
         var y = b.id.toLowerCase();
         return x < y ? -1 : x > y ? 1 : 0;
      })])
  }

  useEffect(() => {
      let unsubscribe = () => {};
      setInitializing(true);
      try {
         // Get the user habits from the database and store them as local data
         unsubscribe = db.collection("users").doc(user.uid).collection(monthSvgScreen).doc('Habits').onSnapshot( async querySnapshot=>{
            let data = await querySnapshot.data()
            let firebaseHabits = []
            if (data) {
               for (const id in data) {
                  const name = data[id];
                  firebaseHabits.push({id, name})
               }
            let localHabbits;
            firebaseHabits.map((habit) => {
               localHabbits = habits.filter((firebaseHabit) => firebaseHabit.id!==habit.id)
            })
            // must sort the habits so they always show in the same order, otherwise glitch occurs
            setSortHabbits([...habits, ...firebaseHabits]);
         }
         })
      } catch (error) {
         console.log('Firestore error', error);
      }
      setInitializing(false);
      const navUnsubscribe = navigation.addListener('submitBeforeGoing', (e) => {
         submit();
      })
      return () => {
         unsubscribe();
         navUnsubscribe();
      }
 }, []);

   // Display initializing screen if the data has not loaded yet
   if (initializing) return <View style={styles.loadingContainer}>
      <LoadingScreen backgroundColor={'white'} color={'#6aab6a'}/>
   </View>

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
          <HabitListItem
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


// styles for different components
const styles = StyleSheet.create({
   statusBar: {
      backgroundColor: "#4050b5",
      color: "#fff",
      width: "100%",
      height: 30
   },
   loadingContainer: {
      flex: 1,
      margin:0,
      justifyContent: 'center',
      paddingTop: 10,
      backgroundColor: 'white',
      padding: 8,
      height:700
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