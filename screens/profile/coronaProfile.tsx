import React, { useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse, KindofTreatment } from "./contents";
import firebase from "firebase";

export const CoronaProfile = ({ navigation }: any) => {
  const [anySymptom, SetAnySymptom] = useState("");
  const [anyRelativeWithSymptom, SetAnyRelativeWithSymptom] = useState(
    ""
  );
  const [anyPrevSymptom, SetAnyPrevSymptom] = useState("");
  const [anyMentalHelp, SetAnyMentalHelp] = useState("");
  const [anyAfterSymptom, SetAnyAfterSymptom] = useState("");
  const [anyAfterMentalhelp, SetAnyAfterMentalhelp] = useState("");

  const [userID ] = React.useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");
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
    <SafeAreaView>
      <ScrollView>
        <Text>
          • করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার
          মধ্যে বিদ্যমান?{" "}
        </Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnySymptom}
        />
        <Text>
          • করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার
          কাছের মানুষদের মধ্যে বিদ্যমান?{" "}
        </Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyRelativeWithSymptom}
        />
        <Text>
          • করোনা পরিস্থিতি উদ্ভুত হওয়ার পূর্বে আপনার কি কোনও মানসিক
          স্বাস্থ্য সমস্যা দেখা দিয়েছিল?{" "}
        </Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyPrevSymptom}
        />
        <Text>
          • যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?{" "}
        </Text>
        <RadioButtonGroup
          options={KindofTreatment}
          onSelect={checkSetAnyMentalHelp}
        />
        <Text>
          • করোনা পরিস্থিতি উদ্ভুত হওয়ার পরে/ এই পরিস্থিতির কারণে আপনার কি
          কোনও মানসিক স্বাস্থ্য সমস্যা দেখা দিয়েছে?{" "}
        </Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyAfterSymptom}
        />
        <Text>
          • যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?{" "}
        </Text>
        <RadioButtonGroup
          options={KindofTreatment}
          onSelect={checkSetAnyAfterMentalhelp}
        />
        <Button onPress={onSubmit}> Submit </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
