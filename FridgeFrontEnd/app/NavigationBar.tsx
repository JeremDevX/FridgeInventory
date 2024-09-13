import { Link, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NavigationBar() {
  const [backgroundColorLeft, setBackgroundColorLeft] = useState("white");
  const [backgroundColorRight, setBackgroundColorRight] = useState("white");
  const [actualPage, setActualPage] = useState("index");

  useEffect(() => {
    console.log("actual page: " + actualPage);
    if (actualPage === "index") {
      setBackgroundColorLeft("red");
      setBackgroundColorRight("white");
    } else if (actualPage === "scanner") {
      setBackgroundColorLeft("white");
      setBackgroundColorRight("red");
    }
  }, [actualPage]);

  const handlePress = (page: string) => {
    setActualPage(page);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.button,
          styles.buttonLeft,
          { backgroundColor: backgroundColorLeft },
        ]}
      >
        <Link
          href="/"
          style={styles.link}
          suppressHighlighting
          onPress={() => {
            handlePress("index");
          }}
        >
          <Text style={styles.text}>Frigo</Text>
        </Link>
      </View>
      <View
        style={[
          styles.button,
          styles.buttonRight,
          { backgroundColor: backgroundColorRight },
        ]}
      >
        <Link
          href="/camera"
          style={styles.link}
          suppressHighlighting
          onPress={() => {
            handlePress("scanner");
          }}
        >
          <Text style={styles.text}>Scanner</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "50%",
  },
  buttonLeft: {
    borderTopStartRadius: 5,
  },
  buttonRight: {
    borderTopEndRadius: 5,
  },
  link: {},
  text: {
    flex: 1,
    textAlign: "center",
    color: "black",
  },
});
