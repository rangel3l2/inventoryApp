import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import MyButton from '../../components/MyButton';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { departamentos } from '../mockedData/Departamentos';
import { FC } from 'react';

const ConfirmationModal: FC<any> = ({ route }) => {

  const params = useLocalSearchParams();
 
  const navigation = useRouter();
  const title = params.title as string;

 
  const handleParentPress = () => {
    navigation.replace({pathname: '/(login)/BarCodeWriting'})
  };


  
  return (

    <Pressable style={styles.container} onPress={handleParentPress}>
       {({ pressed }) => (
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>      
       <View style={{ gap: 20 }}>
        
          <MyButton 
            title="Fechar" 
            route={{pathname: '/(login)/BarCodeWriting'}}
            typeNavigator='replace' />
        </View>
      </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  localText: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '#db2329',
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
  },
});

export default ConfirmationModal;
