import { View, Text, StyleSheet } from "react-native";

export default function Congratulations() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Congratulations!</Text>

      <Text style={styles.message}>
        You have successfully completed the poll!
      </Text>

      <Text style={styles.subtext}>
        Thanks for participating.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },

  message: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },

  subtext: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});