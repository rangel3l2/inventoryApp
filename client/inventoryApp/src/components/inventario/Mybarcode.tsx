import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  useColorScheme,
} from "react-native";
import React, { FC } from "react";
import { CameraView } from "expo-camera/next";
import { AntDesign } from "@expo/vector-icons";
import MyButton from "@/src/components/MyButton";
import Colors from "@/constants/Colors";
import { Item } from "@/src/model/item";

const { width, height } = Dimensions.get("window");
type Props = {
  canUseCamera: boolean;
  handleBarCodeScanned: (data: any) => void;
  closeCBCamera: () => void;
  setItem: (data: any) => void;
  item: Item;
  getPatrimonyByBarCode?: (data: string | null) => Promise<void>;
  editCodeBar?: boolean;
};
const MyBarCode: FC<Props> = ({
  canUseCamera,
  handleBarCodeScanned,
  closeCBCamera,
  setItem,
  item,
  getPatrimonyByBarCode,
  editCodeBar,
}) => {
  const colorScheme = useColorScheme() || "light";
  const theme = colorScheme === "light" ? Colors.dark : Colors.light;
  const themeColorsInverted =
    colorScheme === "dark" ? Colors.light : Colors.dark;

  return (
    <>
      {canUseCamera && (
        <CameraView
          style={styles.containerCamera}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["code128"],
          }}
        />
      )}

      <View
        style={[styles.closeCameraView, { backgroundColor: theme.secundary }]}
      >
        <AntDesign name="barcode" size={30} color="black" />
        <MyButton
          typeNavigator="back"
          title={canUseCamera ? "Fechar Câmera" : "Abrir Câmera"}
          handlePress={closeCBCamera}
          iconFeather={canUseCamera ? "camera-off" : "camera"}
        />
      </View>
      <View style={{ height: width / 10, marginTop: 5 }}>
        <TextInput
          editable={editCodeBar}
          placeholder={`Digite o código de barras`}
          onChange={(data) =>
            setItem({ ...item, barcode: data.nativeEvent.text })
          }
          value={item.barcode?.toString()}
          keyboardType="numeric"
          style={styles.input}
          enablesReturnKeyAutomatically={true}
          placeholderTextColor={theme.placeholder}
        />
        {item.barcode && (
          <Pressable
            style={{
              position: "absolute",
              top: 0,
              right: 20,
              zIndex: 1, // Para garantir que esteja na frente do TextInput
            }}
            onPress={() =>
              getPatrimonyByBarCode &&
              getPatrimonyByBarCode(item.barcode?.toString() || null)
            }
          >
            <AntDesign name="reload1" size={20} color="black" />
          </Pressable>
        )}
      </View>
    </>
  );
};

export default MyBarCode;

const styles = StyleSheet.create({
  containerCamera: {
    width: "100%",
    height: width / 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  closeCameraView: {
    height: 50,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 25,
  },
  input: {
    minWidth: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    marginBottom: 0,
    marginTop: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});
