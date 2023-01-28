import AddButton from './AddButton';
import { View, Text, Button } from 'react-native'
import React from 'react'

const CloseButton = ({ onPress }) => (
    
  <AddButton title="Fermer" handlePress={onPress} />
);

export default CloseButton;
