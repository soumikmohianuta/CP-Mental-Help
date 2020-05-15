import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { ProgressTracker } from '../../components/progress-tracker';
import {
  Container,
  NoteText,
  QuestionText,
  AnswerText,
  AnswerSlider,
  ActionsContainer,
} from './styled';
import { questionnaires } from './contents';

const NUMBER_OF_QUESTIONS = 5;

export const InitialQuestionnaireScreen = ({ navigation }: any) => {
  const [answers, setAnswers] = useState([20, 20, 20, 20, 20]);
  const [count, setCount] = useState(0);

  const handleSlideComplete = (ans: any) => {
    const newAnswers = [...answers];
    newAnswers[count] = ans;
    setAnswers(newAnswers);
  }

  const handleNext = () => {
    if (count === NUMBER_OF_QUESTIONS - 1) {
      navigation.navigate('Home');
    } else {
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
      <NoteText>
        (যেখানে ০ মানে হল একেবারেই না আর ১০০ মানে হল সর্ব পরিমাণে)
      </NoteText>

      <AnswerSlider
        value={answers[count]}
        minimumValue={0}
        step={1}
        maximumValue={100}
        onSlidingComplete={(val: any) => handleSlideComplete(val)}
      />
      
      <AnswerText h4>
        আমার বর্তমান অবস্থা {answers[count]}
      </AnswerText>

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