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

export const PsychoticProfile = ({ navigation }: any) => {
  var appLogo =  require('../../Images/QLife.png');
  const { control, handleSubmit, errors } = useForm();
 

  const [anyHarmByOther, SetAnyHarmByOther] = React.useState("");
  const [anyControlByOther, SetAnyControlByOther] = React.useState("");
  const [anyAbnoramality, SetAnyAbnoramality] = React.useState("");
  const [anyFeeling, SetAnyFeeling] = React.useState("");



  const userID = useSelector(state => state.loginReducer.userId);

  const onSubmit = () => {

    if( anyHarmByOther=="" || anyControlByOther=="" ||anyAbnoramality=="" ||anyFeeling==""){
      alert("Incomplete Information");
    }

   else{
      const userData = {      "anyHarmByOther":anyHarmByOther,
                              "anyControlByOther":anyControlByOther,
                              "anyAbnoramality":anyAbnoramality,
                              "anyFeeling":anyFeeling};
              
                              
      firebase.database().ref("MentalProfile/"+userID+"/PsychoticProfile").set(userData);
      navigation.navigate("MentalProfile");
    
    }

  }

  
  const checkSetAnyHarmByOther = (value: any) => {

    SetAnyHarmByOther(value); 
  }
  
  const checkSetAnyControlByOther = (value: any) => {

    SetAnyControlByOther(value); 
  }
  
  const checkSetAnyAbnoramality = (value: any) => {

    SetAnyAbnoramality(value); 
  }
  
  const checkSetSetAnyFeeling = (value: any) => {

    SetAnyFeeling(value); 
  }
  
  

  
  return (
  
  <SafeAreaView style={{ flex: 1 }}>
     <ImageViewContainer>
          <ImageContainer   source={appLogo} />
      </ImageViewContainer>
      <Container >
        <ScrollContainer>

        <ScrollContent >
            <FieldContainer>• আপনার কি মনে হয় মানুষ ইচ্ছাকৃত ভাবে আপনার ক্ষতি করতে চাচ্ছে অথবা আপনার বিরুদ্ধে ষড়যন্ত্র করছে?  </FieldContainer>
            {
        YesNoResponse.map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnyHarmByOther} selected={anyHarmByOther}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• আপনার কি মনে হয় কোন কিছু বা অন্য কোন ব্যক্তি আপনার চিন্তাগুলোকে সরাসরি নিয়ন্ত্রণ করছে?  </FieldContainer>
            {
        YesNoResponse .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnyControlByOther} selected={anyControlByOther}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• আপনার কি এরকম মনে হয় যে অস্বাভাবিক কিছু একটা ঘটছে, তবে অন্য কেউ বিশ্বাস করছে না?  </FieldContainer>
            {
        YesNoResponse .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetAnyAbnoramality} selected={anyAbnoramality}/>)
        })
        }
        </ScrollContent >


        <ScrollContent >
            <FieldContainer>• আপনি কি এমন কিছু দেখতে, শুনতে বা অনুভব করতে পারেন যেটা অন্য কেউ পারেনা?  </FieldContainer>
            {
        KindofTreatment .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetSetAnyFeeling} selected={anyFeeling}/>)
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


