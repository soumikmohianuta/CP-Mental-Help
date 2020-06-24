import React from 'react';
import { Text } from 'react-native-paper';
import { questions } from './content';
import { RadioButtonGroup } from '../../components/radio-button-group';

export const GHQMeasureScreen = () => {
  return (
    <>
      {
        questions.map(({ question, answers }) => (
          <>
            <Text>{question}</Text>
            <RadioButtonGroup options={answers} />
          </>
        ))
      }
    </>
  )
}