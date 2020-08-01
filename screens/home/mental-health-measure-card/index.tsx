
import React from 'react';
import { Button, Card } from 'react-native-paper';
const Image = require('../assets/examine.jpeg');
export const MentalHealthMeasureCard = ({ onStartClick, onHistoryClick, rating }: any) => {

  return (
    <Card>
      <Card.Title title="আপনার মানসিক স্বাস্থ্য কেমন?" />
      <Card.Cover source={Image} />
      <Card.Actions>
        <Button onPress={onStartClick}>নিজেকে যাচাই করুন</Button>
      </Card.Actions>
    </Card>
  )
}