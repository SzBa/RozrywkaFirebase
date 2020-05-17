import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
} from "react-native";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

import * as firebase from "firebase";
import { ListItem } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [uid, setUid] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const { email, displayName, uid } = firebase.auth().currentUser;
    setEmail(email);
    setFullName(displayName);
    setUid(uid);

    firebase
      .database()
      .ref("users")
      .child(uid)
      .on("value", (response) => {
        const info = [];
        response.forEach((item) => {
          info.push({
            info: item.val(),
            key: item.key,
          });
        });
        setData(info);
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
      <View style={styles.itemList}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>
                Author: {item.info.title} Tag: {item.info.release}
              </Text>
              <Text>Title: {item.info.title}</Text>
            </View>
          )}
        />
      </View>
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
  itemList: {
    marginVertical: 20,
    backgroundColor: "orange",
  },
});

export default HomeScreen;
