import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/src/components/CustomHeader'
import { useLocalSearchParams } from 'expo-router'
import { departamentos } from '../mockedData/Departamentos'
import { Card } from '@rneui/themed';
import MyButton from '@/src/components/MyButton'

const home = () => {
  const [name, setname ]= useState('')
  const params = useLocalSearchParams()
  const departamento = parseInt(params.departamento as string)
  useEffect(() => {
    departamentos.find((item) => {
      if (departamento === item.id){
        setname( item.nome.toString())
      }    
    })
  })

  return (
    <View>
      
      <CustomHeader 
      title={name?name:''}
      typeNavigator='back'
      
       />

      <Card>
        <Card.Title>Buscar item</Card.Title>
        <View style={{flex:1, flexDirection:'row'}}>
        <MyButton
        typeNavigator='replace'
        title = 'Codigo Barra' />
          <MyButton
          typeNavigator='replace'
        title = 'Camera' />
        </View>
      
        <Card.Divider />
        
      </Card>
    </View>
  )
}

export default home