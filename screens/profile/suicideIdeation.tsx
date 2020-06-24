import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { useForm,Controller } from "react-hook-form";
import { View,ScrollView,Image,TextInput,SafeAreaView,TouchableOpacity,ActivityIndicator,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Text, Button, Input,ButtonGroup,CheckBox  } from 'react-native-elements';
import {RadioButton} from '../../components/radio-button';
import { YesNoResponse, KindofTreatment  } from './contents';
import  firebase from 'firebase';
import {AuthContext} from '../../context/AuthContext';
import {useSelector  } from 'react-redux';


const Container = styled(View)`
  flex: 7;
  flex-direction: column;
  align-items: center;
`;


const ImageContainer = styled(Image )`
  flex: 1;
  height: undefined;
  width: 80%;
  flex-direction: column;
  align-self: center;
  resize-mode: contain;
`;

const ImageViewContainer = styled(View )`
  flex: 2;
  flex-direction: column;
  align-items: center;
`;


const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding: 10px 10px;
  margin-bottom: 15; 
`;

const ErrorText = styled(Text)`
  color: #B82204;
  padding: 0px 0px;
`;
 
const ScrollContent = styled(View)`
  width: 100%;
  margin-top: 5; 
  margin-bottom: 5; 
`;
const ScrollButtonContent = styled(View)`
  width: 100%;
  margin-top: 5; 
  margin-bottom: 25; 
`;

const FieldContainer = styled(Text)`
  margin-top: 20;
  font-size: 20;
  align-items: center;
  color: #746F6E;
`;



const ButtonContainer = styled(View)`
      background-color: #AF2008;
      height: 44;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 22;
      border-width: 1;
      border-color: #707070;
`;


const TouchableOpacityContainer = styled(TouchableOpacity)`
  width: 100%;
  margin-top: 5;
`;

const ButtonTextStyle = styled(Text)`
  font-size: 16;
  letter-spacing: 0.5
`;

export const SuicideIdeationProfile = ({ navigation }: any) => {
  var appLogo =  require('../../Images/QLife.png');
  const { control, handleSubmit, errors } = useForm();
 

  const [anySuicideThought, SetSuicideThought] = React.useState("");
  const [anySuicidePlan, SetAnySuicidePlan] = React.useState("");
  const [anySuicideAttempt, SetAnySuicideAttempt] = React.useState("");

  //const userID = useSelector(state => state.loginReducer.userId);
  const [userID, SetUserID] = React.useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");
  const onSubmit = () => {

    if( anySuicideThought=="" || anySuicidePlan=="" ||anySuicideAttempt==""){
      alert("Incomplete Information");
    }

   else{
      const userData = {      "anySuicideThought":anySuicideThought,
                              "anySuicidePlan":anySuicidePlan,
                              "anySuicideAttempt":anySuicideAttempt};
              

      firebase.database().ref("MentalProfile/"+userID+"/SuicideIdeation").set(userData);
      navigation.navigate("MentalProfile");
    
    }

  }

  
  const checkSetSuicideThought = (value: any) => {

    SetSuicideThought(value); 
  }
  
  const checkSetAnySuicidePlan = (value: any) => {

    SetAnySuicidePlan(value); 
  }
  
  const checkSetAnySuicideAttempt = (value: any) => {

    SetAnySuicideAttempt(value); 
  }
  
 

  
  return (
  
  <SafeAreaView style={{ flex: 1 }}>
     <ImageViewContainer>
          <ImageContainer   source={appLogo} />
      </ImageViewContainer>
      <Container >
        <ScrollContainer>

        <ScrollContent >
            <FieldContainer>• আপনি কি আত্মহত্যার কথা ভাবেন??  </FieldContainer>
            {
        YesNoResponse.map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetSuicideThought} selected={anySuicideThought}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• আত্মহত্যার করার কোন পরিকল্পনা করেছিলেন?  </FieldContainer>
            {
        YesNoResponse .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnySuicidePlan} selected={anySuicidePlan}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• আগে কখনো আত্মহত্যা করার চেষ্টা করেছিলেন কি?  </FieldContainer>
            {
        YesNoResponse .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnySuicideAttempt} selected={anySuicideAttempt}/>)
        })
        }
        </ScrollContent >



        <ScrollButtonContent >
           <TouchableOpacityContainer 
                  onPress={() => onSubmit()}>
                <ButtonContainer>
                    <ButtonTextStyle>
                      Submit
                    </ButtonTextStyle>
                </ButtonContainer>
            </TouchableOpacityContainer>
        </ScrollButtonContent>


        </ScrollContainer>
      </Container>
    </SafeAreaView>
  );
}


