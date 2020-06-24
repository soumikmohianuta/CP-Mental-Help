import React, { useState } from "react";
import {
  Button,
  ProgressBar,
  Colors,
  Subheading,
  HelperText,
  TextInput,
} from "react-native-paper";

import { questionnaires } from "./contents";
import { ScrollView } from "react-native";

const NUMBER_OF_QUESTIONS = 5;

export const MentalHealthRatingScreen = ({ onFinish }: any) => {
  const [answers, setAnswers] = useState([20, 30, 40, 50, 20]);
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [count, setCount] = useState(0);

  const handleSlideComplete = (ans: any) => {
    setCurrentAnswer(ans);
  };

  const handleNext = () => {
    if (count === NUMBER_OF_QUESTIONS - 1) {
      onFinish && onFinish("MentalHealthMeasureList");
    } else {
      const newAnswers = [...answers];
      newAnswers[count] = currentAnswer;
      setAnswers(newAnswers);
      setCount(count + 1);
    }
  };
  const handleBack = () => {
    setCount(count - 1);
  };

  return (
    <ScrollView>
      <ProgressBar
        progress={(count + 1) / NUMBER_OF_QUESTIONS}
        color={Colors.red800}
      />
      <Subheading>{questionnaires[count]}</Subheading>
      <TextInput
        mode="flat"
        defaultValue={answers[count]}
        value={answers[count]}
        onChangeText={handleSlideComplete}
      />
      <HelperText>
        যেখানে ০ মানে হল একেবারেই না আর ১০০ মানে হল সর্ব পরিমাণে
      </HelperText>
      <Button onPress={handleBack} disabled={count === 0}>
        পূর্বে
      </Button>
      <Button onPress={handleNext}>
        {count === NUMBER_OF_QUESTIONS - 1 ? "শেষ করুন" : "পরবর্তী"}
      </Button>
    </ScrollView>
  );
};
