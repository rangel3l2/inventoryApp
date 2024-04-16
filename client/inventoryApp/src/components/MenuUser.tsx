import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import MyButton from './MyButton'
export default function MenuButtons() {
const [disabledButton, setDisabledButton] = useState(false)

  const handlePress = () => {
    setDisabledButton(true)
    setTimeout(() => {
      setDisabledButton(false)
    }, 3000)
  }
  return (
    <View style = {styles.container}>
      
      <MyButton 
        typeNavigator='push'
        title= {'Entrar'}
        icon={'right'}
        route = {'/CameraScreen'}
        disabled = {disabledButton}
        handlePress={handlePress}
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
        fontFamily:'RobotoBold',     

    }
})