import { Redirect } from "expo-router";
import { auth } from "../src/config/firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { adminEmail, adminPassword } from "../src/util/hidden.js";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
  
export default function Index() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    async function seedAdmin() {
      try {
        await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
        console.log("Admin account created successfully.");
      } catch (error) {
        if ((error as { code: string }).code === "auth/email-already-in-use") {
        console.log("Admin account already exists. Proceeding to login...");
        } else {
        console.error("Failed to create admin account", error);
        }
    }
      finally {
        setIsReady(true);
      }
    }

    seedAdmin();
  }, []); //An empty dependency array ensures this effect runs only once when the component "mounts"
  //The mount is the first render

  // Show a loading indicator until the async auth attempt completes
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href="/login" />;
}