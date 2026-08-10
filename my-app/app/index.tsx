import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> NEW HOME SCREEN! </Text>
    </View>
  );
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#871474',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ff4949',
  },
});