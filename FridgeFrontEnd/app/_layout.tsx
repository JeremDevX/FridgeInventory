import NavigationBar from "@/components/NavigationBar";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView
      style={{ display: "flex", height: "100%", backgroundColor: "gray" }}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animationDuration: 100,
          }}
        />
        <Stack.Screen
          name="camera"
          options={{
            headerShown: false,
            animation: "fade",
            animationDuration: 100,
          }}
        />
        <Stack.Screen
          name="frigo"
          options={{
            headerShown: false,
            animation: "fade",
            animationDuration: 100,
          }}
        />
      </Stack>
      <NavigationBar />
    </SafeAreaView>
  );
}
