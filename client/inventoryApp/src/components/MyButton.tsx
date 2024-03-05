import React from 'react';
import { Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useColorScheme } from '@/src/components/useColorScheme';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { AntDesign } from "@expo/vector-icons";
import { color } from '@rneui/base';
interface MyButtonProps {
  title?: string; // Optional title with default value
  style?: any; // Optional style object
  handlePress?: () => void; // Optional function for handling press events
  route?: any; // Optional route path
  typeNavigator: 'push' | 'replace' | 'back'; 
  icon?: any;
  styleText?: any;
  iconColor?: any;
}
export default function MyButton(props : MyButtonProps) {
  const { route , title = 'Save', style = '',styleText='', handlePress, typeNavigator, icon, iconColor } = props;
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
      <Text style={[styles.text, {color: styleText?styleText:themeColors.text, },]}>{title}</Text>
      {icon?<AntDesign name={icon} size={20} color={iconColor?iconColor:themeColors.text} style={styles.icon}   />: null}
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
    flexDirection: 'row',
    gap:5,
    elevation: 3,
  
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    
  },
  icon:{

  }
});
