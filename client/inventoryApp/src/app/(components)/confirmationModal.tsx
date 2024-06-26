import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import MyButton from '../../components/MyButton';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { departamentos } from '../mockedData/Departamentos';
import { FC } from 'react';
import { Place } from '@/src/model/place';

const ConfirmationModal: FC<any> = () => {
  const params = useLocalSearchParams();
  const departamento = parseInt(params.departamento as string);
  const navigation = useRouter();
 
  const {nome, id, title} = params 
  
  const routesOld = useNavigation()
  const handlePress = () => {
    setTimeout(() => {
      navigation.replace(`/inventory?nome=${nome}&&id=${id}` as any);
      
    })
    
  };
  const handleParentPress = () => {
    navigation.back()
  };
  
  return (

    <Pressable style={styles.container} onPress={handleParentPress}>
       {({ pressed }) => (
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        {nome ? (
          <Text style={styles.localText}>
            {' '}
            {nome}?
          </Text>
        ): null}
        <View style={{ gap: 20 }}>
          <MyButton 
            title="Confirmar" 
            icon={'check'}
            handlePress={handlePress}
            typeNavigator='replace' />
          <MyButton title="Cancelar"
            icon={'close'}
            handlePress={() => navigation.back()}             
            typeNavigator='replace'/>
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
  },
});

export default ConfirmationModal;