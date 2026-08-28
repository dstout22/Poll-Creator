import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth, db } from "@/src/config/firebaseConfig";
import { adminEmail, adminPassword } from "@/src/util/hidden";
import { doc, getDoc, setDoc } from "firebase/firestore";

const maxOptions = 5;

export default function Admin() {
  const [numOptions, setNumOptions] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleNumOptionsChange = (value: string) => {

    if (parseInt(value) > maxOptions){
      value = maxOptions.toString();
    }

    setNumOptions(value);

    const number = Number(value);
    setOptions(Array(number).fill(""));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const generatePassword = (length = 12) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let password = "";

  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return password;
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      <Text style={styles.sectionTitle}>Poll</Text>

      <TextInput
        style={styles.input}
        placeholder="Question"
      />

      <TextInput
        style={styles.input}
        placeholder="Number of options"
        keyboardType="numeric"
        value={numOptions}
        onChangeText={handleNumOptionsChange}
      />

      {options.map((option, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChangeText={(value) => handleOptionChange(index, value)}
        />
      ))}

      <Button
        title="Set Poll Content"
        onPress={() => {}}
      />

      <Text style={styles.sectionTitle}>Guest Management</Text>

      <TextInput
        style={styles.input}
        placeholder="Guest email"
        keyboardType="email-address"
        value={inviteEmail}
        onChangeText={setInviteEmail}
        autoCapitalize="none"
      />

      <View style={styles.buttonRow}>
        <Button title="Invite Guest" onPress={async () => {
          const userRef = doc(db, "userPasswords", inviteEmail);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {

            const oldPassword = userSnap.data().password;

            Alert.alert(
              "User Already Created - save these credentials",
              `Email: ${inviteEmail}\nPassword: ${oldPassword}`,
              [{ text: "OK" }]
            );

            return;
          }

          const invitePassword = generatePassword();

          try {

            await createUserWithEmailAndPassword(
              auth,
              inviteEmail,
              invitePassword
            );

            await setDoc(doc(db, "userPasswords", inviteEmail), {
              email: inviteEmail,
              password: invitePassword,
            });

            await signInWithEmailAndPassword(
              auth,
              adminEmail,
              adminPassword
            );
            console.log("User created and admin signed back in.");
 
            Alert.alert(
              "User Created - save these credentials",
              `Email: ${inviteEmail}\nPassword: ${invitePassword}`,
              [{ text: "OK" }]
            );

          } catch (error) {
            console.log(error);
          }
        }} />
        <Button title="Remove Guest" onPress={async () => {
          if (!inviteEmail) return;

          try {
            await setDoc(doc(db, "toRemove", inviteEmail), {
              email: inviteEmail, 
            });

            setInviteEmail("");
            alert(`${inviteEmail} marked for removal\nEnsure that this is the correct email`);
          } catch (error) {
            console.error(error);
          }
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
});