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

  const deleteItem = () => {
    firebase.database().ref("users").child(uid).info.remove();
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

      <View style={styles.flatListContainer}>
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={deleteItem}>
                <View style={styles.row}>
                  {item.info.gameCheckBox ? (
                    <Text style={styles.rowText}>
                      Game <Ionicons name="logo-playstation" size={20} />
                    </Text>
                  ) : null}
                  {item.info.movieCheckBox ? (
                    <Text style={styles.rowText}>
                      Movie <Ionicons name="md-videocam" size={20} />
                    </Text>
                  ) : null}
                  {item.info.bookCheckBox ? (
                    <Text style={styles.rowText}>
                      Book <Ionicons name="md-book" size={20} />
                    </Text>
                  ) : null}
                  {item.info.seriesCheckBox ? (
                    <Text style={styles.rowText}>
                      Serial <Ionicons name="md-bookmarks" size={20} />
                    </Text>
                  ) : null}
                  <Text style={styles.rowText}>Title: {item.info.title}</Text>
                  <Text style={styles.rowText}>
                    Release: {item.info.release}
                  </Text>
                  <Text style={styles.rowText}>
                    Read/Seen/Played:{" "}
                    {item.info.readToggleCheckBox ? (
                      <Ionicons name="md-checkbox" size={20} color={"green"} />
                    ) : (
                      <Ionicons name="md-close" size={20} color={"red"} />
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
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
  flatListContainer: {
    paddingBottom: 62,
  },
  row: {
    paddingLeft: 25,
    flex: 1,
    paddingVertical: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  rowText: {
    fontSize: 18,
  },
});

export default HomeScreen;
