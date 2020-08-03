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
  Text,
} from "react-native-paper";

import { questionnaires } from "./contents";
import { View, Dimensions } from "react-native";
import { setMentalState } from "../../services/firebase";
import CircularPicker from "../../components/circle-picker";
import {setPreSurvey} from '../../storage';
import {UserContext} from '../../context';
const NUMBER_OF_QUESTIONS = 5;

export const MentalHealthRatingScreen = ({ route, navigation }: any) => {
  const [answers, setAnswers] = useState([0, 0, 0, 0, 0]);
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [count, setCount] = useState(0);
  const { navigateTo } = route.params;
  const {userName} = React.useContext(UserContext);
  const handleSlideComplete = (ans: any) => {
    setCurrentAnswer(parseInt(ans, 10) + 1);
  };

  const handleNext = async () => {
    if (count === NUMBER_OF_QUESTIONS - 1) {
      // TODO: usrId will be retrieved from auth token
      await setMentalState(userName,answers);
      await setPreSurvey();
      navigation.navigate(navigateTo)
    } else {
      const newAnswers = [...answers];
      newAnswers[count] = currentAnswer;
      setAnswers(newAnswers);
      setCurrentAnswer(newAnswers[count + 1]);
      setCount(count + 1);
    }
  };
  const handleBack = () => {
    setCurrentAnswer(answers[count - 1]);
    setCount(count - 1);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')}  />
        <Appbar.Content title="আপনি কেমন অনুভব করছেন?" />
      </Appbar.Header>
      <View style={{ margin: 12, marginTop: 32 }}>
        <Subheading style={{ marginBottom: 12 }}> QUESTIONS {count + 1} of {NUMBER_OF_QUESTIONS}</Subheading>
        <ProgressBar
          progress={(count + 1) / NUMBER_OF_QUESTIONS}
          color={Colors.red800}
          style={{ marginBottom: 24 }}
        />
        {
          questionnaires.map((question, index) => {
            return index != count ?
             null
             :
             <>
              <Headline>{question}</Headline>
              <CircularPicker
                size={256}
                defaultPos={currentAnswer}
                onChange={handleSlideComplete}
              >
                <Text style={{ fontSize: 76 }}>
                  {currentAnswer}
                </Text>
              </CircularPicker>
             </>
          })
        }
        <HelperText style={{ marginBottom: 24 }}>
          যেখানে ০ মানে হল একেবারেই না আর ১০০ মানে হল সর্ব পরিমাণে
        </HelperText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
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
