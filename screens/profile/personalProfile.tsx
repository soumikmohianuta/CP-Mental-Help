import React from "react";
import {
  View,
  Image,
  SafeAreaView,
} from "react-native";
import { Text, Card, ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";
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

const ScrollContent = styled(View)`
  width: 100%;
  margin-top: 5;
  margin-bottom: 5;
  flex-direction: row;
`;

const FieldContainer = styled(Text)`
  color: #746f6e;
`;

const ValueContainer = styled(Text)`
  color: #b82204;
`;

export const PersonalProfile = ({ navigation }: any) => {
  var appLogo = require("../../Images/QLife.png");
  const [age, SetAge] = React.useState(0);
  const [sex, SetSex] = React.useState("");
  const [maritalStatus, SetMaritalStatus] = React.useState("");
  const [address, SetAddress] = React.useState("");
  const [email, SetEmail] = React.useState("");
  const [userID, SetUserID] = React.useState("zcbQ5d5RaxT3iuiFqkRGJr5Z0PH2");
  const [isLoading, setIsloading] = React.useState(true);

  React.useEffect(() => {
    try {
      firebase
        .database()
        .ref("/DemoGraphy/" + userID)
        .once("value")
        .then(function (snapshot) {
          SetAge((snapshot.val() && snapshot.val().Age) || "Anonymous");
          SetSex((snapshot.val() && snapshot.val().Sex) || "Anonymous");
          SetMaritalStatus(
            (snapshot.val() && snapshot.val().maritalStatus) || "Anonymous"
          );
          SetAddress((snapshot.val() && snapshot.val().address) || "Anonymous");
          SetEmail((snapshot.val() && snapshot.val().Email) || "Anonymous");
          setIsloading(false);
        });
    } catch {
      alert("Error");
    }
  }, []);

  if (isLoading) {
    return <ActivityIndicator animating />
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageViewContainer>
        <ImageContainer source={appLogo} />
      </ImageViewContainer>
      <Container>
        <Card >
          <Card.Title title="আপনার ব্যক্তিগত তথ্য" />
          <Card.Content>
            <FieldContainer>• বয়স </FieldContainer>
            <ValueContainer> {age} </ValueContainer>
          </Card.Content>

          <Card.Content>
            <FieldContainer>• লিঙ্গঃ </FieldContainer>
            <ValueContainer> {sex} </ValueContainer>
          </Card.Content>

          <Card.Content>
            <FieldContainer>• বৈবাহিক অবস্থাঃ </FieldContainer>
            <ValueContainer> {maritalStatus} </ValueContainer>
          </Card.Content>

          <Card.Content>
            <FieldContainer>• বর্তমান অবস্থানঃ </FieldContainer>
            <ValueContainer> {address} </ValueContainer>
          </Card.Content>

          <Card.Content>
            <FieldContainer>• ই-মেইল </FieldContainer>
            <ValueContainer> {email} </ValueContainer>
          </Card.Content>
        </Card>
      </Container>
    </SafeAreaView>
  );
};
