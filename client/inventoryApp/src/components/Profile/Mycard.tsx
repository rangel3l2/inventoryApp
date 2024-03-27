import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper';


export default function Mycard() {
 

  return (
    <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle"  />
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  )
}

const styles = StyleSheet.create({})