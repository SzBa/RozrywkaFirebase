import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../constants/colors";
import CheckBox from "@react-native-community/checkbox";

const AddItemScreen = ({ navigation }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="md-arrow-back" size={30} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.headerAddItem}>Add Item</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Title</Text>
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.text}>Release</Text>
        <TextInput style={styles.input}></TextInput>

        <View style={styles.CheckBoxArea}>
          <Text style={styles.text}>Read / Seen / Played</Text>
          <CheckBox
            tintColors={{ true: Colors.accent }}
            style={styles.CheckBox}
            value={toggleCheckBox}
            onValueChange={() =>
              toggleCheckBox
                ? setToggleCheckBox(false)
                : setToggleCheckBox(true)
            }
          ></CheckBox>
        </View>
      </View>

      <View style={styles.CheckBoxArea}>
        <View style={styles.checkBoxType}>
          <Text style={styles.text}>Game</Text>
          <CheckBox
            style={styles.checkBoxInCheckArea}
            tintColors={{ true: Colors.accent }}
          ></CheckBox>
        </View>
        <View style={styles.checkBoxType}>
          <Text style={styles.text}>Book</Text>
          <CheckBox
            style={styles.checkBoxInCheckArea}
            tintColors={{ true: Colors.accent }}
          ></CheckBox>
        </View>
        <View style={styles.checkBoxType}>
          <Text style={styles.text}>Movie</Text>
          <CheckBox
            style={styles.checkBoxInCheckArea}
            tintColors={{ true: Colors.accent }}
          ></CheckBox>
        </View>

        <View style={styles.checkBoxType}>
          <Text style={styles.text}>Series</Text>
          <CheckBox
            style={styles.checkBoxInCheckArea}
            tintColors={{ true: Colors.accent }}
          ></CheckBox>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColorAdd,
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
  headerAddItem: {
    fontWeight: "500",
    fontSize: 24,
  },
  inputContainer: {
    margin: 36,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.textAdd,
    fontSize: 24,
  },
  input: {
    backgroundColor: Colors.text,
    height: 40,
    width: 300,
    fontSize: 18,
    color: Colors.textAdd,
    borderRadius: 25,
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  CheckBoxArea: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    flexDirection: "row",
  },
  CheckBox: {
    marginLeft: 40,
  },
  checkBoxType: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  checkBoxInCheckArea: {
    marginTop: 20,
  },
});

export default AddItemScreen;
