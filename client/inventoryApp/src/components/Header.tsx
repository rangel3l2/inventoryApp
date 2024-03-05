import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.fontText}>Inventare</Text>
      <Image style={styles.imageLogo} source={require('../../assets/images/logo.png')}/>

    </View>
  )
}
const styles = StyleSheet.create({
    container:{
                
        backgroundColor: '#0000',       
        flex: 1,
        flexDirection:'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
             
        },

        imageLogo: {
            width:100,
            height:100,
        },
        
        fontText: {
            fontSize: 40,
            
        },

}) 

export default Header