import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Alert,
  View,
  ActivityIndicator,
} from "react-native";

export default function CodeBarScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loadingScannedData, setLoadingScannedData] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Nous avons besoin de votre permission pour accéder à la caméra.
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const addItemToFrigo = async (name: string) => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.50.81:3000/api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            quantity: 1,
          }),
        });
        const result = await response.json();
        console.log(result);
        Alert.alert("Réussite", "Produit ajouté au frigo", [
          { text: "OK", onPress: () => setScanned(false) },
        ]);
      } catch (error) {
        console.log(error + "failed to add item to frigo");
      }
    };
    fetchData();
  };

  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
    if (!scanned) {
      console.log(scanningResult);
      const barCode = scanningResult.data;

      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://world.openfoodfacts.org/api/v2/product/${barCode}.json`
          );
          const data = await response.json();
          setLoadingScannedData(false);
          let productName;
          if (data.product.product_name === "" || null || undefined) {
            productName = data.product.product_name_en;
          } else {
            productName = data.product.product_name;
          }

          Alert.alert("Product :", `${productName}`, [
            { text: "OK", onPress: () => setScanned(false) },
            {
              text: "Ajouter au frigo",
              onPress: () => addItemToFrigo(productName),
            },
          ]);
        } catch (error) {
          setLoadingScannedData(false);
          Alert.alert("Error", "Failed to fetch product data", [
            { text: "OK", onPress: () => setScanned(false) },
          ]);
        }
      };
      fetchData();
      setScanned(true);
      setLoadingScannedData(true);
    }
  };
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: [
            "aztec",
            "codabar",
            "code128",
            "code39",
            "code93",
            "datamatrix",
            "ean13",
            "ean8",
            "itf14",
            "pdf417",
            "upc_a",
            "upc_e",
          ],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      ></CameraView>
      {loadingScannedData && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Code barre scanné, veuillez patienter, chargement des données en
            cours...
          </Text>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    width: 350,
    height: 350,
    borderRadius: 10,
  },
  loadingContainer: {
    position: "absolute",
    width: 250,
    height: 150,
    padding: 10,
    borderRadius: 10,
    margin: "auto",
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "red",
  },
  loadingText: {
    textAlign: "center",
    color: "black",
    marginBottom: 25,
    fontWeight: "bold",
    fontSize: 16,
  },
});
