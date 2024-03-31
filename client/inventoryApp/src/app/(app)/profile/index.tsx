import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { useSession } from "@/src/auth/ctx";
import { useRouter } from "expo-router";
import MyButton from "@/src/components/MyButton";
import extractUserIdFromToken from "@/src/utils/extractDataToken";
import Mycard from "@/src/components/Profile/Mycard";
import CustomHeader from "@/src/components/CustomHeader";
import Colors from "@/src/constants/Colors";
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
      <Mycard  title="Suporte por Email"/>      
      <Mycard  title="Avalie-nos"/>
      <Mycard  title="Termos de uso"/>
      <Mycard  title="Política de privacidade"/>
      <Mycard  title="Sobre"/>
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
