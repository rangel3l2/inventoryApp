import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Dimensions,
  Pressable,
  useColorScheme,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import CustomHeader from "@/src/components/CustomHeader";
import { useLocalSearchParams } from "expo-router";
import { departamentos } from "../mockedData/Departamentos";
import { Card } from "@rneui/themed";
import MyButton from "@/src/components/MyButton";
import { Camera, CameraView } from "expo-camera/next";
import Colors from "@/constants/Colors";
import MySelect from "@/src/components/inventario/MySelect";

const { width, height } = Dimensions.get("window");

type data = {
  key: number;
  label: string;
};

const data = [
  { key: 1, label: 'Opção 1' },
  { key: 2, label: 'Opção 2' },
  { key: 3, label: 'Opção 3' },
];

const home = () => {
  // Get color scheme and derive text color
  const colorScheme = useColorScheme() || "light";
  const theme = colorScheme === "light" ? Colors.dark : Colors.light;
  const [selectedValue, setSelectedValue] = useState<data | null>(null);
  const [name, setname] = useState("");
  const params = useLocalSearchParams();
  const departamento = parseInt(params.departamento as string);
  useEffect(() => {
    departamentos.find((item) => {
      if (departamento === item.id) {
        setname(item.nome.toString());
      }
    });
  });
  const onSelect = (data : data) => {
    console.log(data);
    setSelectedValue(data);
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <CustomHeader title={name ? name : ""} typeNavigator="back" />

        <Card containerStyle={styles.containerCard}>
          <Card.Title style={styles.title}>Código de Barras:</Card.Title>

          <View style={styles.containerCard}>
            <CameraView
              style={styles.containerCamera}
              onBarcodeScanned={(data) => {
                console.log(data.data);
              }}
              barcodeScannerSettings={{
                barcodeTypes: ["code128"],
              }}
            />
            <View
              style={[
                styles.closeCameraView,
                { backgroundColor: theme.secundary },
              ]}
            >
              <AntDesign name="barcode" size={30} color="black" />
              <MyButton typeNavigator="back" title="Fechar leitor CB" />
            </View>
            <TextInput
              placeholder="Digite o código de barras"
              keyboardType="numeric"
              style={styles.input}
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={theme.placeholder}
            />
            <View style={{ height: width / 10, marginTop: 5 }}>
              <Card.Title style={styles.title2}>Item:</Card.Title>
            </View>
            <TextInput
              placeholder="Digite o nome do item"
              style={styles.input}
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={theme.placeholder}
            />

            <View style={{ height: width / 10, marginTop: 5 }}>
              <Card.Title style={styles.title2}>Status:</Card.Title>
            </View>
            <MySelect
            label= {data[0].label}
            data={data}
            onSelect={onSelect}
            initialValue="Selecione uma opção"

         // Passar o array de opções diretamente
            />
            <View style={{ height: width / 10, marginTop: 5 }}>
              <Card.Title style={styles.title2}>Observação:</Card.Title>
            </View>
            <TextInput
              placeholder="Digite sua observação"
              style={styles.input}
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={theme.placeholder}
            />
            <View style={styles.menuButtonContainer}>
              <MyButton typeNavigator="back" title="Adicionar Novo Item" />
              <MyButton typeNavigator="back" title="Enviar" />
            </View>
          </View>

          <Card.Divider />
        </Card>
      </Pressable>
    </View>
  );
};

export default home;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    minHeight: height,
  },
  containerCard: {
    backgroundColor: "#fffff0",
    alignContent: "center",
    flex: 1,
    height: height,
    width: width,
    flexDirection: "column",
    margin: 0,
    padding: 0,
  },
  containerCamera: {
    width: "100%",
    height: width / 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  title: {
    alignSelf: "flex-start",
    padding: 10,
    paddingBottom: 0,
    marginBottom: 2,
    marginLeft: 10,
  },
  title2: {
    alignSelf: "flex-start",
    padding: 5,
    paddingBottom: 0,
    marginBottom: 2,
    marginLeft: 10,
  },

  button: {
    width: "50%",
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
  menuButtonContainer: {
    marginTop: width / 10,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
  },
});
