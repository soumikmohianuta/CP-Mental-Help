
import React from 'react';
import { Button, Card } from 'react-native-paper';
const Image = require('../assets/mentalexcercise.png');
export const MentalExcerciseCard = ({ onStartClick}: any) => {

  return (
    <Card>
      <Card.Title title="মানসিক স্বাস্থ্য" />
      <Card.Cover source={Image} />
      <Card.Actions>
        <Button onPress={onStartClick}>অনুশীলনীগুলো দেখে আসুন</Button>
      </Card.Actions>
    </Card>
    
  )
}