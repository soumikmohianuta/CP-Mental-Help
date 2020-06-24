
import React from 'react';
import { Button, Card } from 'react-native-paper';

export const MentalHealthMeasureCard = ({ onStartClick, onHistoryClick, rating }: any) => {

  return (
    <Card>
      <Card.Title title="আপনার মানসিক স্বাস্থ্য কেমন?" />
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button onPress={onStartClick}>নিজেকে যাচাই করুন</Button>
      </Card.Actions>
    </Card>
  )
}