import React, { useState, useEffect } from "react";
import { View } from "react-native";
import auth from "@react-native-firebase/auth";

import { Container, Text, Button, Content } from "native-base";
import * as Font from "expo-font";

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button block light>
        <Text>Light</Text>
      </Button>
      <Button block>
        <Text>Primary</Text>
      </Button>
      <Button block success>
        <Text>Success</Text>
      </Button>
      <Button block info>
        <Text>Info</Text>
      </Button>
      <Button block warning>
        <Text>Warning</Text>
      </Button>
      <Button block danger>
        <Text>Danger</Text>
      </Button>
      <Button block dark>
        <Text>Dark</Text>
      </Button>
    </View>
  );
}

export default App;
