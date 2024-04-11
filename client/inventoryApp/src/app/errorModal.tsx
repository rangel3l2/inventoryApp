import React, { useEffect } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import MyButton from '../components/MyButton';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FC } from 'react';

const ConfirmationModal: FC<any> = ({ route }) => {
 
  const params = useLocalSearchParams();
 
  const navigation = useRouter();
  const id = params.id as string;
  const nome = params.nome as string;
  const title = params.title as string;

 
  const handleParentPress = () => {
    navigation.replace('/inventory/')
  };


  
  return (

    <Pressable style={styles.container} onPress={handleParentPress}>
       {({ pressed }) => (
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>      
       <View style={{ gap: 20 }}>
          
          {nome&&id&&<MyButton 
            icon={'close'}
            title="Fechar" 
            route={{pathname: `/(inventory)/home?id=${id}&&nome=${nome}&&title=${title}`}}
            typeNavigator='replace' />}
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
