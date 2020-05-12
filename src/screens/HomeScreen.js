import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Colors from "../constants/colors";

import * as firebase from "firebase";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const { email, displayName } = firebase.auth().currentUser;
    setEmail(email);
    setFullName(displayName);
  }, []);

  signOutUser = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <Text>Hi {fullName}!</Text>

      <TouchableOpacity style={{ marginTop: 32 }} onPress={signOutUser}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
