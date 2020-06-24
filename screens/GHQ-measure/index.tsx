import React from 'react';
import { Text } from 'react-native-paper';
import { questions } from './content';
import { RadioButton } from '../../components/radio-button';

export const GHQMeasureScreen = () => {
  return (
    <>
      {
        questions.map(({ question, answers }) => (
          <>
            <Text>{question}</Text>
            { answers.map(({ label, value }: any) => (
                <RadioButton
                  key={label}
                  label={label}
                  value={value}
                 />)
            )
            }
          </>
        ))
      }
    </>
  )
}