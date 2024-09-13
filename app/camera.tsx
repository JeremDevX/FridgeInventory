import CodeBarScanner from "@/components/CodeBarScanner";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { useFocusEffect } from "expo-router";

export default function Camera() {
  useFocusEffect(() => {
    return () => {
      console.log("Camera component unmounted");
    };
  });
  return (
    <View style={styles.container}>
      <CodeBarScanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
