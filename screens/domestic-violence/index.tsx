import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Headline, Button, Appbar } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse } from "../profile/contents";
import firebase from "firebase";
import {UserContext} from '../../context';

export const DomesticViolenceProfile = ({ navigation }: any) => {
  const [domesticViolence, SetDomesticViolence] = useState("");

  const {userName} = React.useContext(UserContext);

  const onSubmit = () => {
    if (domesticViolence == "") {
      alert("Incomplete Information");
    } else {
      const userData = { domesticViolence: domesticViolence };

      firebase
        .database()
        .ref(userName+ "/MentalProfile/DomesticViolenceProfile")
        .set(userData);

      if(domesticViolence =="No"){
        navigation.navigate("Profile");
      }
      else{
        navigation.navigate("DomesticViolenceHelp");
      }
    }
  };

  const checkSetDomesticViolence = (value: any) => {
    SetDomesticViolence(value);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Profile')}  />
        <Appbar.Content title="Domestic Violence Information" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>
        <Headline>আপনি কি ঘরোয়া সহিংসতার স্বীকার? </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetDomesticViolence}
        />
        <Button onPress={onSubmit} mode="contained"> Submit </Button>
      </ScrollView>
    </>
  );
};
