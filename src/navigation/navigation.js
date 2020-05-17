import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import AddItemScreen from "../screens/AddItemScreen";
import Logout from "../components/Logout";

import * as firebase from "firebase";

import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-home" size={24} color={tintColor} />
        ),
      },
    },
    AddItem: {
      screen: AddItemScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-add-circle" size={30} color={tintColor} />
        ),
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-log-out" size={24} color={tintColor} />
        ),
        tabBarOnPress: () => {
          Alert.alert(
            "Are you sure? ",
            "Don't do this",
            [
              {
                text: "Cancel",
              },
              {
                text: "Yes",
                onPress: () => {
                  firebase.auth().signOut();
                },
              },
            ],
            { cancelable: false }
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#0032b4",
      inactiveTintColor: "black",
    },
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
