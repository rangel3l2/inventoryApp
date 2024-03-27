import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import MyButton from "@/src/components/MyButton";
const { width, height } = Dimensions.get("window");

import { useRouter } from "expo-router";

export default function CameraScreen(props: any) {

  const navigation = useRouter();
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState(false);



  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  },[])

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    
    navigation.replace(`(login)/keepSessionModal?barcode=${data}` as any);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aproxime o código de barras</Text>

      <CameraView
        style={[styles.cameraView, { height, width }]}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["code128"],
        }}
      />
      <MyButton
        style={styles.input}
        title="Digite Código"
        route="/(login)/BarCodeWriting"
        typeNavigator="replace"
      />

      <View style={styles.targetRectangle} />
      {scanned && (
        <Button
          title={"Pressione para escanear novamente"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },
  title: {
    position: "absolute",
    zIndex: 1,
    transform: [{ rotate: "90deg" }],
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    top: height / 2 - 80,
    left: width / 2,
  },
  cameraView: {
    flex: 1,
  },
  targetRectangle: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "white",
    width: 200,
    height: height / 1.25, // Height of the rectangle
    borderRadius: 10, // Border radius for rounded corners
    margin: 20, // Margin around the rectangle
    top: 0,
    left: width / 2 - 120,
  },
  input: {
    padding: 4,
    position: "absolute",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    zIndex: 1,
    transform: [{ rotate: "90deg" }],
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    top: height / 2 - 80,
    left: -50,
  },
  barcodeValue: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
});
