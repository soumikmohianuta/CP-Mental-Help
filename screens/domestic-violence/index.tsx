import React, { useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Headline, Button, Appbar } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse } from "../profile/contents";
import firebase from "firebase";


export const DomesticViolenceProfile = ({ navigation }: any) => {
  const [domesticViolence, SetDomesticViolence] = useState("");

  const [userID, SetUserID] = useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");

  const onSubmit = () => {
    if (domesticViolence == "") {
      alert("Incomplete Information");
    } else {
      const userData = { domesticViolence: domesticViolence };

      firebase
        .database()
        .ref("MentalProfile/" + userID + "/DomesticViolenceProfile")
        .set(userData);
      navigation.navigate("MentalProfile");
    }
  };

  const checkSetDomesticViolence = (value: any) => {
    SetDomesticViolence(value);
  };

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Profile')}  />
        <Appbar.Content title="Domestic Violence Information" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginBottom: 88 }}>
        <Headline>আপনি কি ঘরোয়া সহিংসতার স্বীকার? </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetDomesticViolence}
        />
        <Button onPress={onSubmit} mode="contained"> Submit </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
