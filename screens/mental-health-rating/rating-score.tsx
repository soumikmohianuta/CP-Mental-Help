import React, { useEffect, useState, useContext } from 'react';
import { Appbar, Text, Headline, Button, Paragraph, Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ScoreCard from '../../components/scorecard';
import { View } from 'react-native';
import { severityText } from './contents';
import { resources } from '../mental-health-exercises/content';

export const MentalRatingScoreViewScreen = ({ route, navigation }: any) => {
  const { navigateTo, score, videoOrderId } = route.params;
  const [navToVideo, setnavToVideo] = useState(true);
  const [scoreText, setScoreText] = useState("");
  const onStart = () => {

    if (videoOrderId < 0) {
      navigation.navigate('MentalHealthMeasureList', { showRating: false});
    }
    else {
      navigation.navigate('ExerciseVideo', {
        exercise: resources[videoOrderId + 1]
      })
    }
  }
  useEffect(() => {
    if (videoOrderId >= 0) {
      setnavToVideo(false);
    }
    else{
      if(score<50){
        setScoreText(severityText[0]);
      }
      else{
        setScoreText(severityText[1]);
      }

    }
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate(navigateTo)} />
        <Appbar.Content title="মানসিক স্বাস্থ্য" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginTop: 32 }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Headline> মানসিক স্বাস্থ্য মূল্যায়ন</Headline>
        </View>

        <ScoreCard
          size={150}
          defaultPos={score}
          max={100}
        >
          <Text style={{ fontSize: 30 }}>
            {score}
          </Text>
        </ScoreCard>
        {navToVideo &&
          <>

            <Card elevation={5} style={{ margin: 12, borderRadius: 5, marginTop: 10 }}>

              <Card.Content style={{ margin: 12, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>

                <Paragraph style={{ textAlign: 'justify', fontSize: 15 }}>{scoreText}</Paragraph>

              </Card.Content>

            </Card>
          </>
        }
        <Button mode="contained" onPress={onStart}>{navToVideo ? "পরবর্তী ধাপ" : "পরবর্তী ভিডিও"}</Button>


      </ScrollView>
    </>
  )
}