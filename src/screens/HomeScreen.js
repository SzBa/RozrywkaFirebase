import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, TextInput } from "react-native";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

import ItemsList from "../components/ItemsList";
import * as firebase from "firebase";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [uid, setUid] = useState("");
  const [data, setData] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [searchWorld, setSearchWorld] = useState("");

  useEffect(() => {
    const { email, displayName, uid } = firebase.auth().currentUser;
    setEmail(email);
    setFullName(displayName);
    setUid(uid);
    getDateFromFirebase(uid);
  }, []);

  const getDateFromFirebase = (uid) => {
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
        setItemsList(info);
      });
  };

  const searchItem = () => {
    if (searchWorld === "") {
      setData(itemsList);
    } else {
      let temp = [];
      itemsList.forEach((item) => {
        if (
          item.info.title.toLowerCase().includes(searchWorld.toLowerCase()) ||
          item.info.release.toLowerCase().includes(searchWorld.toLowerCase())
        ) {
          temp.push({
            info: item.info,
            key: item.key,
          });
        }
      });
      setData(temp);
    }
  };

  signOutUser = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <Ionicons name="md-home" size={40} color={"black"} />
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>
            Hi {fullName} It's yours library
          </Text>
        </View>
      </View>
      <View style={styles.searchArea}>
        <Ionicons style={styles.searchIcon} name="md-search" size={28} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          autoCapitalize="none"
          onChangeText={(filter) => setSearchWorld(filter)}
          onSubmitEditing={searchItem}
          onKeyPress={searchItem}
          value={searchWorld}
        ></TextInput>
      </View>
      <ItemsList data={data} uid={uid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColorAdd,
  },
  header: {
    backgroundColor: Colors.text,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  welcome: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "700",
  },
  searchArea: {
    flexDirection: "row",
  },
  searchInput: {
    height: 50,
    paddingLeft: 20,
    fontSize: 22,
    color: Colors.textAdd,
  },
  searchIcon: {
    paddingLeft: 30,
    marginVertical: 10,
  },
});

export default HomeScreen;
