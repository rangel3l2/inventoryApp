import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Stack } from 'expo-router'

const rootLayout=()=>{

    return(
        <Stack>
        <Stack.Screen name='index' options={{headerShown:false}}>

        </Stack.Screen>
    
        </Stack>
    )
}

export default rootLayout