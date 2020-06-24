import React from 'react';
import { Card, Button, Paragraph } from 'react-native-paper';
import { measureList } from './content';

export const MentalHealthMeasureListScreen = ({
  navigation
 }: any) => {
   const onNextScreen = (screenName: string) => {
    navigation.navigate(screenName);
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
          <Button onPress={() => onNextScreen(nextScreen)}>
            চলুন শুরু করি
          </Button>
        </Card>
    ))
    }
    </>
  );
}