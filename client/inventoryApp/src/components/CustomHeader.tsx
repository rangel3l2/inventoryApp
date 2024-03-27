import { Text, View, Button, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from "@expo/vector-icons";
import Colors from '../../constants/Colors';


interface CustomHeaderProps {
  title?: string; 
  backTitle?: string;
  route?: any;
  typeNavigator: 'push' | 'replace' | 'back'; 
}

// Use a functional component with explicit return type annotation
const CustomHeader: React.FC<CustomHeaderProps> = (props) => {
  // Destructure props with default values and correct syntax
  const { route, title = 'Save', typeNavigator, backTitle } = props;
  const navigation = useRouter();

  // Handle back button press with proper navigation call
  const handleBackButtonPress = () => {
    
      navigation[typeNavigator](route);
    
  };

  // Get color scheme and derive text color
  const colorScheme = useColorScheme() || 'light';
  const colorText = colorScheme === 'light' ? Colors.dark.text : Colors.light.text;
  const background = colorScheme === 'light' ? Colors.light.background : Colors.dark.background;
  return (
    <View style={[styles.headerContainer, {backgroundColor : background }]}> 
      <Pressable style={styles.backHeader} onPress={handleBackButtonPress}
       hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <AntDesign name="left" size={20} color={colorText} />
        <Text style={[styles.headerBackTitle, { color: colorText }]}>{backTitle?backTitle:'Local'}</Text>
      </Pressable>
      <Text style={[styles.headerTitle, { color: colorText }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    
  },
  backHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  headerTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    marginRight:'16%'

   
    
    
  },
  headerBackTitle: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default CustomHeader;
