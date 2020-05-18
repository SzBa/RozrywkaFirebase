import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

const ItemsList = (props) => {
  const [data, setData] = useState([]);
  const [uid, setUid] = useState("");

  useEffect(() => {
    setData(props.data);
    setUid(props.uid);
  }, [props.data, props.uid]);

  const deleteItem = (key) => {
    firebase
      .database()
      .ref("users/" + uid)
      .child(key)
      .remove();
  };

  return (
    <View style={styles.flatListContainer}>
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
              <Text style={styles.rowText}>Release: {item.info.release}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ItemsList;
