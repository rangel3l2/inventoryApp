import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import MyButton from './MyButton'
export default function MenuButtons() {
 


  return (
    <View style = {styles.container}>
      
      <MyButton 
        typeNavigator='push'
        title= {'Entrar'}
        icon={'right'}
        route = {'/CameraScreen'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{     
      flex: 1,     
      justifyContent: 'space-evenly',
      padding:10,
      borderRadius: 15,
     
    },
    textForm:{
        fontSize:20,      

    }
})