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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const { width, height } = Dimensions.get("window");

type data = {
  key: number;
  label: string;
};

const data = [
  { key: 1, label: "Devolvido" },
  { key: 2, label: "Não encontrado" },
  { key: 3, label: "Com defeito" },
];

const home = () => {
 
  const colorScheme = useColorScheme() || "light";
  const theme = colorScheme === "light" ? Colors.dark : Colors.light;
  const themeColorsInverted =
    colorScheme === "dark" ? Colors.light : Colors.dark;
  const [selectedValue, setSelectedValue] = useState<data | null>(null);
  const [name, setname] = useState("");
  const params = useLocalSearchParams();
  const departamento = parseInt(params.departamento as string);
  const [canUseCamera, setCanUseCamera] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [item, setItem] = useState({
    barcode: "",
    name: "",
    status: "Selecione uma opção",
    observation: "",
  });
  
  useEffect(() => {
    departamentos.find((item) => {
      if (departamento === item.id) {
        setname(item.nome.toString());
      }
    });
  });
  const onSelect = (data: data) => {
    setItem({...item, status:data.label})    
    setSelectedValue(data);
  };
  const closeCBCamera = () =>{
    setCanUseCamera(!canUseCamera?true:false)

  }
  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setItem({...item, barcode:data});
   setScanned(true);
   setCanUseCamera(false);
   
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <CustomHeader title={name ? name : ""} typeNavigator="back" />

        <Card containerStyle={styles.containerCard}>
          <Card.Title style={styles.title}>Código de Barras:</Card.Title>

          <View style={styles.containerCard}>
            {canUseCamera&&<CameraView
              
              style={styles.containerCamera}
              onBarcodeScanned={handleBarCodeScanned}
              
              barcodeScannerSettings={{
                barcodeTypes: ["code128"],
              }}
              
            />}
            
            <View
              style={[
                styles.closeCameraView,
                { backgroundColor: theme.secundary },
              ]}
            >
              <AntDesign name="barcode" size={30} color="black" />
              <MyButton 
                typeNavigator="back"
                title={canUseCamera?"Fechar Câmera":"Abrir Câmera"} 
                handlePress={closeCBCamera}
                iconFeather={canUseCamera?'camera-off':'camera'}/>
            </View>
            <View style={{ height: width / 10, marginTop: 5 }}>
              
            <TextInput
              
              placeholder={`Digite o código de barras`}
              onChange={(data)=>setItem({...item, barcode:data.nativeEvent.text})}
              value={item.barcode}
              keyboardType="numeric"
              style={styles.input}
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={theme.placeholder}
            />
             <Pressable
            style={{
              position: 'absolute',
              top: 0,
              right: 20,
              zIndex: 1, // Para garantir que esteja na frente do TextInput
            }}
            onPress={() => console.log('chamando dados')}
          >
            <AntDesign name="reload1" size={20} color="black" />
          </Pressable>
          </View>
            <View style={{ height: width / 10, marginTop: 5 }}>
              <Card.Title style={styles.title2}>Item:</Card.Title>
            </View>
            <TextInput
              value={item.name}
              placeholder="Digite o nome do item"
              style={styles.input}
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={theme.placeholder}
              onChange={(data)=>setItem({...item, name:data.nativeEvent.text})}
            />

            <View style={{ height: width / 10, marginTop: 5 }}>
              <Card.Title style={styles.title2}>Status:</Card.Title>
            </View>
            <MySelect
            
              label={data[0].label}
              data={data}
            
              onSelect={onSelect}
              initialValue={item.status}

              // Passar o array de opções diretamente
            />
            <View style={{ height: width / 10, marginTop: 5 }}>
              <Card.Title style={styles.title2}>Observação:</Card.Title>
            </View>
            <TextInput
              placeholder="Digite sua observação"
              value={item.observation}
              style={styles.input}
              enablesReturnKeyAutomatically={true}
              placeholderTextColor={theme.placeholder}
              onChange={(data)=>setItem({...item, observation:data.nativeEvent.text})}
            />
            <View style={styles.menuButtonContainer}>
              <MyButton
                typeNavigator="back"
                title="Adicionar Novo Item"
                handlePress={() => setItem({barcode:"",name:"",status:"Selecione uma opção",observation:""})}
                icon={"pluscircleo"}
              />
              <MyButton
                typeNavigator="back"
                style={{ backgroundColor: theme.primary }}
                styleText={themeColorsInverted.text}
                iconColor={themeColorsInverted.text}
                title="Enviar"
                handlePress={() => console.log(item)}
                icon={"save"}
              />
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
    marginTop: width / 12,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
  },
});
