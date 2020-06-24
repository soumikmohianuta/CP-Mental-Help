import React, { useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse } from "./contents";
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
      <ScrollView>
        <Text>• আপনি কি ঘরোয়া সহিংসতার স্বীকার? </Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetDomesticViolence}
        />
        <Button onPress={onSubmit}> Submit </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
