import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component, FC } from 'react'

type PropsInput = {
    children?: React.ReactNode
    value?: string
}

const Myinput:FC<PropsInput> = ({children, ...props}) => {
  
    return (
     <TextInput
     {...props}/>
    )
  }


const styles = StyleSheet.create({})