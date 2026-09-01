import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/config/firebaseConfig";

export default function Poll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const loadPoll = async () => {
      try {
        const pollRef = doc(db, "polls", "currentPoll");
        const pollSnap = await getDoc(pollRef);

        if (pollSnap.exists()) {
          const pollData = pollSnap.data();

          setQuestion(pollData.question);
          setOptions(pollData.options);
        }
      } catch (error) {
        console.error("Could not load poll:", error);
      }
    };

    loadPoll();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>

      {options.map((option, index) => (
        <Pressable
          key={index}
          style={styles.option}
          onPress={() => setSelectedOption(index)}
        >
          <View style={styles.circle}>
            {selectedOption === index && <View style={styles.selectedCircle} />}
          </View>

          <Text style={styles.optionText}>{option}</Text>
        </Pressable>
      ))}

      <View style={styles.submitButton}>
        <Button
          title="Submit"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  circle: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 12,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "black",
  },
  optionText: {
    fontSize: 18,
  },
  submitButton: {
    marginTop: 20,
  },
});