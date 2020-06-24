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

export const CoronaProfile = ({ navigation }: any) => {
  var appLogo =  require('../../Images/QLife.png');
  const { control, handleSubmit, errors } = useForm();
 

  const [anySymptom, SetAnySymptom] = React.useState("");
  const [anyRelativeWithSymptom, SetAnyRelativeWithSymptom] = React.useState("");
  const [anyPrevSymptom, SetAnyPrevSymptom] = React.useState("");
  const [anyMentalHelp, SetAnyMentalHelp] = React.useState("");
  const [anyAfterSymptom, SetAnyAfterSymptom] = React.useState("");
  const [anyAfterMentalhelp, SetAnyAfterMentalhelp] = React.useState("");


 // const userID = useSelector(state => state.loginReducer.userId);
  const [userID, SetUserID] = React.useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");
  const onSubmit = () => {

    if( anySymptom=="" || anyRelativeWithSymptom=="" ||anyPrevSymptom=="" ||anyMentalHelp=="" ||anyAfterSymptom=="" ||anyAfterMentalhelp==""  ){
      alert("Incomplete Information");
    }

   else{
      const userData = {      "anySymptom":anySymptom,
                              "anyRelativeWithSymptom":anyRelativeWithSymptom,
                              "anyPrevSymptom":anyPrevSymptom,
                              "anyMentalHelp":anyMentalHelp,
                              "anyAfterSymptom":anyAfterSymptom,
                              "anyAfterMentalhelp":anyAfterMentalhelp};
              
                              
      firebase.database().ref("MentalProfile/"+userID+"/CoronaProfile").set(userData);
      navigation.navigate("MentalProfile");
    
    }

  }

  
  const checkSetAnySymptom = (value: any) => {

    SetAnySymptom(value); 
  }
  
  const checkSetAnyRelativeWithSymptom = (value: any) => {

    SetAnyRelativeWithSymptom(value); 
  }
  
  const checkSetAnyPrevSymptom = (value: any) => {

    SetAnyPrevSymptom(value); 
  }
  
  const checkSetAnyMentalHelp = (value: any) => {

    SetAnyMentalHelp(value); 
  }
  
  const checkSetAnyAfterSymptom = (value: any) => {

    SetAnyAfterSymptom(value); 
  }
  
  const checkSetAnyAfterMentalhelp = (value: any) => {

    SetAnyAfterMentalhelp(value); 
  }
  

  
  return (
  
  <SafeAreaView style={{ flex: 1 }}>
     <ImageViewContainer>
          <ImageContainer   source={appLogo} />
      </ImageViewContainer>
      <Container >
        <ScrollContainer>

        <ScrollContent >
            <FieldContainer>• করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার মধ্যে বিদ্যমান?  </FieldContainer>
            {
        YesNoResponse.map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnySymptom} selected={anySymptom}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার কাছের মানুষদের মধ্যে বিদ্যমান?  </FieldContainer>
            {
        YesNoResponse .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnyRelativeWithSymptom} selected={anyRelativeWithSymptom}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• করোনা পরিস্থিতি উদ্ভুত হওয়ার পূর্বে আপনার কি কোনও মানসিক স্বাস্থ্য সমস্যা দেখা দিয়েছিল?  </FieldContainer>
            {
        YesNoResponse .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnyPrevSymptom} selected={anyPrevSymptom}/>)
        })
        }
        </ScrollContent >



        <ScrollContent >
            <FieldContainer>• যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?  </FieldContainer>
            {
        KindofTreatment .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnyMentalHelp} selected={anyMentalHelp}/>)
        })
        }
        </ScrollContent >


        <ScrollContent >
            <FieldContainer>• করোনা পরিস্থিতি উদ্ভুত হওয়ার পরে/ এই পরিস্থিতির কারণে আপনার কি কোনও মানসিক স্বাস্থ্য সমস্যা দেখা দিয়েছে?   </FieldContainer>
            {
        YesNoResponse .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnyAfterSymptom} selected={anyAfterSymptom}/>)
        })
        }
        </ScrollContent >


        <ScrollContent >
            <FieldContainer>• যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?  </FieldContainer>
            {
        KindofTreatment .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnyAfterMentalhelp} selected={anyAfterMentalhelp}/>)
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


