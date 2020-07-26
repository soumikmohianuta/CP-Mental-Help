import React, { useState } from "react";
import { Appbar, Card, Paragraph, Headline, Button } from 'react-native-paper';
import { consent ,YesNoLabels} from './content';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButtonGroup } from "../../components/radio-button-group";



export const ConsentScreen = ({ route,navigation }: any) => {
    const [consentVal, SetConsentVal] = useState("");
    const { curUser } = route.params;

    const onSubmit = () => {

      if (consentVal != "Yes" ) {
        alert("Please Allow");

        } 
      else {
  
        navigation.navigate("UserInfo",{curUser});
        };

      };
      const CheckConsent = (value: any) => {
        SetConsentVal(value);
      };

  return (
    <>
      <ScrollView>
        <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title='User Consent' />
          <Card.Content>
            <Paragraph>{consent.block1}</Paragraph>
          </Card.Content>
        </Card>
        <Headline>
           আপনি কি উপরের উদ্দীপকের সাথে একমত?
        </Headline>
        <RadioButtonGroup
          options={YesNoLabels}
          onSelect={CheckConsent}
        />
        <Button onPress={onSubmit} mode="contained"> Submit </Button>

      </ScrollView>
    </>
  );
}