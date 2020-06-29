import React, { useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Headline, Button, Appbar } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse } from "../profile/contents";
import firebase from "firebase";

export const SuicideIdeationProfile = ({ navigation }: any) => {
  const [anySuicideThought, SetSuicideThought] = useState("");
  const [anySuicidePlan, SetAnySuicidePlan] = useState("");
  const [anySuicideAttempt, SetAnySuicideAttempt] = useState("");

  const [userID, SetUserID] = useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");

  const onSubmit = () => {
    if (
      anySuicideThought == "" ||
      anySuicidePlan == "" ||
      anySuicideAttempt == ""
    ) {
      alert("Incomplete Information");
    } else {
      const userData = {
        anySuicideThought: anySuicideThought,
        anySuicidePlan: anySuicidePlan,
        anySuicideAttempt: anySuicideAttempt,
      };

      firebase
        .database()
        .ref("MentalProfile/" + userID + "/SuicideIdeationProfile")
        .set(userData);
      navigation.navigate("MentalProfile");
    }
  };

  const checkSetSuicideThought = (value: any) => {
    SetSuicideThought(value);
  };

  const checkSetAnySuicidePlan = (value: any) => {
    SetAnySuicidePlan(value);
  };

  const checkSetAnySuicideAttempt = (value: any) => {
    SetAnySuicideAttempt(value);
  };

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Profile')}  />
        <Appbar.Content title="Suicide Ideation Information" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginBottom: 88 }}>
        <Headline>আপনি কি আত্মহত্যার কথা ভাবেন?</Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetSuicideThought}
        />
        <Headline>
          আত্মহত্যার করার কোন পরিকল্পনা করেছিলেন?
        </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnySuicidePlan}
        />
        <Headline>
          আগে কখনো আত্মহত্যা করার চেষ্টা করেছিলেন কি?
        </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnySuicideAttempt}
        />
        <Button onPress={onSubmit} mode="contained"> Submit </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
