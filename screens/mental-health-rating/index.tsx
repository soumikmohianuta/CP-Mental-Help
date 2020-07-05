import React, { useState } from "react";
import {
  Button,
  ProgressBar,
  Colors,
  Headline,
  HelperText,
  Title,
  Appbar,
  Subheading,
} from "react-native-paper";

import { questionnaires } from "./contents";
import { View, Dimensions } from "react-native";
import { setUserData } from "../../services/firebase";
import CircularPicker from "../../components/circle-picker";

const NUMBER_OF_QUESTIONS = 5;

export const MentalHealthRatingScreen = ({ navigation, onFinish }: any) => {
  const [answers, setAnswers] = useState([0, 0, 0, 0, 0]);
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [count, setCount] = useState(0);

  const handleSlideComplete = (ans: any) => {
    setCurrentAnswer(parseInt(ans, 10) + 1);
  };

  const handleNext = async () => {
    if (count === NUMBER_OF_QUESTIONS - 1) {
      // TODO: usrId will be retrieved from auth token
      await setUserData(`/mental-health-rating/${1}`, {
        answers
      });
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
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')}  />
        <Appbar.Content title="How's you feeling?" />
      </Appbar.Header>
      <View style={{ margin: 12, marginTop: 32 }}>
        <Subheading style={{ marginBottom: 12 }}> QUESTIONS {count + 1} of {NUMBER_OF_QUESTIONS}</Subheading>
        <ProgressBar
          progress={(count + 1) / NUMBER_OF_QUESTIONS}
          color={Colors.red800}
          style={{ marginBottom: 24 }}
        />
        <Headline>{questionnaires[count]}</Headline>
        <CircularPicker
          size={Dimensions.get('window').width - 48}
          gradients={{
            0: ['rgb(255, 97, 99)', 'rgb(247, 129, 119)'],
          }}
          onChange={handleSlideComplete}
        >
          <Title style={{ fontSize: 30, textAlign: 'center' }}>{currentAnswer}</Title>
        </CircularPicker>
        <HelperText style={{ marginBottom: 24 }}>
          যেখানে ০ মানে হল একেবারেই না আর ১০০ মানে হল সর্ব পরিমাণে
        </HelperText>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            onPress={handleBack}
            disabled={count === 0}
          >
            Previous
          </Button>
          <Button onPress={handleNext}>
            {count === NUMBER_OF_QUESTIONS - 1 ? "Submit" : "Next"}
          </Button>
        </View>
      </View>
    </>
  );
};
