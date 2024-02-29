import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import MyButton from '../../components/MyButton';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { departamentos } from '../mockedData/Departamentos';
import { FC } from 'react';

const ConfirmationModal: FC<any> = ({ route }) => {
  const params = useLocalSearchParams();
  const departamento = parseInt(params.departamento as string);
  const navigation = useRouter();
  const title = params.title as string;
  const routesOld = useNavigation()
  const handlePress = () => {

    departamento&&navigation.replace({pathname: '/(inventory)/home', params: { departamento }});
  };
  const handleParentPress = () => {
    navigation.back()
  };
  
  return (

    <Pressable style={styles.container} onPress={handleParentPress}>
       {({ pressed }) => (
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        {departamento ? (
          <Text style={styles.localText}>
            {' '}
            {departamentos.find((d) => d.id === departamento)?.nome}?
          </Text>
        ): null}
        <View style={{ gap: 20 }}>
          <MyButton 
            title="Confirmar" 
            handlePress={handlePress}
            typeNavigator='replace' />
          <MyButton title="Cancelar"
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