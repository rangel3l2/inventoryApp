import { Text, StyleSheet, View, useColorScheme } from "react-native";
import React, { Component } from "react";
import { Stack } from "expo-router";
import Colors from "@/src/constants/Colors";

const rootLayout = () => {
  const colorScheme = useColorScheme() || "light";
  const colorText =
    colorScheme === "light" ? Colors.dark.text : Colors.light.text;
  const background =
    colorScheme === "light" ? Colors.light.background : Colors.dark.background;

  return (
    <Stack
      screenOptions={{
        headerBackTitleStyle: { fontSize: 18 },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: colorText,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Perfil" }}
      />
      <Stack.Screen
        name="privacyPolitics/index"
        options={{ title: "Política de privacidade" }}
      />
      <Stack.Screen
        name="termsOfUse/index"
        options={{ title: "Termos de Uso" }}
      />
      <Stack.Screen name="aboutUs/index" options={{ title: "Sobre nós" }} />
      <Stack.Screen name="rateUs/index" options={{ title: "Avalie-nos" }} />
    </Stack>
  );
};

export default rootLayout;
