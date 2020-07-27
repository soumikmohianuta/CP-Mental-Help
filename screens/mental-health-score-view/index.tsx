import React, { useEffect, useState, useContext } from 'react';
import { Appbar, Text, Headline, Button, Badge } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ScoreCard from '../../components/scorecard';

import { setMentalHealthExcercise, getMentalHealthExcercise } from '../../services/firebase';
import { exerciseStatusToContentMap } from './content';
import { SCALE_MAX_VALUE, getLevelByScore } from '../../utils/scale';
import { isExcerciseTaken, getExerciseList, EXERCISE_STATUS } from '../../utils/exercise';
import { UserContext } from '../../context';

export const MentalHealthScoreViewScreen = ({ route, navigation }: any) => {
  const [excerciseStatus, setExcerciseStatus] = useState('');
  const { score, scale } = route.params;
  const { userName: userId } = useContext(UserContext);

  useEffect(() => {
    const fetchMentalHealthExercise = async () => {
      const list = await getMentalHealthExcercise(userId);
      setExcerciseStatus(isExcerciseTaken(list));
    }
    fetchMentalHealthExercise();
  }, []);

  const onStart = async () => {
    if (excerciseStatus !== EXERCISE_STATUS.IN_PROGRESS) {
      await setMentalHealthExcercise(userId, getExerciseList());
    }
    navigation.navigate('MentalHealthExercise', { navigateTo: 'MentalHealthScoreView'});
  }

  const content = exerciseStatusToContentMap[excerciseStatus];
  const scaleLevel = getLevelByScore(scale, score);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title={`আপনার ${scale} স্কেল স্কোর`} />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginTop: 32 }}>
        <Headline> আপনার মানসিক অবস্থা {scaleLevel}
        </Headline>
        <ScoreCard
          size={256}
          defaultPos={score}
          max={SCALE_MAX_VALUE[scale]}
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