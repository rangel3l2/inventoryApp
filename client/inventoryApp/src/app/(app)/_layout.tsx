import React from "react";

import { Link, Tabs } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";

import { KeepSessionProvider } from "../../context/keepSessionContext";
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"] || Colors.light;
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
    <KeepSessionProvider>
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: themeColors.tint,
        tabBarStyle: {
          backgroundColor: themeColors.background,
          borderTopColor: themeColors.border,
          borderRadius: 20,
          borderTopWidth: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: IconHome,
        }}
      />
      <Tabs.Screen
        
        name="Profile"
        options={{
          title: "Perfil",
          tabBarIcon: IconProfile,
        }}
      />
    </Tabs>
    </KeepSessionProvider>
  );
}
