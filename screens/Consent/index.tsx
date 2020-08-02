import React, { useState } from "react";
import { View } from 'react-native';
import { Appbar, Card, Paragraph, Headline, Button } from 'react-native-paper';
import { consent ,YesNoLabels} from './content';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButtonGroup } from "../../components/radio-button-group";



export const ConsentScreen = ({ route,navigation }: any) => {
    const [consentVal, SetConsentVal] = useState("");
    const { curUser } = route.params;

      const CheckConsent = (value: any) => {
        if (value != "Yes" ) {
          setTimeout(() => {
            navigation.navigate("SignIn");
          }, 250);
         
  
          } 
        else {
    
          navigation.navigate("UserInfo",{curUser});
          };
  
        };

  return (
    <> 
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.navigate('SignIn')}  />
      <Appbar.Content title="সম্মতি প্রদান" />
    </Appbar.Header>
    <ScrollView style={{ margin: 12 }}>
        <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Content>
            <Paragraph>{consent.block1}</Paragraph>
          </Card.Content>
        </Card>
          <Headline style={{ margin: 12, borderRadius: 5 }}>
              আপনি কি উপরের উদ্দীপকের সাথে একমত?
          </Headline>
          <RadioButtonGroup
            options={YesNoLabels}
            onSelect={CheckConsent}
          />
      </ScrollView>
    </>
  );
}