
import { StyleSheet, Text, View, Dimensions, Animated, ViewStyle } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import Colors from '@/src/constants/Colors'
import { useColorScheme } from '../useColorScheme'

const { width, height } = Dimensions.get('window')
type props={
    title: string,
    message: string
    visible: boolean
    
}

export default function CustomModal(props: props) {
    const colorScheme = useColorScheme() || "light";
    const theme = colorScheme === "light" ? Colors.dark : Colors.light;
    const [isOpen, setIsOpen] = useState(false);
    const translateX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (props.visible !== isOpen) {
          setIsOpen(props.visible);
          animateDialog(props.visible);
        }
      }, [props.visible]);
      const animateDialog = (isVisible: boolean) => {
        Animated.timing(translateX, {
          toValue: isVisible ? -width / 10 : 0, 
          duration: 500,
          useNativeDriver: true,
        }).start();
      };
      const dialogStyles: ViewStyle = {
        zIndex: 1000,
        position: 'absolute',
        minWidth: width/1.5,
        minHeight: height / 5,
        top: height / 2 - height / 6,
        left: '28%',
        transform: [{translateX}],
        justifyContent: 'center',        
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      
      };
  return (
    <Animated.View style={[styles.modal,dialogStyles]}>
    <Text style={[styles.title, {}]}>{props.title}</Text> 
    <Text style={[styles.localText,{}]}>{props.message}</Text>     
 
  </Animated.View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginBottom: 20,
        fontFamily: 'RobotoBold'
      },
      localText: {
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'RobotoRegular'
      },
      modal: {
            flex:1
      },
})