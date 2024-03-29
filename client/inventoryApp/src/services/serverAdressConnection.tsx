import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import axios from 'axios'

const serverAdressConnection = () => {
  const [serverAdress, setServerAdress] = useState<string>('')
  useEffect(() => {
    const getServerAdress = async () => {
      const response = await axios.get('https://pastebin.com/EdBLxG4p')
      setServerAdress(response.data)
    
    }
    getServerAdress()
},[])
   return serverAdress
}

export {serverAdressConnection}

