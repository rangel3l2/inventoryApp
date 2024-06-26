import React, { useContext, useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import  MyButton  from "@/src/components/MyButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { useSession } from "@/src/auth/ctx";
import { useKeepSession } from "@/src/context/keepSessionContext";
const KeepSessionModal: FC<any> = ({ route }) => {

  const { setSession, signOut , signIn } = useSession(); 
  const {setKeepSession } = useKeepSession(); 
  const params = useLocalSearchParams();

  const navigation = useRouter();
  const title = params.title as string;
  const barcode = params.barcode as string;
  const [refreshing, setRefreshing] = useState(false);

  

  const handleSignIn = async () => {
    try {
      setRefreshing(true);
      
      
      const result = await signIn(barcode);

      if (result.success) {
        console.log(
          "Autenticação bem-sucedida. Nome de usuário:",

          result.success         
          
        );
        
        
      
      } else {
        navigation.replace(
        `/(login)/errorModal?title=Error&&message=${result.error}` as any    
        );
      }
    } catch (error) {
      console.log("Erro ao tentar fazer login com o código de barras", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleParentPress = () => {
    setSession(null);    
    navigation.replace({
      pathname: "/",
    });
   
    // Clear session on "Parent" press

  };

  const handleSimPress = () => {
  
    handleSignIn()
    setTimeout(() => {
      setKeepSession(true);
    },5)
  
    ; // Set "keepSession" to true on "Sim" press
  
  };

  const handleNaoPress = () => {
    setKeepSession(false);
    handleSignIn()
   
  };

  return (
  <>
  {refreshing ? (
    
    <View style={styles.ActivityIndicator}>
    <Text style={styles.localText}>Carregando ...</Text>
    <ActivityIndicator size="large" color="#0000ff" />
    </View>
     
  ) : (
    <Pressable style={styles.container} onPress={handleParentPress}>
      {({ pressed }) => (
        <View style={styles.modal}>
          <Text style={styles.title}>{title ? title : "Você deseja manter a sessão ativa depois de entrar?"}</Text>
          <View style={{ gap: 20 }}>
            <MyButton
              icon={"rightcircle"}
              title="Sim"
              handlePress={handleSimPress} // Use onPress for button action
              typeNavigator='replace'
            />
            <MyButton
              
              icon={"leftcircle"}
              title="Não"
              handlePress={handleNaoPress} // Use onPress for button action
              typeNavigator='replace'
            />
          </View>
        </View>
      )}
    </Pressable>
  )}

</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  localText: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: "bold",
  },
  modal: {
    alignItems: "center",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ActivityIndicator:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    
  }
});

export default KeepSessionModal;
