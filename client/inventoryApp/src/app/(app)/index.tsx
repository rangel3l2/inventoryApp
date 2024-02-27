  import { Stack, useNavigation, useRouter } from "expo-router";
  import { useEffect, useState } from "react";
  import { Text, View, StyleSheet } from "react-native";
  import RadioButton from "@/src/components/RadioButton";
  import { Departamento, departamentos } from "../mockedData/Departamentos";
  import { FlashList } from "@shopify/flash-list";
  import { useColorScheme } from '@/src/components/useColorScheme';
  import Colors from "@/constants/Colors";


  export default function Home() {
    const route = useRouter();
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const navigation = useNavigation();
    const colorScheme = useColorScheme()
    const themeColors = Colors[colorScheme ?? 'light'] || Colors.light;
  const handleSelect =  (id : any ) => {
  
    setSelectedDepartmentId(id);
    setTimeout(() => {
      route.push({pathname: '/(components)/confirmationModal', params: {departamento: id, title : 'Confirmar Local'}});
    },300);

    
  };
    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
      <View style={[styles.container,{backgroundColor: themeColors.primary}]}>
        <Text style={styles.title}>Selecione Local:</Text>
      
        <View style = {styles.FlashList}>
          <FlashList
            data={departamentos}
            keyExtractor={(item : any) => item.id}
            estimatedItemSize={50}
            renderItem={({ item }) => (
              <RadioButton
                label={item.nome}
                value={item.id}
                selected={item.id === selectedDepartmentId}
                
                onSelect={handleSelect}
              />
            )}
          />
        </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      paddingTop:20,
      gap: 20,
      flex: 1,
      alignItems: "center",
      
  
  
    },
    FlashList:{
      borderRadius:20,
      backgroundColor: '#fff',
      flex:1,
      width:'80%',
      height:'100%',
    },
    title:{
      fontSize:25,
      
    }
  });
