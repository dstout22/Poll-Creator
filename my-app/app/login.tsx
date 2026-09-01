import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { deleteUser, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { adminEmail } from "../src/util/hidden.js";
import { router } from "expo-router";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../src/config/firebaseConfig.js";

const auth = getAuth();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
  setError("");

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      if (user.email !== adminEmail) {
        const removeRef = doc(db, "toRemove", email);
        const removeSnap = await getDoc(removeRef);

        if (removeSnap.exists()) {
          await deleteUser(user);
          await deleteDoc(removeRef);
          await deleteDoc(doc(db, "userPasswords", email));

          setError("This account has been removed.");
          return;
        }

        router.replace("/poll");
        return;
      }

      // Admin login succeeded
      router.replace("/admin");
      return;
    })
    .catch(() => {
      setError("Invalid email or password.");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Log In" onPress={handleLogin} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
  },
});