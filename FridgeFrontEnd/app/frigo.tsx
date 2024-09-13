import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";

interface Item {
  id: number;
  name: string;
  quantity: number;
}

export default function Frigo() {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        "http://192.168.50.81:3000/api/items/items",
        { method: "GET" }
      );
      const result = await response.json();
      setItems(result);
      console.log(result);
    } catch (error) {
      console.log(error + "failed to fetch items");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
      return () => {
        console.log("Frigo component unmounted");
      };
    }, [])
  );

  const handleAddItem = async (id: number) => {
    const fetchAddItem = async () => {
      try {
        const response = await fetch(
          `http://192.168.50.81:3000/api/items/items/increase/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: 1 }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.log(
            "Erreur lors de la mise à jour de la quantité:",
            errorText
          );
          return;
        }

        const result = await response.json();
        console.log("Item quantity updated:", result);
        fetchItems();
      } catch (error) {
        console.log(
          "Une erreur s'est produite lors de l'ajout du produit: " + error
        );
      }
    };
    fetchAddItem();
  };
  const handleRemoveItem = async (id: number) => {
    const fetchAddItem = async () => {
      try {
        const response = await fetch(
          `http://192.168.50.81:3000/api/items/items/decrease/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.log(
            "Erreur lors de la mise à jour de la quantité:",
            errorText
          );
          return;
        }

        const result = await response.json();
        console.log("Item quantity updated:", result);
        fetchItems();
      } catch (error) {
        console.log(
          "Une erreur s'est produite lors de la suppression du produit: " +
            error
        );
      }
    };
    fetchAddItem();
  };

  return (
    <View style={styles.container}>
      <Text>Inventaire du frigo: {`\n\n`}</Text>
      {items
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => {
          return (
            <View key={item.name} style={styles.itemContainer}>
              <Text style={styles.item}>{item.name}</Text>
              <View style={styles.iconsContainer}>
                <Ionicons
                  name="add-circle"
                  size={24}
                  color="green"
                  onPress={() => {
                    handleAddItem(item.id);
                  }}
                />
                <Text>{item.quantity}</Text>
                <Ionicons
                  name="remove-circle"
                  size={24}
                  color="red"
                  onPress={() => {
                    handleRemoveItem(item.id);
                  }}
                />
              </View>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 25,
  },
  item: {
    textAlign: "left",
    width: "75%",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "25%",
  },
});
