import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { useState } from "react";
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
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
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
          Alert.alert("Product :", `${data.product.product_name}`, [
            { text: "OK", onPress: () => setScanned(false) },
            { text: "Ajouter au frigo", onPress: () => setScanned(false) },
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
        facing={"back"}
        autofocus="off"
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
      >
        {loadingScannedData && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              Code barre scanné, chargement des données en cours...
            </Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View style={styles.buttonContainer}></View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: 350,
    height: 250,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    width: 250,
    height: "auto",
    alignItems: "center",
    margin: "auto",
    marginTop: 150,
    backgroundColor: "gray",
  },
  loadingText: {
    marginTop: 125,
    textAlign: "center",
  },
});
