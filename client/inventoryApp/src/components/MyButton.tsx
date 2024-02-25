import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from '@/src/components/useColorScheme';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function MyButton(props : any) {
  const { route , title = 'Save', style = '', handlePress } = props;
  const colorScheme = useColorScheme()
  const themeColors = Colors[colorScheme ?? 'light'] || Colors.light;
  const navigation = useRouter()
  const handleRoute = () =>{
    if(route){navigation.navigate(route)}
  } 

  const handleAll=()=>{
    if(handlePress){handlePress()}
    handleRoute()
  }
  return (
    <Pressable  onPress={handleAll} style={[styles.button,{backgroundColor : themeColors.secundary, },style]} >
      <Text style={[styles.text, {color: themeColors.text}]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    
  },
});
