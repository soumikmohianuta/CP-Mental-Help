import React from 'react';
import { Card, Button, Paragraph } from 'react-native-paper';
import { measureList } from './content';
import { MentalHealthRatingScreen } from '../mental-health-rating';

export const MentalHealthMeasureListScreen = ({
  navigation
 }: any) => {
  const onNextScreen = (screenName: string) => {
    navigation.navigate(screenName);
  }
  
  if (false) {
    return <MentalHealthRatingScreen onFinish={onNextScreen} />
  }

  return (
    <>
    {
      measureList.map(({
        title,
        description,
        nextScreen
      }) => (
        <Card>
          <Card.Title title={title} />
          <Card.Content>
            <Paragraph>{description}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => onNextScreen(nextScreen)}>
              চলুন শুরু করি
            </Button>
          </Card.Actions>
        </Card>
    ))
    }
    </>
  );
}