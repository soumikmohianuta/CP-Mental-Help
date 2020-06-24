import React, { useState } from 'react';
import { Button } from 'react-native-paper';
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
import { ScrollView } from 'react-native';

const NUMBER_OF_QUESTIONS = 5;

export const MentalHealthRatingScreen = ({ navigation }: any) => {
  const [answers, setAnswers] = useState([20, 30, 40, 50, 20]);
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [count, setCount] = useState(0);

  const handleSlideComplete = (ans: any) => {
    setCurrentAnswer(ans);
  }

  const handleNext = () => {
    if (count === NUMBER_OF_QUESTIONS - 1) {
      navigation.navigate('MentalHealthMeasureList');
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
    <ScrollView>
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
          <Button onPress={handleBack} disabled={count === 0}>
            পূর্বে
          </Button>
          <Button onPress={handleNext}>
            {count === NUMBER_OF_QUESTIONS - 1 ? 'শেষ করুন' : 'পরবর্তী' }
          </Button>
        </ActionsContainer>
      </Container>
    </ScrollView>
  );
}