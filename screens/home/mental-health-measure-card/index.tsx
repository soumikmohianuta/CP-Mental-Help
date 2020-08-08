
import React from 'react';
import { Button, Card } from 'react-native-paper';
const Image = require('../assets/examine.png');
export const MentalHealthMeasureCard = ({ onStartClick, onHistoryClick, rating }: any) => {

  return (
    <Card>
      <Card.Title title="মানসিক স্বাস্থ্য যাচাই করুন" />
      <Card.Cover source={Image} />
    </Card>
  )
}