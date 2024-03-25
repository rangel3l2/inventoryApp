import { Stack, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Dimensions
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useColorScheme } from "@/src/components/useColorScheme";
import Colors from "@/constants/Colors";
import CustomRadioButton from "@/src/components/CustomRadioButton";
import { getServerUrl } from "@/src/utils/conectionServer";
import axios, { AxiosResponse } from "axios";
import { Place } from "@/src/model/place";
import { useSession } from "@/src/auth/ctx";
const { width, height } = Dimensions.get("window");
export default function Home() {
  const [value, setValue] = useState<Place>();
  const route = useRouter();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"] || Colors.light;
  const [places, setPlaces] = useState<Promise<AxiosResponse<Place[], any>>>();
  const [url, setUrl] = useState<string | undefined>("");
  const { session } = useSession();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSelect = (item: Place) => {
    if (places) {
      setValue(item);

      route.push(
        `/(components)/confirmationModal?title=Confimar Local&&nome=${item.nome}&&id=${item.id}` as any
      );
    }
  };
  useEffect(() => {
    fetchDataURL();
  }),
    [];

  useEffect(() => {
    fetchDataPlaces();
  }, [url]);
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
     
      console.error("Erro a receber dados url", error);
      throw error;
    }
    finally{
      console.log("url", url);
    }
   
  };
  const fetchDataPlaces = async () => {

    if (session?.token) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      };
      try {
    
        if (url) {
          const final_url = `${url}/places`;
          const final_url_str = final_url.trim();
          console.log("final_url_str", final_url_str);
          setLoading(true);
          const response2 = await axios.get<Place | any>(final_url_str, {
            headers,
          });
          if (response2.status !== 200) {
            throw new Error("Erro ao buscar places");
          } else {
            setPlaces(response2.data);
          }
        }
      } catch (error) {
        
        alert("Erro ao buscar places");
        console.error("Erro a receber dados", error);
        throw error;
      } finally {
        
        setLoading(false)
      }
    }
  };
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const RenderData = () => {
    return (
      <View style={{  flex: 1,        
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
       
        padding: 10,}}>
        <Text style={[styles.title, { color: themeColors.text }]}>
          Selecione Local:
        </Text>

        {places && (
          <View style={styles.FlashList}>
            <FlashList
              data={places as any}
              keyExtractor={(item: Place) => item.id.toString()}
              estimatedItemSize={50}
              renderItem={({ item }) => (
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
  };
  const data = [
    {
      component: <RenderData />,
    },
  ];
  return (
     
    <View style={[styles.container, { backgroundColor: themeColors.primary }]}>
{loading ? (
  <View style={styles.loading}>
  <ActivityIndicator size="large" color="#0000ff" />
</View>
) : (
  <>
    <FlashList
      data={data}
      renderItem={({ item }) => item.component}
      estimatedItemSize={1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchDataPlaces} />
      }
    />
    {refreshing && <ActivityIndicator color={'#000000'} />}
  </>
)}

    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 20,
    gap: 20,
    flex: 1,
    
  },
  FlashList: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fffff0",
    flex: 1,
    minWidth: width - width / 5,
    minHeight: 200,
  },
  title: {
    fontSize: 25,
  },
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
