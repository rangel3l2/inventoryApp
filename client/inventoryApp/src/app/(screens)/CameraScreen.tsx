import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions, TextInput, Pressable } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import MyButton from "@/src/components/MyButton";
const { width, height } = Dimensions.get('window');

export default function CameraScreen(props :any) {
  const {route = '/NotFoundScreen'} = props
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aproxime o código de barras</Text>

      <CameraView
        style={[styles.cameraView, { height, width }]}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",          
            "code128",        
          
          ],
        }}
      />
     <MyButton
     style = {styles.input}
     title = 'Código de Barras'/>
      <View style={styles.targetRectangle} />
      {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  title: {
    position: "absolute",
    zIndex:1,
    transform: [{ rotate: "90deg" }],
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    top: height /2 -80,
    left: width/2,
  },
  cameraView: {
    flex: 1,
  },
  targetRectangle: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "white",
    width: 200,
    height: height / 1.23, // Height of the rectangle
    borderRadius: 10, // Border radius for rounded corners
    margin: 20, // Margin around the rectangle
    top: 0,
    left: width / 2 - 120,
    
  },
  input: {
    padding:4,
    position:'absolute',     
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    zIndex:1,
    transform: [{ rotate: "90deg" }],
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,    
    top: height /2 -80,
    left: -50,
  },
  barcodeValue: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
});
