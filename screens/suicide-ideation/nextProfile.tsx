import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Headline, Button, Appbar } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse } from "../profile/contents";
import {UserContext} from '../../context';
import firebase from "firebase";

export const SuicideIdeationNextProfile = ({ navigation }: any) => {
  const [anySuicidePlan, SetAnySuicidePlan] = useState("");
  const [anySuicideAttempt, SetAnySuicideAttempt] = useState("");

  const {userName} = React.useContext(UserContext);

  const onSubmit = () => {
    if (
      anySuicidePlan == "" ||
      anySuicideAttempt == ""
    ) {
      alert("Incomplete Information");
    } else {
      const userData = {
        anySuicidePlan: anySuicidePlan,
        anySuicideAttempt: anySuicideAttempt,
      };

      firebase
        .database()
        .ref(userName + "/MentalProfile/SuicideIdeationProfile")
        .set(userData);
      navigation.navigate("SuicidalIdeationHelp");
    }
  };


  const checkSetAnySuicidePlan = (value: any) => {
    SetAnySuicidePlan(value);
  };

  const checkSetAnySuicideAttempt = (value: any) => {
    SetAnySuicideAttempt(value);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Profile')}  />
        <Appbar.Content title="Suicide Ideation Information" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>
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
    </>
  );
};
