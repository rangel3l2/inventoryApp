import React, { useContext } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import MyButton from "../../components/MyButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { useSession } from "@/src/auth/ctx";

const KeepSessionModal: FC<any> = ({ route }) => {
  const { setKeepSession, setSession, signOut } = useSession(); // Access context values
  const params = useLocalSearchParams();
  const navigation = useRouter();
  const title = params.title as string;

  const handleParentPress = () => {
    setSession(null);
    navigation.replace({ pathname: "/" });
    // Clear session on "Parent" press

  };

  const handleSimPress = () => {
    setKeepSession(true); // Set "keepSession" to true on "Sim" press
    navigation.replace({ pathname: "/" }); // Navigate to desired path
  };

  const handleNaoPress = () => {
    setKeepSession(false);
    navigation.replace({ pathname: "/" }); // Logout and navigate to login
  };

  return (
    <Pressable style={styles.container} onPress={handleParentPress}>
      {({ pressed }) => (
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
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
});

export default KeepSessionModal;
