import React, { useState } from "react";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse, KindofTreatment } from "./contents";
import firebase from "firebase";

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


const ScrollContent = styled(View)`
  width: 100%;
  margin-top: 5;
  margin-bottom: 5;
`;

const FieldContainer = styled(Text)`
  margin-top: 20;
  font-size: 20;
  align-items: center;
  color: #746f6e;
`;

export const CoronaProfile = ({ navigation }: any) => {
  var appLogo = require("../../Images/QLife.png");
  const { control, handleSubmit, errors } = useForm();

  const [anySymptom, SetAnySymptom] = useState("");
  const [anyRelativeWithSymptom, SetAnyRelativeWithSymptom] = useState(
    ""
  );
  const [anyPrevSymptom, SetAnyPrevSymptom] = useState("");
  const [anyMentalHelp, SetAnyMentalHelp] = useState("");
  const [anyAfterSymptom, SetAnyAfterSymptom] = useState("");
  const [anyAfterMentalhelp, SetAnyAfterMentalhelp] = useState("");

  // const userID = useSelector(state => state.loginReducer.userId);
  const [userID, SetUserID] = React.useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");
  const onSubmit = () => {
    if (
      anySymptom == "" ||
      anyRelativeWithSymptom == "" ||
      anyPrevSymptom == "" ||
      anyMentalHelp == "" ||
      anyAfterSymptom == "" ||
      anyAfterMentalhelp == ""
    ) {
      alert("Incomplete Information");
    } else {
      const userData = {
        anySymptom: anySymptom,
        anyRelativeWithSymptom: anyRelativeWithSymptom,
        anyPrevSymptom: anyPrevSymptom,
        anyMentalHelp: anyMentalHelp,
        anyAfterSymptom: anyAfterSymptom,
        anyAfterMentalhelp: anyAfterMentalhelp,
      };

      firebase
        .database()
        .ref("MentalProfile/" + userID + "/CoronaProfile")
        .set(userData);
      navigation.navigate("MentalProfile");
    }
  };

  const checkSetAnySymptom = (value: any) => {
    SetAnySymptom(value);
  };

  const checkSetAnyRelativeWithSymptom = (value: any) => {
    SetAnyRelativeWithSymptom(value);
  };

  const checkSetAnyPrevSymptom = (value: any) => {
    SetAnyPrevSymptom(value);
  };

  const checkSetAnyMentalHelp = (value: any) => {
    SetAnyMentalHelp(value);
  };

  const checkSetAnyAfterSymptom = (value: any) => {
    SetAnyAfterSymptom(value);
  };

  const checkSetAnyAfterMentalhelp = (value: any) => {
    SetAnyAfterMentalhelp(value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageViewContainer>
        <ImageContainer source={appLogo} />
      </ImageViewContainer>
      <Container>
        <ScrollContainer>
          <ScrollContent>
            <FieldContainer>
              • করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার
              মধ্যে বিদ্যমান?{" "}
            </FieldContainer>
            <RadioButtonGroup
              options={YesNoResponse}
              onSelect={checkSetAnySymptom}
            />
          </ScrollContent>

          <ScrollContent>
            <FieldContainer>
              • করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার
              কাছের মানুষদের মধ্যে বিদ্যমান?{" "}
            </FieldContainer>
            <RadioButtonGroup
              options={YesNoResponse}
              onSelect={checkSetAnyRelativeWithSymptom}
            />
          </ScrollContent>
          <ScrollContent>
            <FieldContainer>
              • করোনা পরিস্থিতি উদ্ভুত হওয়ার পূর্বে আপনার কি কোনও মানসিক
              স্বাস্থ্য সমস্যা দেখা দিয়েছিল?{" "}
            </FieldContainer>
            <RadioButtonGroup
              options={YesNoResponse}
              onSelect={checkSetAnyPrevSymptom}
            />
          </ScrollContent>

          <ScrollContent>
            <FieldContainer>
              • যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?{" "}
            </FieldContainer>
            <RadioButtonGroup
              options={KindofTreatment}
              onSelect={checkSetAnyMentalHelp}
            />
          </ScrollContent>

          <ScrollContent>
            <FieldContainer>
              • করোনা পরিস্থিতি উদ্ভুত হওয়ার পরে/ এই পরিস্থিতির কারণে আপনার কি
              কোনও মানসিক স্বাস্থ্য সমস্যা দেখা দিয়েছে?{" "}
            </FieldContainer>
            <RadioButtonGroup
              options={YesNoResponse}
              onSelect={checkSetAnyAfterSymptom}
            />
          </ScrollContent>

          <ScrollContent>
            <FieldContainer>
              • যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?{" "}
            </FieldContainer>
            <RadioButtonGroup
              options={KindofTreatment}
              onSelect={checkSetAnyAfterMentalhelp}
            />
          </ScrollContent>
          <Button onPress={onSubmit}>
              Submit
          </Button>
        </ScrollContainer>
      </Container>
    </SafeAreaView>
  );
};
