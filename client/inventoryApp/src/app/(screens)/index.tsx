import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import MenuButtons from '@/src/components/MenuUser'
import { useColorScheme } from '@/src/components/useColorScheme';
import Colors from '@/constants/Colors';
const LoginScreen = () => {
  const colorScheme = useColorScheme()
  const themeColors = Colors[colorScheme ?? 'light'] || Colors.light;
  return (
    <View style = {[styles.container, { backgroundColor: themeColors.background }]}>
      <Header/>
      <MenuButtons
      />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
       flex: 1,
       alignItems: 'center',
       justifyContent:'space-around'

    
    }
})


export default LoginScreen