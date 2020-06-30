import React, { useState } from 'react';
import { Subheading, ProgressBar, Colors, Headline, Button } from 'react-native-paper';
import { RadioButtonGroup } from '../radio-button-group';
import { View } from 'react-native';

export const QuestionForm = ( {
  questions,
  onSkip,
  onSubmit,
}: any) => {
  const NUMBER_OF_QUESTIONS = questions.length;
  const [count, setCount] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(new Array(NUMBER_OF_QUESTIONS).fill(0));
  
  const handlePrevious = () => {
    setCount(count - 1);
  }

  const handleSkip = () => {
    onSkip && onSkip();
  }

  const handleSubmit = () => {
    const score = answers.reduce((acc, index) => {
      const { weight } = questions[index].answers[answers[index] -1];
      acc += weight;
      return acc;
    }, 0);
    onSubmit && onSubmit(score);
  }

  const onAnswerSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[count] = value;
    setAnswers(newAnswers);
    if (count < NUMBER_OF_QUESTIONS - 1) {
      setCount(count + 1);
    }
  }

  return (
    <>
      <Subheading style={{  marginTop: 12, marginBottom: 12 }}> QUESTIONS {count + 1} of {NUMBER_OF_QUESTIONS}</Subheading>
      <ProgressBar
        progress={(count + 1) / NUMBER_OF_QUESTIONS}
        color={Colors.red800}
        style={{ marginBottom: 24 }}
      />
      <Headline
        style={{
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
          {questions[count].question}
      </Headline>
      <RadioButtonGroup
        options={questions[count].answers}
        onSelect={onAnswerSelect}
        defaultValue={answers[count]}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12
        }}
      >
          <Button
            onPress={handlePrevious}
            disabled={count === 0}
          >
            Previous
          </Button>
          {
            count === NUMBER_OF_QUESTIONS - 1 ?
            <Button onPress={handleSubmit} mode="contained"> Submit </Button>
            : <Button onPress={handleSkip}> Skip </Button>
          }
        </View>
    </>
  )
}