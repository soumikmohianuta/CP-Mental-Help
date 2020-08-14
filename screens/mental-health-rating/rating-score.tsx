import React, { useEffect, useState, useContext } from 'react';
import { Appbar, Text, Headline, Button, Paragraph, Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ScoreCard from '../../components/scorecard';
import { View } from 'react-native';
import { socreMessage } from './contents';
import { resources } from '../mental-health-exercises/content';

export const MentalRatingScoreViewScreen = ({ route, navigation }: any) => {
  const { navigateTo, score, videoOrderId } = route.params;
  const [navToVideo, setnavToVideo] = useState(true);

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
          size={256}
          defaultPos={score}
          max={100}
        >
          <Text style={{ fontSize: 76 }}>
            {score}
          </Text>
        </ScoreCard>
        {navToVideo &&
          <>
            <Card elevation={5} style={{ margin: 12, borderRadius: 5, marginTop: 10 }}>

              <Card.Content style={{ margin: 12, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>

                <Paragraph style={{ textAlign: 'justify', fontSize: 15 }}>{socreMessage}</Paragraph>

              </Card.Content>

            </Card>
          </>
        }
        <Button mode="contained" onPress={onStart}>{navToVideo ? "পরিমাপ শুরু করুন" : "পরবর্তী ভিডিও"}</Button>


      </ScrollView>
    </>
  )
}