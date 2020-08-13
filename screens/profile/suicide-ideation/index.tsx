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
import { RadioButtonGroup } from '../../../components/radio-button-group';
import {
  questions,
} from "./contents";
import firebase from "firebase";
import {UserContext} from '../../../context';
import {MENTAL_PROFILE_MAPPER} from '../contents';
import {suicide_answers} from './contents';
import {setProfileState} from '../../../services/firebase'
import { isNetworkAvailable } from '../../../utils/network';
export const SuicideIdeationProfile = ({ navigation }: any) => {
  const NUMBER_OF_QUESTIONS = questions.length;
  const [count, setCount] = useState<number>(0);

 
  const [answers, SetAnswers] = useState(suicide_answers);
  const {userName} = React.useContext(UserContext);

  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [currentAnswers, setCurrentAnswers] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async() => {

    setLoading(true);
    var submitSuccess = true;

    try{
      const isConnected = await isNetworkAvailable();
        if (isConnected) {
          await setProfileState(userName, 'suicide_profile', answers);
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
      }
      finally{
        if( answers[0].answer == "Yes"){
          navigation.navigate("HelpCenterProfile",{profile:MENTAL_PROFILE_MAPPER.SuicidalIdeationProfile, submit:submitSuccess });
        }
        else{
          navigation.navigate("Profile",{profile:MENTAL_PROFILE_MAPPER.SuicidalIdeationProfile, submit:submitSuccess});
        }
        setLoading(false);
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
    if(count==0){
      
        if(value=='No'){
          setShowSubmit(true);
        }
        else{
          setShowSubmit(false);
          setTimeout(() => {
            setCount(count + 1);
          }, 250);
        }
      }
           
    else if(count==1){
        setTimeout(() => {
          setCount(count + 1);
        }, 250);
      }

    else{
        setShowSubmit(true);
    }

    }
  

  return (
    <> 
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate('Profile')}  />
      <Appbar.Content title="আত্মহত্যা পরিকল্পনা সম্পর্কীয়" />
    </Appbar.Header>
    <ScrollView style={{ margin: 12 }}>
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
            showSubmit ?
            <Button onPress={handleSubmit} mode="contained"> Submit </Button>
            : null
          }
        </View> 

      </ScrollView>

 
      </>
  );
};
