import { View, Text, Pressable, StyleSheet, Dimensions, Modal, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useSession } from "@/src/auth/ctx";
import { useRouter } from "expo-router";
import MyButton from "@/src/components/MyButton";
import extractUserIdFromToken from "@/src/utils/extractDataToken";
import Mycard from "@/src/components/Profile/Mycard";
import CustomHeader from "@/src/components/CustomHeader";
import Colors from "@/src/constants/Colors";
import * as MailComposer from 'expo-mail-composer';


import { useColorScheme } from "@/src/components/useColorScheme";
const { width, height } = Dimensions.get("window");
type Profile = {
  name: string;
  role: string;
};
const Profile = () => {
  const navigation = useRouter();
  const { signOut, session } = useSession();
  const [extractData, setExtractData] = React.useState<Profile | null>(null);
  const [email, setEmail] = useState('rangel.silva@estudante.ifms.edu.br');
  const  [isEditing, setIsEditing] = useState(false);
    const mailOptions : MailComposer.MailComposerOptions = {
      
      recipients: [email],
      subject: '',
      body: 'Mensagem do email',
    };
  

  const handleEmail=()=>{
    setIsEditing(true);
    MailComposer.composeAsync(mailOptions).then((e) => {    
      console.log("verficar status",e.status)      
      e.status === 'cancelled' && console.log('Email cancelado');
      e.status === 'saved' && alert('Email salvo');
      console.log('Email enviado com sucesso');
    }).catch((error) => {
      console.log('Erro ao enviar email')
      console.error(error);
    });
  
  }
  
  const handleTermsOfUse=()=>{
    navigation.push('/(app)/profile/termsOfUse/');

  }
  const handleAboutUs=()=>{
    navigation.push('/(app)/profile/aboutUs/');

  }
  const handlePrivacy=()=>{
    navigation.push('/(app)/profile/privacyPolitics/');

  }
  const handleRateUs=()=>{
    navigation.push('/(app)/profile/rateUs/');

  } 
  useEffect(() => {
    get_user_id();
  }, []);
  const get_user_id = async () => {
    if (session) {
      try {
        const sub_decode = await extractUserIdFromToken(
          session.token as string
        );
        const { user_id, name, role } = sub_decode as any;
        setExtractData({ name, role });
      } catch (error) {
        console.error("Error getting user id:", error);
      }
    }
  };
  const colorScheme = useColorScheme()
  const themeColors = Colors[colorScheme ?? 'light'] || Colors.light;
  const colorText = colorScheme === 'light' ? Colors.dark.text : Colors.light.text;
  const handleSignOut = () => {
    signOut();
  };
  return (
    <View style={[styles.container, {}]}
    >
      <CustomHeader title="Perfil" typeNavigator="back" />
   

      <Mycard name={extractData?.name} role={extractData?.role} />
      <Mycard email={email} setEmail={setEmail} handlePress={handleEmail}  title="Suporte por Email"/>      
      <Mycard  title="Avalie-nos" handlePress={handleRateUs}/>
      <Mycard  title="Termos de uso" handlePress={handleTermsOfUse}/>
      <Mycard  title="Política de privacidade" handlePress={handlePrivacy}/>
      <Mycard  title="Sobre" handlePress={handleAboutUs}/>
      <View>
      <Text style={[styles.textFooter,{color: colorText}]}>Desenvolvido por: Rangel Gomes</Text>
      </View>
      <View style={{ maxHeight:width/6}}>
      <MyButton
        style={{ position: 'relative', marginTop: 'auto', marginBottom: 20}}
        handlePress={handleSignOut}
        title={"Sair"}
        typeNavigator="replace"
        icon={"logout"}
      />
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
   justifyContent: "flex-start",
   
   alignItems: "center",
  },
  contentCard:{    
    width: "100%",
    alignItems: "center",    
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textFooter:{
    fontFamily:'RobotoRegular',
 

  }
});
