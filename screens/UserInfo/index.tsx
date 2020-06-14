import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { useForm,Controller } from "react-hook-form";
import { View,ScrollView,KeyboardAvoidingView,TextInput,SafeAreaView,TouchableOpacity,ActivityIndicator,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Text, Button, Input,ButtonGroup,CheckBox  } from 'react-native-elements';
import {RadioButton} from '../../components/radio-button';
import { SexCategory, MaritalStatus,CurrentLocation,SymptomPresentSelf,SymptomPresenetOthers ,MentalHealthProblemBeforeCorona , KindofTreatment , MentalHealthProblemAfterCorona   } from './contents';
import  firebase from 'firebase';
import {AuthContext} from '../../context/AuthContext';

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;


const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding: 10px 10px;
  margin-bottom: 15; 
`;

const ErrorText = styled(Text)`
  color: red;
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
`;


export const UserInfo = ({ navigation }: any) => {

  const {saveUserData,user} = React.useContext(AuthContext);
  const { control, handleSubmit, errors } = useForm();
 
  const [ErrorMsg, SetErrorMsg] = React.useState("");
  const [age, SetAge] = React.useState(0);
  const [sex, SetSex] = React.useState("");
  const [maritalStatus, SetMaritalStatus] = React.useState("");
  const [anySymptom, SetAnySymptom] = React.useState(0);
  const [anyRelativeWithSymptom, SetAnyRelativeWithSymptom] = React.useState(0);
  const [address, SetAddress] = React.useState(0);
  const [anyPrevSymptom, SetAnyPrevSymptom] = React.useState(0);
  const [anyMentalHelp, SetAnyMentalHelp] = React.useState(0);
  const [anyAfterSymptom, SetAnyAfterSymptom] = React.useState(0);
  const [anyAfterMentalhelp, SetAnyAfterMentalhelp] = React.useState(0);
  const [mediumToKnow, SetMediumToKnow] = React.useState(0);


  const onSubmit = (data: Record<string, any>) => {
    if(ErrorMsg!=""){
      alert("Incomplete Information");
    }

    else{
      firebase.database().ref(user.user.uid).child("Email").set(user.user.emai);
      firebase.database().ref(user.user.uid).child("Age").set(age);
      firebase.database().ref(user.user.uid).child("Sex").set(sex);
      firebase.database().ref(user.user.uid).child("maritalStatus").set(maritalStatus);
      firebase.database().ref(user.user.uid).child("address").set(address);
      firebase.database().ref(user.user.uid).child("cSymptom").set(anySymptom);
      firebase.database().ref(user.user.uid).child("rSymptom").set(anyRelativeWithSymptom);
      firebase.database().ref(user.user.uid).child("anyPrevSymptom").set(anyPrevSymptom);
      firebase.database().ref(user.user.uid).child("anyMentalHelp").set(anyMentalHelp);
      firebase.database().ref(user.user.uid).child("anyAfterSymptom").set(anyAfterSymptom);
      firebase.database().ref(user.user.uid).child("anyAfterMentalhelp").set(anyAfterMentalhelp);
      firebase.database().ref(user.user.uid).child("mediumToKnow").set(mediumToKnow);
      saveUserData();
    }

  }

  const renderError = (curAge:any) => {
  
    if (isNaN(curAge)){
      SetErrorMsg("Enter a Number");
    }

    else if(10>Number(curAge) || 100<Number(curAge)){
       SetErrorMsg("Not a valid Age");
    }
    else{
      SetAge(curAge);
      SetErrorMsg("");
    }
  }
  
  const checkSetSex = (value: any) => {
    SetSex(value); 
  }
  
  const CheckSetMaritalStatus = (value: any) => {
    SetMaritalStatus(value); 
  }

  const CheckSetAnySymptom = (value: any) => {
    SetAnySymptom(value); 
  }

  const CheckSetAnyRelativeWithSymptom = (value: any) => {
    SetAnyRelativeWithSymptom(value); 
  }

  const CheckSetAddress = (value: any) => {
    SetAddress(value); 
  }

  const CheckSetAnyPrevSymptom = (value: any) => {
    SetAnyPrevSymptom(value); 
  }

  const CheckSetAnyMentalHelp = (value: any) => {
    SetAnyMentalHelp(value); 
  }

  const CheckSetAnyAfterSymptom = (value: any) => {
    SetAnyAfterSymptom(value); 
  }

  const CheckSetAnyAfterMentalhelp = (value: any) => {
    SetAnyAfterMentalhelp(value); 
  }

  const CheckSetMediumToKnow = (value: any) => {
    SetMediumToKnow(value); 
  }



  return (
  
  <SafeAreaView style={{ flex: 1 }}>
      <Container behavior="padding">
        <Text style={{ fontSize: 32, fontWeight: "700", color: "gray" }}>
          মন ও বিজ্ঞান
        </Text>
        <ScrollContainer>
        <ScrollContent>
            <FieldContainer>• বয়স </FieldContainer>
            <Controller
                as={Input}
                control={control}
                name="age"
                onChange={args => renderError(args[0].nativeEvent.text)}
                rules={{ required: true }}
                defaultValue="0"
                placeholder="Age"
            />
             <ErrorText>{ErrorMsg}</ErrorText>
        </ScrollContent>


        <ScrollContent >
              <Button title="Submit" onPress={handleSubmit(onSubmit)} />	
        </ScrollContent>


        <ScrollContent >
            <FieldContainer>• লিঙ্গ </FieldContainer>
            {
        SexCategory.map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={checkSetSex} selected={sex}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• বৈবাহিক অবস্থা </FieldContainer>
            {
        MaritalStatus .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={CheckSetMaritalStatus} selected={maritalStatus}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• আপনি বর্তমানে কোথায় অবস্থান করছেন? </FieldContainer>
            {
        CurrentLocation .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={CheckSetAddress} selected={address}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার মধ্যে বিদ্যমান?  </FieldContainer>
            {
        SymptomPresentSelf .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={CheckSetAnySymptom} selected={anySymptom}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার কাছের মানুষদের মধ্যে বিদ্যমান?  </FieldContainer>
            {
        SymptomPresenetOthers .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={CheckSetAnyRelativeWithSymptom} selected={anyRelativeWithSymptom}/>)
        })
        }
        </ScrollContent >



        <ScrollContent >
            <FieldContainer>• করোনা পরিস্থিতি উদ্ভুত হওয়ার পূর্বে আপনার কি কোনও মানসিক স্বাস্থ্য সমস্যা দেখা দিয়েছিল?  </FieldContainer>
            {
        MentalHealthProblemBeforeCorona .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={CheckSetAnyPrevSymptom} selected={anyPrevSymptom}/>)
        })
        }
        </ScrollContent >

        <ScrollContent >
            <FieldContainer>• যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?  </FieldContainer>
            {
        KindofTreatment .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={CheckSetAnyMentalHelp} selected={anyMentalHelp}/>)
        })
        }
        </ScrollContent >


        <ScrollContent >
            <FieldContainer>• করোনা পরিস্থিতি উদ্ভুত হওয়ার পরে/ এই পরিস্থিতির কারণে আপনার কি কোনও মানসিক স্বাস্থ্য সমস্যা দেখা দিয়েছে?  </FieldContainer>
            {
        MentalHealthProblemAfterCorona  .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={CheckSetAnyAfterSymptom} selected={anyAfterSymptom}/>)
        })
        }
        </ScrollContent >


        
        <ScrollContent >
            <FieldContainer>• যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?  </FieldContainer>
            {
        KindofTreatment.map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={CheckSetAnyAfterMentalhelp} selected={anyAfterMentalhelp}/>)
        })
        }
        </ScrollContent >


        <ScrollContent >
            <FieldContainer> Process to know </FieldContainer>
            {
        KindofTreatment .map((q: any) => {
          return(<RadioButton key={q.label} label={q.label} value={q.value} onSelecting={CheckSetMediumToKnow} selected={mediumToKnow}/>)
        })
        }
        </ScrollContent >

        <ScrollButtonContent >
              <Button  title="Submit" onPress={handleSubmit(onSubmit)} />	
        </ScrollButtonContent>


        </ScrollContainer>
      </Container>
    </SafeAreaView>
  );
}


