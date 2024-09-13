import { Link, usePathname, Href } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function NavigationBar() {
  const pathname = usePathname();

  const buttons: { label: string; path: Href; key: string }[] = [
    { label: "Acceuil", path: "/", key: "index" },
    { label: "Frigo", path: "/frigo", key: "frigo" },
    {
      label: "Scanner",
      path: "/camera",
      key: "scanner",
    },
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <View
          key={button.key}
          style={[
            styles.button,
            {
              backgroundColor: pathname === button.path ? "black" : "white",
            },
          ]}
        >
          <Link
            key={button.key}
            href={button.path}
            style={styles.link}
            suppressHighlighting
          >
            <Text
              style={[
                styles.text,
                { color: pathname === button.path ? "white" : "black" },
              ]}
            >
              {button.label}
            </Text>
          </Link>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    margin: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    padding: 10,
  },
  text: {
    textAlign: "center",
    color: "black",
  },
});
