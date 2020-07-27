import React, { useEffect, useState } from 'react';
import { Appbar, Text, Headline, Button, Badge } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ScoreCard from '../../components/scorecard';
import { resources } from '../mental-health-exercises/content';
import { setMentalHealthExcercise, getMentalHealthExcercise } from '../../services/firebase';
import { exerciseStatusToContentMap } from './content';

const getExerciseList = () => {
  return resources.reduce((acc, item) => {
    acc[item.content_id] = 0;
    return acc;
  }, {} as any);
};

export const isExcerciseTaken = (list: any) => {
  if (!list) {
    return 'never';
  }
  return Object.keys(list).every((key) => list[key] === 1) ?
  'completed': 'inprogress'
}

export const MentalHealthScoreViewScreen = ({ route, navigation }: any) => {
  const [excerciseStatus, setExcerciseStatus] = useState('');
  const { score, scale } = route.params;

  useEffect(() => {
    const fetchMentalHealthExercise = async () => {
      const list = await getMentalHealthExcercise('1');
      setExcerciseStatus(isExcerciseTaken(list));
    }
    fetchMentalHealthExercise();
  }, []);

  const onStart = async () => {
    if (excerciseStatus !== 'inprogress') {
      await setMentalHealthExcercise('1', getExerciseList());
    }
    navigation.navigate('MentalHealthExercise', { navigateTo: 'MentalHealthScoreView'});
  }

  const content = exerciseStatusToContentMap[excerciseStatus];
  
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title={`Your ${scale} Score`} />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginTop: 32 }}>
        <Headline> আপনার মানসিক অবস্থা {' '}
            <Badge style={{  paddingLeft: 24, fontSize: 22 }}>
              স্বাভাবিক
            </Badge>
        </Headline>
        <ScoreCard
          size={256}
          defaultPos={score}
          max={100}
        >
          <Text style={{ fontSize: 76 }}>
            {score}
          </Text>
        </ScoreCard>
        {
          content &&
          <>
            <Headline>{content.title}</Headline>
            <Button mode="contained" onPress={onStart}> {content.buttonText}</Button>
          </>  
        }
      </ScrollView>
    </>
  )
}