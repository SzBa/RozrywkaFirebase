import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";

import * as firebase from "firebase";
import Colors from "../constants/colors";
import Logo from "../components/Logo";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => setErrorMessage(error.message));
  };

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
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <Text style={styles.inputTitle}>Full name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(name) => setName(name)}
            value={name}
          />

          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />

          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.signupButtonText}>
              Already have an account?
              <Text style={{ fontWeight: "bold" }}> Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

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
    marginTop: 5,
  },
  form: {
    flex: 1,
    alignItems: "center",
    marginTop: 5,
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

export default RegisterScreen;
