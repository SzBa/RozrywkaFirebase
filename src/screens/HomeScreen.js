import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

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
      <View style={styles.header}>
        <Ionicons name="md-home" size={30} color={"black"} />
      </View>
      <Text style={styles.welcomeText}>Hi {fullName} It's yours library</Text>

      <TouchableOpacity style={{ marginTop: 32 }} onPress={signOutUser}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.text,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  welcomeText: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
