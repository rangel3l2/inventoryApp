import { Text, View, Button, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from "@expo/vector-icons";
import Colors from '../../constants/Colors';
const CustomHeader = ({ title }: {title : string}) => {
  const navigation = useRouter();

  const handleBackButtonPress = () => {
    navigation.replace('/(app)/'); 
  };
  type ColorScheme = 'light' | 'dark';
  const colorScheme: ColorScheme = useColorScheme() || 'light';
  const colorText = colorScheme === 'light' ? Colors.dark.text: Colors.light.text;
  

  return (
    <View style={styles.headerContainer}>
        <Pressable style={styles.backHeader} onPress={handleBackButtonPress}>
        <AntDesign name="left" size={20} color={colorText} />
        <Text style= {[styles.headerBackTitle,{color:colorText}]}>Local</Text>      
      </Pressable>
      <Text style={[styles.headerTitle, {color:colorText}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '60%',
    
    
  },
  backHeader:{
    flexDirection: 'row',
   
    alignItems: 'center',

  },
  headerTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  
  },
  headerBackTitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  
  },
});

export default CustomHeader;
