import { StyleSheet, View, Dimensions } from 'react-native'
import React, { FC } from 'react'
import { Avatar, Button, Card, Text, Icon } from 'react-native-paper';

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";

const {height, width} = Dimensions.get('window')
type PropCard = {
  
  name?: string | null,
  title?: string
  role?: string | null

}

const Mycard : FC<PropCard> = ({name , title, role})=> {
  const colorScheme = useColorScheme()
  const themeColors = Colors[colorScheme ?? 'light'] || Colors.light;

  return (
    <Card style={[styles.card, name ? { borderTopLeftRadius: 12, borderTopRightRadius: 12 } : {}]}>

    
 
    {name ? (
  <Card.Content>
    <View style={[styles.cardContentUser,{margin:width/10,
     borderTopLeftRadius:12, borderTopRightRadius:12}]}>
      <View style={{marginRight:20, backgroundColor: themeColors.background}}>

      <Avatar.Icon size={60} icon="account" color={themeColors.background}  style={{backgroundColor: themeColors.primary}}/>
      </View>
      <Text style={styles.cardTitle}>{name}</Text>
    </View>
  </Card.Content>
) : (
  <Card.Content>
    <View style={styles.cardContent}>
    <Text style={styles.cardText}>{title}</Text>
      <Avatar.Icon size={40} color='#000000' style={{backgroundColor:'#fffff0'}} icon="arrow-right-bold" />
      </View>
    </Card.Content>
    
)}
    

  </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth:0,
    margin:0,
    padding:0,
    width: width - 10,
    backgroundColor:'#fffff0',
    borderRadius: 0,
    maxHeight: width/2,
    shadowColor:'none',
    shadowOpacity:0,
    shadowRadius:0,

    elevation:0,
  },
  cardContentUser :{
    flexDirection:'row',
    
    justifyContent:'center',
    alignItems: 'center'
  },
  cardContent :{
    margin:5,
    flexDirection:'row',
    gap:5,
    justifyContent:'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardText:{
    fontSize: 17,
    color: 'gray'
  }
})

export default Mycard