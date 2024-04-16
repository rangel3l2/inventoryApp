import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { getTextToProfileComponent } from '@/src/services/getTextToProfileComponents'

const index = () => {
  const {text, loading} = getTextToProfileComponent('about')
  return (
    loading ? <ActivityIndicator size='large' color='black' style={{flex:1, justifyContent:'center', alignItems:'center'}}/> :
    <ScrollView style={styles.container}>
       {text&&text.map((line : string, indexLine: number)=>indexLine>0?<Text style={styles.text}  key={indexLine}>{line}</Text>:<Text adjustsFontSizeToFit  key={indexLine} style={styles.title}>{line}</Text>)}    
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:8,
    backgroundColor:'#fffff0',
    width:'95%',
    alignSelf:'center',
    borderRadius: 15,
    
  },
  title:{
    fontSize:20, 
    fontFamily:'RobotoBold',
    alignSelf:'center'
  },
  text:{
    textAlign:'justify',  
    fontSize:16,
    justifyContent:'center',
    fontFamily:'RobotoRegular'
  }
})