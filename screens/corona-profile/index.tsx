import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Headline, Button, Appbar } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse, KindofTreatment } from "../profile/contents";
import firebase from "firebase";
import {UserContext} from '../../context';
export const CoronaProfile = ({ navigation }: any) => {
  const [anySymptom, SetAnySymptom] = useState("");
  const [anyRelativeWithSymptom, SetAnyRelativeWithSymptom] = useState(
    ""
  );
  const [anyPrevSymptom, SetAnyPrevSymptom] = useState("");
  const [anyMentalHelp, SetAnyMentalHelp] = useState("");
  const [anyAfterSymptom, SetAnyAfterSymptom] = useState("");
  const [anyAfterMentalhelp, SetAnyAfterMentalhelp] = useState("");

  const {userName} = React.useContext(UserContext);
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
        .ref(userName+"/MentalProfile/CoronaProfile")
        .set(userData);
      navigation.navigate("Profile");
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
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Profile')}  />
        <Appbar.Content title="Corona Information" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>
        <Headline>
          করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার
          মধ্যে বিদ্যমান?
        </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnySymptom}
        />
        <Headline>
          করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার
          কাছের মানুষদের মধ্যে বিদ্যমান?
        </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyRelativeWithSymptom}
        />
        <Headline>
          করোনা পরিস্থিতি উদ্ভুত হওয়ার পূর্বে আপনার কি কোনও মানসিক
          স্বাস্থ্য সমস্যা দেখা দিয়েছিল?
        </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyPrevSymptom}
        />
        <Headline>
          যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?
        </Headline>
        <RadioButtonGroup
          options={KindofTreatment}
          onSelect={checkSetAnyMentalHelp}
        />
        <Headline>
          করোনা পরিস্থিতি উদ্ভুত হওয়ার পরে/ এই পরিস্থিতির কারণে আপনার কি
          কোনও মানসিক স্বাস্থ্য সমস্যা দেখা দিয়েছে?
        </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyAfterSymptom}
        />
        <Headline>
          যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?
        </Headline>
        <RadioButtonGroup
          options={KindofTreatment}
          onSelect={checkSetAnyAfterMentalhelp}
        />
        <Button onPress={onSubmit} mode="contained"> Submit </Button>
      </ScrollView>
    </>
  );
};
