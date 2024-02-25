import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors'
const _layoutScreens = () => {
  type ColorScheme = 'light' | 'dark';
  const colorScheme: ColorScheme = useColorScheme() || 'light';
  const colorText = colorScheme === 'light' ? Colors.dark.text: Colors.light.text;
  return (
    <Stack screenOptions={{headerTitleStyle:{color: colorText}}}>
        <Stack.Screen name="index" options={{headerShown: false, headerTitle: 'Início', headerStyle:{backgroundColor:"#fff"} }}/>
        <Stack.Screen name="CameraScreen" options={{headerTitle: 'Sua Câmera'}}  />
        <Stack.Screen name="BarCodeWriting" options={{headerTitle: "Código de barras"}}/>
   
    </Stack>
  )
}

export default _layoutScreens