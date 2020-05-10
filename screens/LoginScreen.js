import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";

import Logo from "../components/Logo";
import * as firebase from "firebase";
import Colors from "../constants/colors";
export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="position"
          keyboardVerticalOffset={-60}
        >
          <StatusBar backgroundColor={Colors.primary} />
          <Logo />
          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />

            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />

            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
              <Text style={styles.buttonText}>Sign in?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Text style={styles.signupButtonText}>
                New to Social App?
                <Text style={{ fontWeight: "bold" }}> Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    flex: 1,
  },
  errorMessage: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  error: {
    color: "#e9446a",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  form: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  inputTitle: {
    justifyContent: "center",
    alignItems: "center",
    color: Colors.text,
    fontSize: 16,
  },
  input: {
    backgroundColor: Colors.textInput,
    height: 40,
    width: 300,
    fontSize: 18,
    color: Colors.text,
    borderRadius: 25,
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  button: {
    width: 300,
    backgroundColor: Colors.button,
    height: 40,
    borderRadius: 25,
    paddingHorizontal: 30,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
  signupButton: {
    height: 20,
    alignSelf: "center",
    marginTop: 32,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
});
