import {
  View,  
  StyleSheet,
  TextInput,
  Keyboard,
  Dimensions,
  Pressable,
  useColorScheme,
  Platform,
  ViewStyle
 
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import CustomHeader from "@/src/components/CustomHeader";
import { useLocalSearchParams } from "expo-router";
import { Card } from "@rneui/themed";
import MyButton from "@/src/components/MyButton";
import Colors from "@/src/constants/Colors";
import MySelect from "@/src/components/inventario/MySelect";
import { getServerUrl } from "@/src/utils/conectionServer";
import axios from "axios";
import { Place } from "@/src/model/place";
import MyBarCode from "@/src/components/inventario/Mybarcode";
import { useSession } from "@/src/auth/ctx";
import { Product, ProductModel } from "@/src/model/products";
import AutocompleteInput from "react-native-autocomplete-input";
import MySearch from "@/src/components/inventario/MySearch";
import extractUserIdFromToken from "@/src/utils/extractDataToken";
import { Patrimony, PatrimonyModel } from "@/src/model/patrimony";
import { Item } from "@/src/model/item";
import { Property, PropertyModel } from "@/src/model/property";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Status } from "@/src/model/status";
const { width, height } = Dimensions.get("window");


const home = () => {
  const router = useRouter();

  const { session } = useSession();
  const colorScheme = useColorScheme() || "light";
  const theme = colorScheme === "light" ? Colors.dark : Colors.light;
  const themeColorsInverted =
    colorScheme === "dark" ? Colors.light : Colors.dark;
  const [selectedValue, setSelectedValue] = useState<Status | null>(null);
  const [names, setnames] = useState([] as Product[]);
  const params = useLocalSearchParams();
  const { nome, id } = params as Place | any;
  const [canUseCamera, setCanUseCamera] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [itemSearch, setItemSearch] = useState("");
  const [url_app, setUrl_app] = useState<any>("");
  const [item, setItem] = useState<Item>({
    patrimony_id: null,
    user_id: null,
    barcode: null,
    name: "",
    status: "Selecione uma opção",
    observation: "",
    found_place_id: id,
    produto_id: null,
    product_id: {
      id: null,
      name: "",
    },
  });
  const [canEditCodeBar, setCanEditCodeBar] = useState(true);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [oldPatrimony, setOldPatrimony] = useState<any>("");
  const [onSelectSearchItem, setOnSelectSearchItem] = useState("");
  //modal
  
  const [filteredNames, setFilteredNames] = useState([]);
  const [status, setStatus] = useState([] as Status[]);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    };

    async function getServerUrlAndItem() {
      try {
        if (session) {
          const urlData = await getServerUrl();
          setUrl_app(urlData.data);

          const response2 = await axios.get<Product | any>(
            urlData.data + "/products",
            {
              headers,
            }
          );
          if (response2.status === 200) {
            setnames(response2.data);

            //console.log(names);
          }
        } else {
          alert("Faça login para continuar");
        }
      } catch (error) {
        // Handle errors from getServerUrl or getItem
        console.error(`Error getting server URL or products: ${error}`);
      }
    }
    const getStatus = async () => {
      try {
        if (session) {
          const urlData = await getServerUrl();
          setUrl_app(urlData.data);

          const response = await axios.get<Status[] | any>(
            urlData.data + "/status",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.token}`,
              },
            }
          );
          if (response.status === 200) {
            setStatus(response.data);
            
          }
        }
      } catch (error) {
        console.error(`Error getting status: ${error}`);
      }
    };

    getStatus();
    getServerUrlAndItem();

    get_user_id();
  }, []);

  const get_user_id = async () => {
    if (session) {
      try {
        const sub_decode = await extractUserIdFromToken(
          session.token as string
        );
        const { user_id } = sub_decode as any;
        //console.log("user_id", user_id)
        setItem({ ...item, user_id: user_id });
      } catch (error) {
        console.error("Error getting user id:", error);
      }
    }
  };
  const searchItemControl = () => {
    if (item.name) {
      setOnSelectSearchItem("");
    }
  };

  const filterNames = (query: string, names: Product[]) => {
    const lowerCaseQuery = query.toLowerCase();
    return names.filter((name) =>
      name.name.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const onSelect = (status: Status) => {
    setItem({ ...item, status: status.name});
    setSelectedValue(status);
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
    setItem({ ...item, barcode: parseInt(data) });

    setScanned(true);
    setCanUseCamera(false);
    getPatrimony(data);
  };
  useEffect(() => {
    setItem({ ...item, name: onSelectSearchItem });
  }, [onSelectSearchItem]);

  const getPatrimony = async (barcode: string | null) => {
    try {
      if (url_app && session?.token && barcode) {
        const reponse = await axios.get<Patrimony>(
          url_app + "/patrimony/" + barcode,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.token}`,
            },
          }
        );
        if (reponse.status === 200) {
          setOnSelectSearchItem(
            reponse.data.product_id?.name ? reponse.data.product_id?.name : ""
          );
          if (reponse.data.product_id) {
            reponse.data.product_id;
            const product: Product = ProductModel.toJson(
              reponse.data.product_id
            );
            setItem({
              ...item,
              name: reponse.data.product_id?.name
                ? reponse.data.product_id?.name
                : "",
              status: reponse.data.status
                ? reponse.data.status
                : "Selecione uma opção",
              observation: reponse.data.observacao
                ? reponse.data.observacao
                : "",
              barcode: parseInt(barcode),
              product_id: product,
              produto_id: reponse.data.produto_id
                ? reponse.data.produto_id
                : null,
            });
          }

          setOldPatrimony(item);
          setCanEditCodeBar(false);
        }
      }
    } catch (error) {
      console.error(`Error getting patrimony: ${error}`);
    }
  };

  const insertProperty = async () => {
    if (item.name && item.found_place_id && item.user_id) {
      if (url_app && session?.token) {
        try {
          const url = url_app + "/property";
          const property = PropertyModel.toJsonCreate(item as Item);
          const response = await axios.post<Property>(url, property, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.token}`,
            },
          });
          if (response.status === 200) {
            //console.log("Property created");
            setTimeout(() => {
              router.replace(
                `/erroModal/?title=Sucesso&&id=${id}&&nome=${nome}` as any
              );
            }, 0);
          }
        } catch (error) {
          console.error(`Error inserting property: ${error}`);
          alert("Erro ao criar o Bem");
        } finally {
          clean_item();
          setItemSearch("");
          setOnSelectSearchItem("");
        }
      }
    }
  };
  const updatePatrimony = async () => {
    try {
      if (!canEditCodeBar) {
        if (
          item.name &&
          item.found_place_id &&
          item.user_id &&
          item.barcode &&
          item.product_id &&
          item.produto_id
        ) {
          if (url_app && session?.token) {
            const url = url_app + "/patrimony/" + item.barcode;

            item.product_id.name = item.name;
            const patrimony = PatrimonyModel.toJson(item);

            const response = await axios.put<Patrimony>(url, patrimony, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.token}`,
              },
            });
            if (response.status === 200) {
              //console.log("Patrimony updated");
              alert("Patrimônio atualizado com sucesso");
            } else {
              alert("Erro ao atualizar patrimônio");
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error updating patrimony: ${error}`);
    } finally {
      setCanEditCodeBar(true);
      setItemSearch("");

      setOnSelectSearchItem("");
      clean_item();
    }
  };
  const insertPatrimony = async () => {
    //console.log("insert patrimony entrou");
    if (url_app && session?.token && item.name && item.barcode ) {
      
      try {
        const url = url_app + "/patrimony";
        const patrimony = PatrimonyModel.toJsonCreate(item as Item);
        console.log(patrimony, "patrimony")
        const response = await axios.post<Patrimony>(url, patrimony, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
        });
        if (response.status === 200) {
          //console.log("Patrimony created");
          alert("Patrimônio criado com sucesso");
        }
      } catch (error) {
        console.error(`Error inserting patrimony: ${error}`);
        alert("Erro ao criar patrimônio");
      } finally {
        clean_item();
        setItemSearch("");
        setOnSelectSearchItem("");
      }
    }
  };

  const clean_item = () => {
    setItem({
      ...item,
      barcode: null,
      name: "",
      status: "Selecione uma opção",
      observation: "",
    });
  };

  const handleAdd = () => {
    
    if (canEditCodeBar && item.barcode) {
      insertPatrimony();
    } else if (canEditCodeBar && !item.barcode) {
      insertProperty();
    } else {
      updatePatrimony();
    }
  };


  return (
    <View  
      style={styles.container}
    >
      
        <CustomHeader title={nome ? nome : ""} typeNavigator="back" />
        <Pressable onPress={() => Keyboard.dismiss()}>
        <Card containerStyle={styles.containerCard}>
          <Card.Title style={styles.title}>Código de Barras:</Card.Title>

          <View style={styles.containerCard}>
            <MyBarCode
              getPatrimonyByBarCode={getPatrimony}
              canUseCamera={canUseCamera}
              handleBarCodeScanned={handleBarCodeScanned}
              closeCBCamera={closeCBCamera}
              setItem={setItem}
              editCodeBar={canEditCodeBar}
              item={item}
            />

            <View style={{ height: width / 10, marginTop: 5 }}>
              <Card.Title style={styles.title2}>Item:</Card.Title>
            </View>
            {Platform.OS === 'android' ?(<View>
            <View style={styles.autoCompleteCssAndroid}>
            <AutocompleteInput
              onPressIn={() => setIsActiveSearch(true)}
              placeholderTextColor={theme.placeholder}
              placeholder="Digite o nome do item"
              value={onSelectSearchItem ? onSelectSearchItem : itemSearch}
              data={filteredNames}
              hideResults={
                onSelectSearchItem || itemSearch.length <= 1 ? true : false
              }
              onChangeText={(text) => {
                if (text.length > 1) {
                  const filtered = filterNames(text, names);
                  setFilteredNames(filtered as any);
                }

                searchItemControl();
                setItemSearch(text);
                setItem({
                  ...item,
                  name: onSelectSearchItem ? onSelectSearchItem : text,
                });
              }}
              flatListProps={{
                initialNumToRender: 10,

                style: {
                  margin:1,
                  backgroundColor: "#fffff0",
                  height: width / 3,
                  borderWidth: 0,
                  borderRadius: 5,
                  marginTop: 5,
                  marginBottom: 5,
                  width: width - 20,
                  alignSelf: "center",
                },
                scrollEnabled: true,
                onMagicTap: () => Keyboard.dismiss(),
                keyExtractor: (item: Product) =>
                  item.id ? item.id.toString() : "",
                renderItem: ({ item }) => (
                  <MySearch
                    item={item}
                    setOnSelectSearchItem={setOnSelectSearchItem}
                  />
                ),
              }}
              containerStyle={styles.autocompleteContainer}
              inputContainerStyle={styles.autocompleteInputContainer}
              
              style={[styles.input, { backgroundColor: "#fffff0" }]}
              clearButtonMode="always"
            />
            </View>
            </View>
            ):(
              <AutocompleteInput
              onPressIn={() => setIsActiveSearch(true)}
              placeholderTextColor={theme.placeholder}
              placeholder="Digite o nome do item"
              value={onSelectSearchItem ? onSelectSearchItem : itemSearch}
              data={filteredNames}
              hideResults={
                onSelectSearchItem || itemSearch.length <= 1 ? true : false
              }
              onChangeText={(text) => {
                if (text.length > 1) {
                  const filtered = filterNames(text, names);
                  setFilteredNames(filtered as any);
                }

                searchItemControl();
                setItemSearch(text);
                setItem({
                  ...item,
                  name: onSelectSearchItem ? onSelectSearchItem : text,
                });
              }}
              flatListProps={{
                initialNumToRender: 10,

                style: {
                  margin:1,
                  backgroundColor: "#fffff0",
                  height: width / 3,
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 5,
                  marginTop: 5,
                  marginBottom: 5,
                  width: width - 20,
                  alignSelf: "center",
                },
                scrollEnabled: true,
                onMagicTap: () => Keyboard.dismiss(),
                keyExtractor: (item: Product) =>
                  item.id ? item.id.toString() : "",
                renderItem: ({ item }) => (
                  <MySearch
                    item={item}
                    setOnSelectSearchItem={setOnSelectSearchItem}
                  />
                ),
              }}
              containerStyle={styles.autocompleteContainer}
              inputContainerStyle={styles.autocompleteInputContainer}
              
              style={[styles.input, { backgroundColor: "#fffff0" }]}
              clearButtonMode="always"
            />
            )}
            <View
              style={{
                height: width / 10,
                marginTop: Platform.OS === "android" ? width / 9 : width/22,
              }}
            >
              <Card.Title style={styles.title2}>Status:</Card.Title>
            </View>
            
  <MySelect
     // Safe access for initial value
    data={status}
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
              {
                <MyButton
                  typeNavigator="back"
                  title="Limpar Campos"
                  handlePress={() => {
                    setCanEditCodeBar(true);
                    setItemSearch("");

                    setOnSelectSearchItem("");
                    setItem({
                      ...item,
                      barcode: null,
                      name: "",
                      status: "Selecione uma opção",
                      observation: "",
                    });
                  }}
                  icon={"pluscircleo"}
                />
              }
              <MyButton
                typeNavigator="back"
                style={{ backgroundColor: theme.primary }}
                styleText={themeColorsInverted.text}
                iconColor={themeColorsInverted.text}
                title={canEditCodeBar ? "Salvar" : "Alterar"}
                handlePress={handleAdd}
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
    flex: 1,
    minHeight: height,
    backgroundColor: "#fffff0",
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
    height: width / 10,

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
    height: 40,
    margin: 10,
    marginBottom: 0,
    marginTop: 0,
    minWidth: 200,
    width: "100%",
    alignSelf: "center",
  },
  autocompleteInputContainer: {
    borderWidth: 0,
    marginBottom: 0,
    marginTop: 0,
  },
  autocompleteListContainer: {
    borderColor: "gray",
    borderWidth: 1,
    minHeight: 100,
  },
  autoCompleteCssAndroid:{
    position: Platform.OS === 'android' ? 'absolute' : undefined, 
    backgroundColor : Platform.OS === 'android' ? '#fffff0' : '#fffff0',

    zIndex : Platform.OS === 'android' ? 1 : 1,  
    transform : Platform.OS === 'ios' ? 'translate3d(0, 0, 0)' : undefined,
    flex : Platform.OS === 'ios' ? 1 : undefined,
    width: '100%',
    borderColor: "gray",    
    borderBottomWidth:1
  }
});
