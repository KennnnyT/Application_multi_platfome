import { View, Text, Button } from 'react-native'
import React from 'react'

export default function AddButton(props) {
  return (
    <View>
      <Button title='Ajouter un film' onPress={props.handlePress} />
    </View>
  )
}
