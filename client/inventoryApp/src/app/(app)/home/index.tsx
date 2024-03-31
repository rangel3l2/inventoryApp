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
import Colors from "@/src/constants/Colors";
import CustomRadioButton from "@/src/components/CustomRadioButton";
import { getServerUrl } from "@/src/utils/conectionServer";
import axios, { AxiosResponse } from "axios";
import { Place } from "@/src/model/place";
import { useSession } from "@/src/auth/ctx";

import { useGetAllPlaces } from "@/src/services/placeService";
const { width, height } = Dimensions.get("window");


export default function Home() {
  const [value, setValue] = useState<Place>();
  const route = useRouter();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"] || Colors.light;
  //const [places, setPlaces] = useState<Promise<AxiosResponse<Place[], any>>>();
  const [url, setUrl] = useState<string | undefined>("");
  const { session } = useSession();
  const [refreshing, setRefreshing] = useState(false);

 
  const {places, loading, refetch} = useGetAllPlaces();
  const handleSelect = (item: Place) => {
    if (places) {
      setValue(item);

      route.push(
        `/(components)/confirmationModal?title=Confimar Local&&nome=${item.nome}&&id=${item.id}` as any
      );
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
        <Text style={[styles.title, { color: themeColors.text, fontFamily:'RobotoRegular' }]}>
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
        <RefreshControl refreshing={refreshing} onRefresh={refetch} />
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
