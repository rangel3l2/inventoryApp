import React, { useState } from "react";

import { Link, Tabs, useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import {  Text } from "react-native-paper";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("window");
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const navigation = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"] || Colors.light;
  const [pressableStyle, setPressableStyle] = useState({} as ViewStyle);
  const [pressableStyle2, setPressableStyle2] = useState({} as ViewStyle);
  const [hasPressed, setHasPressed] = useState<undefined | boolean>();
  const inherit: ViewStyle = {};
  const border_style: ViewStyle = {
    borderBottomColor: themeColors.secundary,
    borderBottomWidth: 5,
  };

  const IconHome = () => {
    return (
      <AntDesign name="home" size={24} color={themeColors.tabIconDefault} />
    );
  };
  const IconProfile = () => {
    return (
      <AntDesign name="profile" size={24} color={themeColors.tabIconDefault} />
    );
  };

  return (
    <GestureHandlerRootView style={{flex:1}}>

   
    <Tabs
      
      initialRouteName="home"
      screenOptions={{
        tabBarInactiveTintColor: themeColors.tint,
        tabBarStyle: {
          backgroundColor: themeColors.background,

          height: Platform.OS == "android" ? width * 0.15 : width * 0.25,
        },

        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: IconHome,
          tabBarAllowFontScaling: true,
          tabBarButton() {
            return (
              <Pressable
                onPress={(props) => {
                  

                  setHasPressed(true);
                  navigation.replace("/(app)/home");
                  setPressableStyle(border_style);
                }}
                style={[
                  styles.TabMenuPressable,
                  hasPressed ? pressableStyle : pressableStyle2,
                ]}
              >
                <IconHome />
                <Text
                  style={[
                    styles.tabBarLabelStyle,
                    {
                      color: hasPressed
                        ? themeColors.tabIconDefault
                        : themeColors.tabIconSelected,
                    },
                  ]}
                >
                  Inicio
                </Text>
              </Pressable>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: IconProfile,
          tabBarButton() {
            return (
              <Pressable
                onPress={() => {
                  setHasPressed(false);
                  navigation.replace("/(app)/profile");
                  setPressableStyle(border_style);
                }}
                style={[
                  styles.TabMenuPressable,
                  hasPressed ? pressableStyle2 : pressableStyle,
                ]}
              >
                <IconProfile />
                <Text
                  style={[
                    styles.tabBarLabelStyle,
                    {
                      color: hasPressed
                        ? themeColors.tabIconSelected
                        : themeColors.tabIconDefault,
                    },
                  ]}
                >
                  Perfil
                </Text>
              </Pressable>
            );
          },
        }}
      />
    </Tabs>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 16,
    fontFamily:'RobotoBold',
    marginBottom: 5,
    marginTop: 5,
  },
  TabMenuPressable: {
    flex: 1,
    height: "100%",
    width: width / 2,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
