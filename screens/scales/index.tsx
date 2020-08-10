import React from 'react';
import { Card, Button, Paragraph, Appbar } from 'react-native-paper';
import { measureList } from './contents';
import { ScrollView } from 'react-native-gesture-handler';
import { isRaingRequire } from '../../services/firebase';
const ExamineImage = require('../../Images/examine.jpeg');
export const MentalHealthMeasureListScreen = ({route,navigation}: any) => {
  const { showrating } = route.params;

  const onNextScreen = (scale: string) => {
    navigation.navigate('ScaleHistoryView', { scale });
  }
  const examineRating = () => {
    navigation.navigate('MentalHealthRating', { navigateTo: 'Home',videoOrderId:-1 });
  }
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        <Appbar.Content title="মানসিক স্বাস্থ্য যাচাই" />
      </Appbar.Header>
      <ScrollView>

        {showrating &&
          <>
            <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
              <Card.Title title="মানসিক স্বাস্থ্য মূল্যায়ন" />
              <Card.Cover source={ExamineImage} />
              <Card.Actions style={{ justifyContent: 'flex-end' }}>
   
                <Button onPress={examineRating}>
                  টেস্ট করুন
                </Button>
              </Card.Actions>
            </Card>
          </>}
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