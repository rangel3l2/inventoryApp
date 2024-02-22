import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from '@/src/components/useColorScheme';
import { Link } from 'expo-router';
import Colors from '../../constants/Colors';
export default function MyButton(props : any) {
  const { route = '/NotFoundScreen', title = 'Save', style = '' } = props;
  const colorScheme = useColorScheme()
  const themeColors = Colors[colorScheme ?? 'light'] || Colors.light;
  return (
    <Link href={route} asChild style={[styles.button,{backgroundColor : themeColors.secundary, },style]}>
    <Pressable  >
        
      <Text style={[styles.text, {color: themeColors.text}]}>{title}</Text>
    </Pressable>
    </Link>
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
