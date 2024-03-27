import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Avatar, Button, Card, Text, Icon } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';

type PropCard = {
  name?: string | null,
  title?: string
  role?: string | null

}

const Mycard : FC<PropCard> = ({name , title, role})=> {
 

  return (
    <Card style={styles.card}>
    
 
    {name ? (
  <Card.Content>
    <View style={styles.cardContentUser}>
      <Avatar.Icon size={40} icon="account" />
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
    margin: 1,
    width: '90%',
    backgroundColor:'#fffff0'
  },
  cardContentUser :{
    flexDirection:'row',
    gap:5,
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