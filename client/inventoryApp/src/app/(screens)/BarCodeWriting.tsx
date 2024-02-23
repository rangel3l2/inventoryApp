import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Text } from 'react-native';
import { useSession } from '@/src/auth/ctx';
import { useColorScheme } from '@/src/components/useColorScheme';
import Colors from '@/constants/Colors';
import MyButton from '@/src/components/MyButton';
import { useRouter } from 'expo-router';
const MyLink = {
    path: '/home',
    screen: 'Home',
  };
export default function BarcodeLogin() {

  const navigation = useRouter()
  const [barcode, setBarcode] = useState('');
  const { signIn } = useSession();
  const colorScheme = useColorScheme()
  const themeColors = Colors[colorScheme ?? 'light'] || Colors.light;  
  const handleSignIn = async () => {
    const result = await signIn(barcode);
    if (result.success) {
      console.log('Autenticação bem-sucedida. Nome de usuário:', result.username, result.success);
      navigation.navigate('(tabs)')
    } else {
      console.error('Falha na autenticação. Erro:', result.error);
    }
  };

  return (
    <View style = {[styles.container, { backgroundColor: themeColors.secundary }]}>
      <TextInput 
        
        style={styles.input}
        placeholder="Digite o código de barras"
        onChangeText={(text) => setBarcode(text)}
        keyboardType='numeric'
        value={barcode}
      />
      <Pressable
      style = {[styles.button,{backgroundColor : themeColors.background}]}
      onPress = {handleSignIn}
      >
      <Text style = {
        styles.text
      }>Entrar</Text>
      
      
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    minWidth:200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button : {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  }

});
