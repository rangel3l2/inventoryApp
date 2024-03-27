import { Status } from '@/src/model/status';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Button,Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

type MySelectProps = {
  data : Status[],
  
  onSelect?: (item: any) => void,
  initialValue : string



}
const MySelect : FC<MySelectProps>= (props) => {
  const {data, initialValue, onSelect} = props;
    useEffect(() => {
      
    },[])
  return(
    <View style={styles.container}>
      {data&&<ModalSelector
        keyExtractor={(item: Status) => item.id.toString()}
        labelExtractor={(item: Status) => item.name}
        data={data}
        initValue={initialValue}
        onChange={onSelect as any}
        initValueTextStyle={{color:'#000000'}}
      
        
        
        
      />}
    
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
