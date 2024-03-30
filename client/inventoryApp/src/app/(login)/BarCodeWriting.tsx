import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSession } from "@/src/auth/ctx";
import { useColorScheme } from "@/src/components/useColorScheme";
import Colors from "@/src/constants/Colors";
import MyButton from "@/src/components/MyButton";
import { Redirect, useRouter } from "expo-router";
import CustomHeader from "@/src/components/CustomHeader";
const MyParams = {
  title: "Error",
  screen: "/(login)/BarCodeWriting",
};
export default function BarcodeLogin() {
  const navigation = useRouter();
  const [barcode, setBarcode] = useState("");
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"] || Colors.light;
  const handlePress = () => {
   
    if (barcode.length<=1 || barcode.length === 13) {
      navigation.replace(`/(login)/errorModal?title=Esse campo de ter código de barra válido` as any);
    }else{
      navigation.replace(`(login)/keepSessionModal?barcode=${barcode}` as any);
    }
 

  }

  return (
    <>
      <CustomHeader
        title="Codigo de Barras"
        backTitle="Início"
        typeNavigator="replace"
        route={"/"}
      />

      <View style={[styles.container, {}]}>
      
          
           <TextInput
              style={styles.input}
              placeholder="Digite o código de barras"
              onChangeText={(text) => setBarcode(text)}
              keyboardType="numeric"
              value={barcode}
            />
            <MyButton
              icon={"login"}
              title={"Entrar"}
              handlePress={handlePress}             
              typeNavigator="replace"
            />
        
      
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    minWidth: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
