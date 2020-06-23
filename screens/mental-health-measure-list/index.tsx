import React from 'react';
import { Text, Card, Button } from 'react-native-elements';
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
        <Card title={title}>
          <Text>{description}</Text>
          <Button
            title="চলুন শুরু করি"
            onPress={() => onNextScreen(nextScreen)}
          />
        </Card>
    ))
    }
    </>
  );
}