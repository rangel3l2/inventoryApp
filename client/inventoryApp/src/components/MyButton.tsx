import React from 'react';
import { Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useColorScheme } from '@/src/components/useColorScheme';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
interface MyButtonProps {
  title?: string; // Optional title with default value
  style?: any; // Optional style object
  handlePress?: () => void; // Optional function for handling press events
  route?: any; // Optional route path
  typeNavigator: 'push' | 'replace' | 'back'; 
}
export default function MyButton(props : MyButtonProps) {
  const { route , title = 'Save', style = '', handlePress, typeNavigator } = props;
  const colorScheme = useColorScheme()
  const themeColors = Colors[colorScheme ?? 'light'] || Colors.light;
  const navigation = useRouter()
  const handleRoute = () =>{
    if(route){navigation[typeNavigator](route)}
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
