import React from "react";
import { View } from "./Themed";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../constants/Colors";
import { useColorScheme } from "./useColorScheme";

const Loading: React.FC = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"] || Colors.light;

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        color={themeColors.background}
        size="large"
      />
    </View>
  );
};

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}

});

export default Loading;
