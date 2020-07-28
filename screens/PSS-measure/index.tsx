import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { questions } from './content';
import { QuestionForm } from '../../components/question-form';
import { setMentalHealthScore } from '../../services/firebase';
import { UserContext } from '../../context';
import { SCALE_NAME } from '../../utils/constants';

export const PSSMeasureScreen = ({ navigation }: any) => {
  const { userName: userId } = useContext(UserContext);
  
  const handleSubmit = (score: number) => {
    setMentalHealthScore(userId, SCALE_NAME.PSS, score);
    navigation.navigate('MentalHealthScoreView', { score, scale: SCALE_NAME.PSS });
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title="মানসিক চাপ নির্ণয়" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>
        <QuestionForm
          questions={questions}
          onSubmit={handleSubmit}
          questionStyle={{
            height: 150,
          }}
        />
      </ScrollView>
    </>
  )
}