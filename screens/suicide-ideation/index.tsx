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
import { RadioButtonGroup } from "../../components/radio-button-group";
import {
  questions,
} from "./contents";
import firebase from "firebase";
import {storeUserInfo} from '../../storage';
import {AuthContext, UserContext} from '../../context';

export const SuicideIdeationProfile = ({ navigation }: any) => {
  const NUMBER_OF_QUESTIONS = questions.length;
  const [count, setCount] = useState<number>(0);

  const [anySuicideThought, SetSuicideThought] = useState("");
  const [anySuicidePlan, SetAnySuicidePlan] = useState("");
  const [anySuicideAttempt, SetAnySuicideAttempt] = useState("");

  const {userName} = React.useContext(UserContext);

  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [currentAnswers, setCurrentAnswers] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async() => {

    setLoading(true);
    const userData = {
      anySuicideThought: anySuicideThought,
      anySuicidePlan: anySuicidePlan,
      anySuicideAttempt: anySuicideAttempt
    };

    try{
      firebase
        .database()
        .ref(userName+"/MentalProfile/SuicideIdeationProfile")
        .set(userData);
      
        if( anySuicideThought == "Yes"){
          navigation.navigate("SuicidalIdeationHelp");
        }
        else{
          var MentalProfileState = 2;
          navigation.navigate("Profile",{MentalProfileState});
        }
      }

        catch{
          alert('সাবমিট করা যাচ্ছে না');
      } 
      setLoading(false);
  };



  const handlePrevious = () => {
    if(count==1){
        setCurrentAnswers(anySuicideThought);
    }
    else {
        setCurrentAnswers(anySuicidePlan);
    }
    setCount(count - 1);
    setShowSubmit(false);
  }


  if (loading) {
    return <ActivityIndicator />;
  }

  const onAnswerSelect = (value: string) => {
      setCurrentAnswers("");
    if(count==0){
      
        SetSuicideThought(value);
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
        SetAnySuicidePlan(value);
        setTimeout(() => {
          setCount(count + 1);
        }, 250);
      }

    else{
      SetAnySuicideAttempt(value);
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
