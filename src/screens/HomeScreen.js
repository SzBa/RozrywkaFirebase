import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  Alert,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

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

  const deleteItem = (key) => {
    firebase
      .database()
      .ref("users/" + uid)
      .child(key)
      .remove();
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

      <View style={styles.flatListContainer}>
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onLongPress={() => {
                  Alert.alert(
                    "Are you sure? ",
                    "You delete this item",
                    [
                      {
                        text: "Cancel",
                      },
                      {
                        text: "Yes",
                        onPress: () => {
                          deleteItem(item.key);
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
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
                      Series <Ionicons name="md-bookmarks" size={20} />
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
    paddingBottom: 115,
  },
  row: {
    paddingLeft: 25,
    flex: 1,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  rowText: {
    fontSize: 18,
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
