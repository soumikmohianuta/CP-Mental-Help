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
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [currentAnswers, setCurrentAnswers] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(new Array(NUMBER_OF_QUESTIONS).fill(0));
  
  const handlePrevious = () => {
    setCurrentAnswers(answers[count - 1]);
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
      setCurrentAnswers(answers[count + 1]);
      // Note: To see the selection visibility
      setTimeout(() => {
        setCount(count + 1);
      }, 250);
    } else {
      setShowSubmit(true);
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
      {
        questions.map((item: any, index: number) => {
          return index != count ?
            null
            :
            <>
              <Headline
                style={{
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                  {item.question}
              </Headline>
              <RadioButtonGroup
                options={item.answers}
                onSelect={onAnswerSelect}
                defaultValue={currentAnswers}
              />
            </>
        })
      }
      
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
            mode="outlined"
          >
            Previous
          </Button>
          {
            showSubmit && count === NUMBER_OF_QUESTIONS - 1 ?
            <Button onPress={handleSubmit} mode="contained"> Submit </Button>
            : null
          }
        </View>
        <Button
          onPress={handleSkip}
          mode="text"
          uppercase={false}
        >
          Skip the test
        </Button>
    </>
  )
}