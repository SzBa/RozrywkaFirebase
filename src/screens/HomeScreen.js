import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

import * as firebase from "firebase";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [uid, setUid] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const { email, displayName, uid } = firebase.auth().currentUser;
    setEmail(email);
    setFullName(displayName);
    setUid(uid);

    firebase
      .database()
      .ref("users/" + uid)
      .once("value")
      .then((response) => {
        setData(response.val());
      });
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

      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Hi {fullName} It's yours library</Text>
      </View>
      <Text>{data.title}</Text>
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
  welcome: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  items: {},
});

export default HomeScreen;
