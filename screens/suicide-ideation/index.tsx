import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Headline, Button, Appbar } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse } from "../profile/contents";
import {UserContext} from '../../context';
import firebase from "firebase";

export const SuicideIdeationProfile = ({ navigation }: any) => {
  const [anySuicideThought, SetSuicideThought] = useState("");


  const {userName} = React.useContext(UserContext);

  const onSubmit = () => {
    if (
      anySuicideThought == "") {
      alert("Incomplete Information");
    } else {
      const userData = {
        anySuicideThought: anySuicideThought
      };

      firebase
        .database()
        .ref(userName + "/MentalProfile/SuicideIdeationProfile")
        .set(userData);
        if(anySuicideThought=="Yes" ){
          navigation.navigate("SuicidalIdeationNextProfile");
        }
        else{
          navigation.navigate("Profile");
        }
    }
  };

  const checkSetSuicideThought = (value: any) => {
    SetSuicideThought(value);
  };


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Profile')}  />
        <Appbar.Content title="Suicide Ideation Information" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>
        <Headline>আপনি কি আত্মহত্যার কথা ভাবেন?</Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetSuicideThought}
        />
        <Button onPress={onSubmit} mode="contained"> Submit </Button>
      </ScrollView>
    </>
  );
};
