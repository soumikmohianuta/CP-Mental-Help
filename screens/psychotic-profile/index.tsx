import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Headline, Button, Appbar } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse, KindofTreatment } from "../profile/contents";
import firebase from "firebase";
import {UserContext} from '../../context';
export const PsychoticProfile = ({ navigation }: any) => {
  const [anyHarmByOther, SetAnyHarmByOther] = useState("");
  const [anyControlByOther, SetAnyControlByOther] = useState("");
  const [anyAbnoramality, SetAnyAbnoramality] = useState("");
  const [anyFeeling, SetAnyFeeling] = useState("");
  const {userName} = React.useContext(UserContext);

  const onSubmit = () => {
    if (
      anyHarmByOther == "" ||
      anyControlByOther == "" ||
      anyAbnoramality == "" ||
      anyFeeling == ""
    ) {
      alert("Incomplete Information");
    } else {
      const userData = {
        anyHarmByOther: anyHarmByOther,
        anyControlByOther: anyControlByOther,
        anyAbnoramality: anyAbnoramality,
        anyFeeling: anyFeeling,
      };

      firebase
        .database()
        .ref(userName+"/MentalProfile/PsychoticProfile")
        .set(userData);
      
        if( anyHarmByOther == "Yes" ||
        anyControlByOther == "Yes" ||
        anyAbnoramality == "Yes" ||
        anyFeeling == "Yes"){

          navigation.navigate("HelpCenterPPScreen");
         
        }
        else{
          navigation.navigate("Profile");
        }
    }
  };

  const checkSetAnyHarmByOther = (value: any) => {
    SetAnyHarmByOther(value);
  };

  const checkSetAnyControlByOther = (value: any) => {
    SetAnyControlByOther(value);
  };

  const checkSetAnyAbnoramality = (value: any) => {
    SetAnyAbnoramality(value);
  };

  const checkSetSetAnyFeeling = (value: any) => {
    SetAnyFeeling(value);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Profile')}  />
        <Appbar.Content title="Psychotic Information" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>
        <Headline>
          আপনার কি মনে হয় মানুষ ইচ্ছাকৃত ভাবে আপনার ক্ষতি করতে চাচ্ছে অথবা
          আপনার বিরুদ্ধে ষড়যন্ত্র করছে?
        </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyHarmByOther}
        />
        <Headline>
          আপনার কি মনে হয় কোন কিছু বা অন্য কোন ব্যক্তি আপনার চিন্তাগুলোকে
          সরাসরি নিয়ন্ত্রণ করছে?
        </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyControlByOther}
        />
        <Headline>
          আপনার কি এরকম মনে হয় যে অস্বাভাবিক কিছু একটা ঘটছে, তবে অন্য কেউ
          বিশ্বাস করছে না?
        </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyAbnoramality}
        />
        <Headline>
          আপনি কি এমন কিছু দেখতে, শুনতে বা অনুভব করতে পারেন যেটা অন্য কেউ
          পারেনা?
        </Headline>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetSetAnyFeeling}
        />
        <Button onPress={onSubmit} mode="contained"> Submit </Button>
      </ScrollView>
    </>
  );
};
