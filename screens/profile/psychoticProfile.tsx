import React, { useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse, KindofTreatment } from "./contents";
import firebase from "firebase";

export const PsychoticProfile = ({ navigation }: any) => {
  const [anyHarmByOther, SetAnyHarmByOther] = useState("");
  const [anyControlByOther, SetAnyControlByOther] = useState("");
  const [anyAbnoramality, SetAnyAbnoramality] = useState("");
  const [anyFeeling, SetAnyFeeling] = useState("");

  const [userID, SetUserID] = useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");

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
        .ref("MentalProfile/" + userID + "/PsychoticProfile")
        .set(userData);
      navigation.navigate("MentalProfile");
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
    <SafeAreaView>
      <ScrollView>
        <Text>
          • আপনার কি মনে হয় মানুষ ইচ্ছাকৃত ভাবে আপনার ক্ষতি করতে চাচ্ছে অথবা
          আপনার বিরুদ্ধে ষড়যন্ত্র করছে?{" "}
        </Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyHarmByOther}
        />
        <Text>
          • আপনার কি মনে হয় কোন কিছু বা অন্য কোন ব্যক্তি আপনার চিন্তাগুলোকে
          সরাসরি নিয়ন্ত্রণ করছে?{" "}
        </Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyControlByOther}
        />
        <Text>
          • আপনার কি এরকম মনে হয় যে অস্বাভাবিক কিছু একটা ঘটছে, তবে অন্য কেউ
          বিশ্বাস করছে না?{" "}
        </Text>
        <RadioButtonGroup
          options={YesNoResponse}
          onSelect={checkSetAnyAbnoramality}
        />
        <Text>
          • আপনি কি এমন কিছু দেখতে, শুনতে বা অনুভব করতে পারেন যেটা অন্য কেউ
          পারেনা?{" "}
        </Text>
        <RadioButtonGroup
          options={KindofTreatment}
          onSelect={checkSetSetAnyFeeling}
        />
        <Button onPress={onSubmit}>Submit </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
