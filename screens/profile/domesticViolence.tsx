import React, { useState } from "react";
import styled from "styled-components/native";
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { RadioButtonGroup } from "../../components/radio-button-group";
import { YesNoResponse } from "./contents";
import firebase from "firebase";

const Container = styled(View)`
  flex: 7;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled(Image)`
  flex: 1;
  height: undefined;
  width: 80%;
  flex-direction: column;
  align-self: center;
  resize-mode: contain;
`;

const ImageViewContainer = styled(View)`
  flex: 2;
  flex-direction: column;
  align-items: center;
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  padding: 10px 10px;
  margin-bottom: 15;
`;

const ErrorText = styled(Text)`
  color: #b82204;
  padding: 0px 0px;
`;

const ScrollContent = styled(View)`
  width: 100%;
  margin-top: 5;
  margin-bottom: 5;
`;
const ScrollButtonContent = styled(View)`
  width: 100%;
  margin-top: 5;
  margin-bottom: 25;
`;

const FieldContainer = styled(Text)`
  margin-top: 20;
  font-size: 20;
  align-items: center;
  color: #746f6e;
`;

const ButtonContainer = styled(View)`
  background-color: #af2008;
  height: 44;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 22;
  border-width: 1;
  border-color: #707070;
`;

const TouchableOpacityContainer = styled(TouchableOpacity)`
  width: 100%;
  margin-top: 5;
`;

const ButtonTextStyle = styled(Text)`
  font-size: 16;
  letter-spacing: 0.5;
`;

export const DomesticViolenceProfile = ({ navigation }: any) => {
  var appLogo = require("../../Images/QLife.png");
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
    <SafeAreaView style={{ flex: 1 }}>
      <ImageViewContainer>
        <ImageContainer source={appLogo} />
      </ImageViewContainer>
      <Container>
        <ScrollContainer>
          <ScrollContent>
            <FieldContainer>• আপনি কি ঘরোয়া সহিংসতার স্বীকার? </FieldContainer>
            <RadioButtonGroup
              options={YesNoResponse}
              onSelect={checkSetDomesticViolence}
            />
          </ScrollContent>

          <ScrollButtonContent>
            <TouchableOpacityContainer onPress={() => onSubmit()}>
              <ButtonContainer>
                <ButtonTextStyle>Submit</ButtonTextStyle>
              </ButtonContainer>
            </TouchableOpacityContainer>
          </ScrollButtonContent>
        </ScrollContainer>
      </Container>
    </SafeAreaView>
  );
};
