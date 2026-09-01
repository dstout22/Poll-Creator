import { View, Text, StyleSheet } from "react-native";

export default function Congratulations() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Congratulations, you have completed the current poll!
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
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});