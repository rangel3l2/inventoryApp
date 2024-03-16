import { Stack, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { FlashList } from "@shopify/flash-list";
import { useColorScheme } from "@/src/components/useColorScheme";
import Colors from "@/constants/Colors";
import CustomRadioButton from "@/src/components/CustomRadioButton";
import { getServerUrl } from "@/src/utils/conectionServer";
import axios, { AxiosResponse } from "axios";
import { Place } from "@/src/model/place";
import { useSession } from "@/src/auth/ctx";
export default function Home() {
  const [value, setValue] = useState<Place>();
  const route = useRouter();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"] || Colors.light;
  const [places, setPlaces] = useState<Promise<AxiosResponse<Place[], any>>>();
  const [url, setUrl] = useState<string | undefined>("");
  const { session } = useSession();

  const handleSelect = (item : Place) => {
    if (places) {     
      setValue(item);
     

      route.push(
        `/(components)/confirmationModal?title=Confimar Local&&nome=${item.nome}&&id=${item.id}` as any
      );
    }
  };
  useEffect(() => {
    const fetchDataURL = async () => {
      try {
        // Obter a lista de IPs do Pastebin
        const response = await axios.get("https://pastebin.com/raw/EdBLxG4p");

        if (response.status !== 200) {
          throw new Error("Erro ao buscar os IPs");
        } else {
          if (response) {
            setUrl(response.data);
          }
        }
      } catch (error) {
        console.error("Erro a receber dados", error);
        throw error;
      }
    };
    fetchDataURL();
  }),
    [];

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    };
    const fechDataPlaces = async () => {
      try {
       
        if (url) {
          const response2 = await axios.get<Place | any>(url + "/places", {
            headers,
          });
          if (response2.status !== 200) {
            throw new Error("Erro ao buscar places");
          } else {
           
            setPlaces(response2.data);
          }
        }
      } catch (error) {
        console.error("Erro a receber dados", error);
        throw error;
      }
    };
    fechDataPlaces();
  }, [url]);
 
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.primary }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>
        Selecione Local:
      </Text>

      {places && (
        <View style={styles.FlashList}>
          <FlashList
            data={places as any}
            keyExtractor={(item: Place) => item.id.toString()}
            estimatedItemSize={50}
            renderItem={({ item}) => (
              <CustomRadioButton
                item={item}
                value={item.id.toString()}
                onSelect={handleSelect}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    gap: 20,
    flex: 1,
    alignItems: "center",
  },
  FlashList: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fffff0",
    flex: 1,
    width: "80%",
    height: "100%",
  },
  title: {
    fontSize: 25,
  },
});
