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
  import { Card } from "@rneui/themed";
  import MyButton from "@/src/components/MyButton";
  import Colors from "@/constants/Colors";
  import MySelect from "@/src/components/inventario/MySelect";
  import { getServerUrl } from "@/src/utils/conectionServer";
  import axios from "axios";
  import { Place } from "@/src/model/place";
  import MyBarCode from "@/src/components/inventario/Mybarcode";
  import { useSession } from "@/src/auth/ctx";
  import { Product } from "@/src/model/products";
  import AutocompleteInput from "react-native-autocomplete-input";
  
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
    const { session } = useSession();
    const colorScheme = useColorScheme() || "light";
    const theme = colorScheme === "light" ? Colors.dark : Colors.light;
    const themeColorsInverted =
      colorScheme === "dark" ? Colors.light : Colors.dark;
    const [selectedValue, setSelectedValue] = useState<data | null>(null);
    const [names, setnames] = useState([] as Product[]);
    const params = useLocalSearchParams();
    const { nome, id } = params as Place | any;
    const [canUseCamera, setCanUseCamera] = useState(true);
    const [scanned, setScanned] = useState(false);
    const [item, setItem] = useState({
      barcode: "",
      name: "",
      status: "Selecione uma opção",
      observation: "",
    });
  
    const [filteredNames, setFilteredNames] = useState([]);
  
    useEffect(() => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      };
  
      async function getServerUrlAndItem() {
        try {
          const urlData = await getServerUrl();
          console.log(urlData.data);
          const response2 = await axios.get<Product | any>(
            urlData.data + "/products",
            {
              headers,
            }
          );
          if (response2.status === 200) {
            setnames(response2.data);
            console.log(names);
          }
        } catch (error) {
          // Handle errors from getServerUrl or getItem
          console.error(error);
        }
      }
  
      getServerUrlAndItem();
    }, []);
  
    const filterNames = (query : any, names: Product[]) => {
      const lowerCaseQuery = query.toLowerCase();
      return names.filter((name) =>
        name.nome.toLowerCase().includes(lowerCaseQuery)
      );
    };
  
    const onSelect = (data: data) => {
      setItem({ ...item, status: data.label });
      setSelectedValue(data);
    };
    const closeCBCamera = () => {
      setCanUseCamera(!canUseCamera ? true : false);
    };
    const handleBarCodeScanned = ({
      type,
      data,
    }: {
      type: string;
      data: string;
    }) => {
      setItem({ ...item, barcode: data });
      setScanned(true);
      setCanUseCamera(false);
    };
    return (
      <View style={styles.container}>
        <Pressable onPress={() => Keyboard.dismiss()}>
          <CustomHeader title={nome ? nome : ""} typeNavigator="back" />
  
          <Card containerStyle={styles.containerCard}>
            <Card.Title style={styles.title}>Código de Barras:</Card.Title>
  
            <View style={styles.containerCard}>
              <MyBarCode
                canUseCamera={canUseCamera}
                handleBarCodeScanned={handleBarCodeScanned}
                closeCBCamera={closeCBCamera}
                setItem={setItem}
                item={item}
              />
              <View style={{ height: width / 10, marginTop: 5 }}>
                <Card.Title style={styles.title2}>Item:</Card.Title>{" "}
              </View>
              <AutocompleteInput
                placeholder="Digite o nome do item"
                value={item.name}
                data={filteredNames}
                onChangeText={(text) => {
                  const filtered = filterNames(text, names);
                  setItem({ ...item, name: text });
                  setFilteredNames(filtered as any);
                }}
                flatListProps={{
                  keyExtractor: (item : any) => item.id.toString(),
                  renderItem: ({ item }) => (
                    <Text style={styles.itemText}>{item}</Text>
                  ),
                }}
                containerStyle={styles.autocompleteContainer}
                inputContainerStyle={styles.autocompleteInputContainer}
                listContainerStyle={styles.autocompleteListContainer}
                clearButtonMode="always"
              />
              <View style={{ height: width / 10, marginTop: 5 }}>
                <Card.Title style={styles.title2}>Status:</Card.Title>
              </View>
              <MySelect
                label={data[0].label}
                data={data}
                onSelect={onSelect}
                initialValue={item.status}
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
                onChange={(data) =>
                  setItem({ ...item, observation: data.nativeEvent.text })
                }
              />
              <View style={styles.menuButtonContainer}>
                <MyButton
                  typeNavigator="back"
                  title="Adicionar Novo Item"
                  handlePress={() =>
                    setItem({
                      barcode: "",
                      name: "",
                      status: "Selecione uma opção",
                      observation: "",
                    })
                  }
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
  
    menuButtonContainer: {
      marginTop: width / 12,
      flexDirection: "row",
      justifyContent: "space-around",
      height: 50,
    },
    autocompleteContainer: {
      width: "80%",
      height: 40,
      margin: 10,
      marginBottom: 0,
      marginTop: 0,
    },
    autocompleteInputContainer: {
      borderColor: "gray",
      borderWidth: 1,
      height: 40,
    },
    autocompleteListContainer: {
      borderColor: "gray",
      borderWidth: 1,
      height: 100,
    },
    itemText: {
      margin: 2,
      padding: 2,
      fontSize: 15,
    },
  
  
  });
  