import React, { useState ,useEffect} from "react";
import { Card, Button, Paragraph, Appbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { measureList } from './contents';
import { ScrollView, RotationGestureHandler } from 'react-native-gesture-handler';
import { isRaingRequire } from '../../services/firebase';
const ExamineImage = require('./assets/mentalexcercise.jpeg');
export const MentalHealthMeasureListScreen = ({route,navigation}: any) => {

  var {showRating} = route.params;
  //const [showhealthRating, setShowHealthRating] = useState(true);
  



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

        {showRating &&
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