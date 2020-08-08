import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { questions } from './content';
import { QuestionForm } from '../../components/question-form';
import { setMentalHealthScore } from '../../services/firebase';
import { UserContext } from '../../context';
import { SCALE_NAME } from '../../utils/constants';

export const AnxietyScaleMeasureScreen = ({ navigation }: any) => {
  const { userName: userId } = useContext(UserContext);
  
  const handleSubmit = async(score: number) => {
    try{
    await setMentalHealthScore(userId, SCALE_NAME.ANXIETY, score);
    navigation.navigate('MentalHealthScoreView', { score, scale: SCALE_NAME.ANXIETY });
    }
    catch{
      alert('সাবমিট করা যাচ্ছে না');
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title="দুশ্চিতা নির্ণয়" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>
        <QuestionForm
          questions={questions}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </>
  )
}