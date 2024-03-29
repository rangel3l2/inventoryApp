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
import Colors from "@/constants/Colors";
import MyButton from "@/src/components/MyButton";
import { useRouter } from "expo-router";
import CustomHeader from "@/src/components/CustomHeader";
const MyParams = {
  title: "Error",
  screen: "/(login)/BarCodeWriting",
};
export default function BarcodeLogin() {
  const navigation = useRouter();
  const [barcode, setBarcode] = useState("");
  const { signIn, session } = useSession();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"] || Colors.light;


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
              route={`(login)/keepSessionModal?barcode=${barcode}`}
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
