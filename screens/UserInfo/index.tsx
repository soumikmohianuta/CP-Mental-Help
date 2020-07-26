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
  Headline,
  Appbar
} from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import {
  SexCategory,
  MaritalStatus,
  CurrentLocation,
} from "./contents";
import firebase from "firebase";
import {saveItem, checkItemExists} from '../../storage';
import {AuthContext, UserContext} from '../../context';

export const UserInfo = ({route}:any) => {
  const { control, handleSubmit, errors } = useForm();
  const {signIn} = React.useContext(AuthContext);
  const [ErrorMsg, SetErrorMsg] = useState("Not a valid Age");
  const [age, SetAge] = useState(0);
  const [sex, SetSex] = useState("");
  const [maritalStatus, SetMaritalStatus] = useState("");
  const [address, SetAddress] = useState("");
  const { curUser } = route.params;
  const onSubmit = () => {
    if (ErrorMsg != "" || sex == "" || maritalStatus == "" || address == "") {
      alert("Incomplete Information");
    } else {
      const userData = {
        Email: curUser.user.uid,
        Age: age,
        Sex: sex,
        maritalStatus: maritalStatus,
        address: address,
      };

      firebase
        .database()
        .ref(curUser.user.uid+"/DemoGraphy")
        .set(userData);
        signIn(curUser);

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
      <ScrollView style={{ margin: 12 }}>
        <Headline> বয়স </Headline>
        <Controller
          as={TextInput}
          control={control}
          name="age"
          onChange={(args) => renderError(args[0].nativeEvent.text)}
          rules={{ required: true }}
          defaultValue=""
          placeholder="Age"
        />
        <Headline> লিঙ্গ </Headline>
        <RadioButtonGroup
          options={SexCategory}
          onSelect={checkSetSex}
        />

        <Headline> বৈবাহিক অবস্থা </Headline>
        <RadioButtonGroup
          options={MaritalStatus}
          onSelect={CheckSetMaritalStatus}
        />
        <Headline>
           আপনি বর্তমানে কোন বিভাগে অবস্থান করছেন?
        </Headline>
        <RadioButtonGroup
          options={CurrentLocation}
          onSelect={CheckSetAddress}
        />
        <Button onPress={onSubmit}mode="contained">  Submit </Button>
      </ScrollView>
  );
};
