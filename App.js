import React from "react";
import AppNavigation from "./src/navigation/navigation";
import { FirebaseConfig } from "./src/utils/fireBaseConfig";

import * as firebase from "firebase";

export default function App() {
  const firebaseConfig = FirebaseConfig;
  // Initialize Firebase
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

  return <AppNavigation />;
}
