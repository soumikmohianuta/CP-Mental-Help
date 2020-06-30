import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
} from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import {
  SexCategory,
  MaritalStatus,
  CurrentLocation,
} from "./contents";
import firebase from "firebase";
import { useSelector } from "react-redux";

export const UserInfo = () => {
  const { control, handleSubmit, errors } = useForm();

  const [ErrorMsg, SetErrorMsg] = useState("Not a valid Age");
  const [age, SetAge] = useState(0);
  const [sex, SetSex] = useState("");
  const [maritalStatus, SetMaritalStatus] = useState("");
  const [address, SetAddress] = useState("");

  const userID = useSelector((state: any) => state.loginReducer.userId);
  const eMail = useSelector((state: any) => state.loginReducer.email);

  const onSubmit = () => {
    if (ErrorMsg != "" || sex == "" || maritalStatus == "" || address == "") {
      alert("Incomplete Information");
    } else {
      const userData = {
        Email: eMail,
        Age: age,
        Sex: sex,
        maritalStatus: maritalStatus,
        address: address,
      };

      firebase
        .database()
        .ref("DemoGraphy/" + userID)
        .set(userData);
      // saveUserData();
    }
  };

  const renderError = (curAge: any) => {
    if (isNaN(curAge)) {
      SetErrorMsg("Enter a Number");
    } else if (10 > Number(curAge) || 100 < Number(curAge)) {
      SetErrorMsg("Not a valid Age");
    } else {
      SetAge(curAge);
      SetErrorMsg("");
    }
  };

  const checkSetSex = (value: any) => {
    SetSex(value);
  };

  const CheckSetMaritalStatus = (value: any) => {
    SetMaritalStatus(value);
  };

  const CheckSetAddress = (value: any) => {
    SetAddress(value);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>• বয়স </Text>
        <Controller
          as={TextInput}
          control={control}
          name="age"
          onChange={(args) => renderError(args[0].nativeEvent.text)}
          rules={{ required: true }}
          defaultValue="0"
          placeholder="Age"
        />
        <Text>• লিঙ্গ </Text>
        <RadioButtonGroup
          options={SexCategory}
          onSelect={checkSetSex}
        />

        <Text>• বৈবাহিক অবস্থা </Text>
        <RadioButtonGroup
          options={MaritalStatus}
          onSelect={CheckSetMaritalStatus}
        />
        <Text>
          • আপনি বর্তমানে কোন বিভাগে অবস্থান করছেন?{" "}
        </Text>
        <RadioButtonGroup
          options={CurrentLocation}
          onSelect={CheckSetAddress}
        />
        <Button onPress={onSubmit}> Submit </Button>
      </ScrollView>
   </SafeAreaView>
  );
};
