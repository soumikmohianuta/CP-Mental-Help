import React from 'react';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { questions } from './content';
import { QuestionForm } from '../../components/question-form';
import { setMentalHealthScore } from '../../services/firebase';

export const PSSMeasureScreen = ({ navigation }: any) => {
  const handleSubmit = (score: number) => {
    // TODO: userId should be fetched from local storage
    setMentalHealthScore('1', 'pss', score);
    navigation.navigate('MentalHealthMeasureList');
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title="PSS Scale" />
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