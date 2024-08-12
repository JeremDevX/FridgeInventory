import CodeBarScanner from "@/components/CodeBarScanner";
import { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default function Index() {
  const [toggleScanner, setToggleScanner] = useState(false);
  return (
    <View style={styles.container}>
      <Button
        title="Scanner"
        onPress={() => setToggleScanner(!toggleScanner)}
      />
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {toggleScanner && (
        <View style={styles.scannerContainer}>
          <CodeBarScanner />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scannerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
