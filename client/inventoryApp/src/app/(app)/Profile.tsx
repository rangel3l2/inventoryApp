import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useSession } from "@/src/auth/ctx";
import { useRouter } from "expo-router";
import MyButton from "@/src/components/MyButton";

type Profile = {
  username: string;
  role: string;
};
const Profile = () => {
  const navigation = useRouter();
  const { signOut, session } = useSession();
  const handleSignOut = () => {
    signOut();
  };
  return (
    <View style={styles.container}>
    
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
    justifyContent: "center",
  },
});
