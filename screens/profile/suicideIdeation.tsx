import React, { useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse } from "./contents";
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
      <ScrollView>
        <Text>• আপনি কি আত্মহত্যার কথা ভাবেন?</Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetSuicideThought}
        />
        <Text>
          • আত্মহত্যার করার কোন পরিকল্পনা করেছিলেন?{" "}
        </Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnySuicidePlan}
        />
        <Text>
          • আগে কখনো আত্মহত্যা করার চেষ্টা করেছিলেন কি?{" "}
        </Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnySuicideAttempt}
        />
        <Button onPress={onSubmit}> Submit </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
