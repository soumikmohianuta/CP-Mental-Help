import React from 'react';
import { Card, Button, Paragraph, Appbar, Headline, Badge } from 'react-native-paper';
import { measureList } from './content';
import { ScrollView } from 'react-native-gesture-handler';

export const MentalHealthMeasureListScreen = ({
  navigation
 }: any) => {
  const onNextScreen = (scale: string) => {
    navigation.navigate('ScaleHistoryView', { scale });
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')}  />
        <Appbar.Content title="মানসিক স্বাস্থ্য যাচাই" />
      </Appbar.Header>
      <ScrollView>
      {
          measureList.map(({
            title,
            description,
            image,
            testRoute,
            scale,
          }, index) => (
            <Card elevation={5} style={{ margin: 12, borderRadius: 5 }} key={index}>
              <Card.Title title={title} />
              <Card.Cover source={image} />
              <Card.Content style={{ marginTop: 24, marginBottom: 12 }}>
                <Paragraph>{description}</Paragraph>
              </Card.Content>
              <Card.Actions style={{ justifyContent: 'flex-end' }}>
                <Button onPress={() => onNextScreen(scale)}>
                  পূর্ণ স্কোর
                </Button>
                <Button onPress={() => navigation.navigate(testRoute)}>
                  টেস্ট করুন
                </Button>
              </Card.Actions>
            </Card>
        ))
        }
      </ScrollView>
    </>
  );
}