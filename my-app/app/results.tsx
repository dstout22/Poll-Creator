import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/src/config/firebaseConfig";

export default function Results() {
  const [options, setOptions] = useState<string[]>([]);
  const [votes, setVotes] = useState<number[]>([]);

  useEffect(() => {
    const loadResults = async () => {
      try {

        const pollSnap = await getDoc(doc(db, "polls", "currentPoll"));

        if (!pollSnap.exists()) {
          Alert.alert("Error", "No current poll found.");
          router.replace("/admin");
          return;
        }

        const pollData = pollSnap.data();
        const pollOptions = pollData.options;

        setOptions(pollOptions);

        const voteCounts = Array(pollOptions.length).fill(0);

        const resultsSnap = await getDocs(collection(db, "Results"));

        resultsSnap.forEach((resultDoc) => {
          const choice = resultDoc.data().choice;

          if (choice >= 0 && choice < voteCounts.length) {
            voteCounts[choice]++;
          }
        });

        setVotes(voteCounts);

      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Could not load poll results.");
      }
    };

    loadResults();
  }, []);

  const maxVotes = Math.max(...votes, 1);

  return (
    <View style={styles.container}>

      <Button
        title="Back to Admin"
        onPress={() => router.replace("/admin")}
      />

      <Text style={styles.title}>Poll Results</Text>

      {options.map((option, index) => (
        <View key={index} style={styles.resultContainer}>
          
          <Text style={styles.optionText}>
            {option}: {votes[index] || 0}
          </Text>

          <View style={styles.barBackground}>
            <View
              style={[
                styles.bar,
                {
                  width: `${((votes[index] || 0) / maxVotes) * 100}%`,
                },
              ]}
            />
          </View>

        </View>
      ))}

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
    marginVertical: 30,
  },
  resultContainer: {
    marginBottom: 25,
  },
  optionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  barBackground: {
    height: 25,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: "#555",
    borderRadius: 5,
  },
});