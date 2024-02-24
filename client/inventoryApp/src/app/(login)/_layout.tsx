import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layoutScreens = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, headerTitle: 'Início' }}/>
        <Stack.Screen name="CameraScreen" options={{headerTitle: 'Sua Câmera'}}  />
        <Stack.Screen name="BarCodeWriting" options={{headerTitle: "Código de barras"}}/>
   
    </Stack>
  )
}

export default _layoutScreens