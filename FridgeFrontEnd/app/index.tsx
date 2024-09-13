import { FlatList, StyleSheet, Text, View } from "react-native";

export default function index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Application "Frigo"{`\n`}</Text>
      <Text style={styles.text}>React Native + Expo{`\n`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
  },
  text: { textAlign: "center" },
});
