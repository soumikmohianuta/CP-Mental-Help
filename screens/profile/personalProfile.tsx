import React from "react";
import {
  View,
  Image,
  SafeAreaView,
} from "react-native";
import { Text, Card, ActivityIndicator } from "react-native-paper";
import firebase from "firebase";

export const PersonalProfile = ({ navigation }: any) => {
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
    <SafeAreaView>
      <Card >
        <Card.Title title="আপনার ব্যক্তিগত তথ্য" />
        <Card.Content>
          <Text>• বয়স </Text>
          <Text> {age} </Text>
        </Card.Content>

        <Card.Content>
          <Text>• লিঙ্গঃ </Text>
          <Text> {sex} </Text>
        </Card.Content>

        <Card.Content>
          <Text>• বৈবাহিক অবস্থাঃ </Text>
          <Text> {maritalStatus} </Text>
        </Card.Content>

        <Card.Content>
          <Text>• বর্তমান অবস্থানঃ </Text>
          <Text> {address} </Text>
        </Card.Content>

        <Card.Content>
          <Text>• ই-মেইল </Text>
          <Text> {email} </Text>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};
