import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  TextInput,
} from "react-native-paper";
import { RadioButton } from "../../components/radio-button";
import {
  SexCategory,
  MaritalStatus,
  CurrentLocation,
  SymptomPresentSelf,
  SymptomPresenetOthers,
  MentalHealthProblemBeforeCorona,
  KindofTreatment,
  MentalHealthProblemAfterCorona,
} from "./contents";
import firebase from "firebase";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

const Container = styled(View)`
  flex: 7;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled(Image)`
  flex: 1;
  height: undefined;
  width: 80%;
  flex-direction: column;
  align-self: center;
  resize-mode: contain;
`;

const ImageViewContainer = styled(View)`
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
  color: #b82204;
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
  color: #746f6e;
`;

const ButtonContainer = styled(View)`
  background-color: #af2008;
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
  letter-spacing: 0.5;
`;

export const UserInfo = ({ navigation }: any) => {
  var appLogo = require("../../Images/QLife.png");
  const { saveUserData } = useContext(AuthContext);
  const { control, handleSubmit, errors } = useForm();

  const [ErrorMsg, SetErrorMsg] = useState("Not a valid Age");
  const [age, SetAge] = useState(0);
  const [sex, SetSex] = useState("");
  const [maritalStatus, SetMaritalStatus] = useState("");
  // const [anySymptom, SetAnySymptom] = useState("");
  // const [anyRelativeWithSymptom, SetAnyRelativeWithSymptom] = useState("");
  const [address, SetAddress] = useState("");
  // const [anyPrevSymptom, SetAnyPrevSymptom] = useState("");
  // const [anyMentalHelp, SetAnyMentalHelp] = useState("");
  // const [anyAfterSymptom, SetAnyAfterSymptom] = useState("");
  // const [anyAfterMentalhelp, SetAnyAfterMentalhelp] = useState("");
  // const [mediumToKnow, SetMediumToKnow] = useState("");

  const userID = useSelector((state) => state.loginReducer.userId);
  const eMail = useSelector((state) => state.loginReducer.email);

  const onSubmit = () => {
    if (ErrorMsg != "" || sex == "" || maritalStatus == "" || address == "") {
      alert("Incomplete Information");
    } else {
      const userData = {
        Email: eMail,
        Age: age,
        Sex: sex,
        maritalStatus: maritalStatus,
        address: address,
      };

      firebase
        .database()
        .ref("DemoGraphy/" + userID)
        .set(userData);
      saveUserData();
    }
  };

  const renderError = (curAge: any) => {
    if (isNaN(curAge)) {
      SetErrorMsg("Enter a Number");
    } else if (10 > Number(curAge) || 100 < Number(curAge)) {
      SetErrorMsg("Not a valid Age");
    } else {
      SetAge(curAge);
      SetErrorMsg("");
    }
  };

  const checkSetSex = (value: any) => {
    SetSex(value);
  };

  const CheckSetMaritalStatus = (value: any) => {
    SetMaritalStatus(value);
  };

  const CheckSetAddress = (value: any) => {
    SetAddress(value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageViewContainer>
        <ImageContainer source={appLogo} />
      </ImageViewContainer>
      <Container>
        <ScrollContainer>
          <ScrollContent>
            <FieldContainer>• বয়স </FieldContainer>
            <Controller
              as={TextInput}
              control={control}
              name="age"
              onChange={(args) => renderError(args[0].nativeEvent.text)}
              rules={{ required: true }}
              defaultValue="0"
              placeholder="Age"
            />
            <ErrorText>{ErrorMsg}</ErrorText>
          </ScrollContent>

          <ScrollContent>
            <FieldContainer>• লিঙ্গ </FieldContainer>
            {SexCategory.map((q: any) => {
              return (
                <RadioButton
                  key={q.label}
                  label={q.label}
                  value={q.value}
                  onSelecting={checkSetSex}
                  selected={sex}
                />
              );
            })}
          </ScrollContent>

          <ScrollContent>
            <FieldContainer>• বৈবাহিক অবস্থা </FieldContainer>
            {MaritalStatus.map((q: any) => {
              return (
                <RadioButton
                  key={q.label}
                  label={q.label}
                  value={q.value}
                  onSelecting={CheckSetMaritalStatus}
                  selected={maritalStatus}
                />
              );
            })}
          </ScrollContent>

          <ScrollContent>
            <FieldContainer>
              • আপনি বর্তমানে কোন বিভাগে অবস্থান করছেন?{" "}
            </FieldContainer>
            {CurrentLocation.map((q: any) => {
              return (
                <RadioButton
                  key={q.label}
                  label={q.label}
                  value={q.value}
                  onSelecting={CheckSetAddress}
                  selected={address}
                />
              );
            })}
          </ScrollContent>

          <ScrollButtonContent>
            <TouchableOpacityContainer onPress={() => onSubmit()}>
              <ButtonContainer>
                <ButtonTextStyle>Submit</ButtonTextStyle>
              </ButtonContainer>
            </TouchableOpacityContainer>
          </ScrollButtonContent>
        </ScrollContainer>
      </Container>
    </SafeAreaView>
  );
};
