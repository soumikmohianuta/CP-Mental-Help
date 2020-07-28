
import React from 'react';
import { Button, Card } from 'react-native-paper';

const Image = require('../assets/help.jpg');

export const HelpCenterCard = ({ onStartClick}: any) => {

  return (
    <Card>
      <Card.Title title="Help Center" />
      <Card.Cover source={Image} />
      <Card.Actions>
        <Button onPress={onStartClick}>এখানে ক্লিক করুন</Button>
      </Card.Actions>
    </Card>
    
  )
}