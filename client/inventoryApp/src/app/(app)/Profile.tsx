import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useSession } from "@/src/auth/ctx";
import { useRouter } from "expo-router";
import MyButton from "@/src/components/MyButton";
import extractUserIdFromToken from "@/src/utils/extractDataToken";
import Mycard from "@/src/components/Profile/Mycard";
import CustomHeader from "@/src/components/CustomHeader";
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

  const handleSignOut = () => {
    signOut();
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Perfil" typeNavigator="back" />

      <Mycard name={extractData?.name} role={extractData?.role} />
      <Mycard  title="Configurações"/>
      <Mycard  title="Termos de Uso"/>
      <MyButton
        handlePress={handleSignOut}
        title={"Sair"}
        typeNavigator="replace"
        icon={"logout"}
      />
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
   alignItems: "center",
  },
});
