import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

const maxOptions = 5;

export default function Admin() {
  const [numOptions, setNumOptions] = useState("");
  const [options, setOptions] = useState<string[]>([]);

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
        autoCapitalize="none"
      />

      <View style={styles.buttonRow}>
        <Button title="Invite Guest" onPress={() => {}} />
        <Button title="Remove Guest" onPress={() => {}} />
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