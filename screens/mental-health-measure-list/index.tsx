import React from 'react';
import { Card, Button, Paragraph, Appbar } from 'react-native-paper';
import { measureList } from './content';
import { ScrollView } from 'react-native-gesture-handler';

export const MentalHealthMeasureListScreen = ({
  navigation
 }: any) => {
  const onNextScreen = (screenName: string) => {
    navigation.navigate(screenName);
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')}  />
        <Appbar.Content title="Measure Mental Health" />
      </Appbar.Header>
      <ScrollView>
      {
          measureList.map(({
            title,
            description,
            image,
            testRoute,
            historyRoute,
          }, index) => (
            <Card elevation={5} style={{ margin: 12, borderRadius: 5 }} key={index}>
              <Card.Title title={title} />
              <Card.Cover source={image} />
              <Card.Content>
                <Paragraph style={{ marginTop: 24, marginBottom: 12 }}>{description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => onNextScreen(historyRoute)}>
                  See History
                </Button>
                <Button onPress={() => onNextScreen(testRoute)}>
                  Take test
                </Button>
              </Card.Actions>
            </Card>
        ))
        }
      </ScrollView>
    </>
  );
}