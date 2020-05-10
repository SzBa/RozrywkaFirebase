import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD2l9AjaqPvV9_w6_BZ09Bo--JQVCYhBVQ",
  authDomain: "rozrywkafirebase-b1cb2.firebaseapp.com",
  databaseURL: "https://rozrywkafirebase-b1cb2.firebaseio.com",
  projectId: "rozrywkafirebase-b1cb2",
  storageBucket: "rozrywkafirebase-b1cb2.appspot.com",
  messagingSenderId: "268795170539",
  appId: "1:268795170539:web:5c1d95ff5750cdd6f878ae",
  measurementId: "G-1DBN30QCHX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const AppStack = createStackNavigator({
  Home: HomeScreen,
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

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