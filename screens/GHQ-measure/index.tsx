import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { questions } from './content';
import { QuestionForm } from '../../components/question-form';
import { setMentalHealthScore } from '../../services/firebase';
import { UserContext } from '../../context';
import { SCALE_NAME } from '../../utils/constants';

export const GHQMeasureScreen = ({ navigation }: any) => {
  const { userName: userId } = useContext(UserContext);
  
  const handleSubmit = (score: number) => {
    setMentalHealthScore(userId, SCALE_NAME.GHQ, score);
    navigation.navigate('MentalHealthScoreView', { score, scale: SCALE_NAME.GHQ });
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title="মানসিক অবস্থা যাচাইকরণ" />
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