import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { ProgressTracker } from '../../components/progress-tracker';
import { CircleSlider } from '../../components/circular-slider';
import {
  Container,
  NoteText,
  QuestionText,
  SliderContainer,
  ActionsContainer,
} from './styled';
import { questionnaires } from './contents';

const NUMBER_OF_QUESTIONS = 5;

export const CurrentStateScreen = ({ navigation }: any) => {
  const [answers, setAnswers] = useState([20, 30, 40, 50, 20]);
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [count, setCount] = useState(0);

  const handleSlideComplete = (ans: any) => {
    setCurrentAnswer(ans);
  }

  const handleNext = () => {
    if (count === NUMBER_OF_QUESTIONS - 1) {
      navigation.navigate('Home');
    } else {
      const newAnswers = [...answers];
      newAnswers[count] = currentAnswer;
      setAnswers(newAnswers);
      setCount(count+1);
    }
  }
  const handleBack = () => {
    setCount(count - 1);
  }

  return (
    <Container>
      <ProgressTracker totalStep={NUMBER_OF_QUESTIONS} current={count} />
      <QuestionText h4>
        {questionnaires[count]}
      </QuestionText>
      <SliderContainer>
        <CircleSlider
          value={answers[count]}
          min={0}
          max={100}
          btnRadius={25}
          dialWidth={10}
          strokeWidth={10}
          textSize={16}
          dialRadius={100}
          onValueChange={handleSlideComplete}
        />
      </SliderContainer>
      <NoteText>
        (যেখানে ০ মানে হল একেবারেই না আর ১০০ মানে হল সর্ব পরিমাণে)
      </NoteText>
  
      <ActionsContainer>
        <Button
          type="outline"
          onPress={handleBack}
          title="Back"
          disabled={count === 0}
        />
        <Button
          type={count === NUMBER_OF_QUESTIONS - 1 ? 'solid' : 'outline'}
          onPress={handleNext}
          title={count === NUMBER_OF_QUESTIONS - 1 ? 'Finish' : 'Next' }
        />
      </ActionsContainer>
    </Container>
  );
}