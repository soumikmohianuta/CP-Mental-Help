import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Headline,
  Appbar,
  ProgressBar,
  Subheading,
  Colors,
  ActivityIndicator
} from "react-native-paper";
import { RadioButtonGroup } from "../../../components/radio-button-group";
import {
  questions,
} from "./contents";
import firebase from "firebase";
import { storeUserInfo } from '../../../storage';
import { AuthContext, UserContext } from '../../../context';
import { MENTAL_PROFILE_MAPPER } from '../contents';
import {corona_answers} from './contents';
import {setProfileState} from '../../../services/firebase'
import { isNetworkAvailable } from '../../../utils/network';
import { useFocusEffect } from '@react-navigation/native';
export const CoronaProfile = ({ navigation }: any) => {
  const NUMBER_OF_QUESTIONS = questions.length;
  const [count, setCount] = useState<number>(0);

  const [answers, SetAnswers] = useState(corona_answers);
  const { userName } = React.useContext(UserContext);
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [currentAnswers, setCurrentAnswers] = useState("");
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
    }, [])
  );

  const handleSubmit = async () => {

    setLoading(true);
    var submitSuccess = true;
    try {
      const isConnected = await isNetworkAvailable();
      if (isConnected) {
        await setProfileState(userName, 'corona_profile', answers);   
      }
      else{
        throw new Error("Net") ;
      }
       
    }

    catch (e){
      if(e.message =='Net'){
        alert('ইন্টারনেট সংযোগ নেই,সাবমিট করা যাচ্ছে না');
      }
      else{
        alert('সাবমিট করা যাচ্ছে না');
      }
      submitSuccess = false;
      setLoading(false);
    }
    finally{

        if (answers[0].answer == "Yes" || answers[1].answer == "Yes") {
            navigation.navigate("CoronaExcercise", {submit:submitSuccess });
            
        }
        else {
          const mentalProfile = MENTAL_PROFILE_MAPPER.CoronaProfile;
          navigation.navigate("Profile", { profile: mentalProfile, submit:submitSuccess });
        }
      
    }

  };



  const handlePrevious = () => {
    setCurrentAnswers(answers[count - 1].answer);

    setCount(count - 1);
    setShowSubmit(false);
  }


  if (loading) {
    return <ActivityIndicator />;
  }

  const onAnswerSelect = (value: string) => {
    setCurrentAnswers("");
    answers[count].answer = value;
    if (count == questions.length - 1){
      setShowSubmit(true);
    }
    else if (count == 1 && answers[0].answer =='No' && answers[1].answer =='No' ){
        setShowSubmit(true);
    }

    else {
    setTimeout(() => {
      setCount(count + 1);
    }, 250);
  }
}


return (
  <>
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate('Profile')} />
      <Appbar.Content title="করোনা সম্পর্কীয়" />
    </Appbar.Header>
    <ScrollView style={{ margin: 12 }}>
      <Subheading style={{ marginTop: 12, marginBottom: 12 }}> QUESTIONS {count + 1} of {NUMBER_OF_QUESTIONS}</Subheading>
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
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 120,
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
          showSubmit  ?
            <Button onPress={handleSubmit} mode="contained"> Submit </Button>
            : null
        }
      </View>

    </ScrollView>


  </>
);
};
