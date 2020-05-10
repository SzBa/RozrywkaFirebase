import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 80, height: 80 }}
          source={require("../images/logo.png")}
        />
        <Text style={styles.logoText}>Welcome to My App!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  logoText: {
    marginTop: 15,
    fontSize: 24,
    color: "#fff",
  },
});
