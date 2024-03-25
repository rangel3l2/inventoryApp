import React, { FC, useState } from 'react';
import { StyleSheet, View, Button,Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

type MySelectProps = {
  data : any,
  label : string, 
  onSelect?: (item: any) => void,
  initialValue : string



}
const MySelect : FC<MySelectProps>= (props) => {
  const {data, label, initialValue, onSelect} = props;

  return(
    <View style={styles.container}>
      <ModalSelector
        data={data}
        initValue={initialValue}
        onChange={onSelect as any}
        initValueTextStyle={{color:'#000000'}}
      
        
        
        
      />
    
    </View>
  )

}

export default MySelect;
const styles = StyleSheet.create({
  container: {
    height: 50,
    marginLeft:10,
    flexDirection: 'row',    
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
});
