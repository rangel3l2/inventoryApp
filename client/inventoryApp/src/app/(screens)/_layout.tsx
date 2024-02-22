import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layoutScreens = () => {
  return (
    <Stack>
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }}  />
        <Stack.Screen name="CameraScreen" options={{ headerShown: false }}  />
         
         
    </Stack>
  )
}

export default _layoutScreens