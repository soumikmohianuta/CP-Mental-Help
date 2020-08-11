import React from 'react';
import { Appbar, Card, List } from 'react-native-paper';
import { helplines,MENTAL_HEALTH_PROFILE_SECTIONS } from './contents';
import { ScrollView } from 'react-native-gesture-handler';
import { Linking, Platform } from 'react-native';

export const HelpCenterProfile = ({route, navigation }: any) => {
  const dialCall = (number: string, commType: string) => {
    if (commType === 'whatsapp') {
      Linking.openURL(`whatsapp://send?text=Hello&phone=${number}`);
    }
    const phoneNumber =  Platform.OS === 'android' ?
    `tel:${number}` : `telprompt:${number}`;
    Linking.openURL(phoneNumber);
  };

  
   const mentalProfile=route.params.profile;
  
   const helpLinesToShow = MENTAL_HEALTH_PROFILE_SECTIONS[mentalProfile].helpSections;


  var MentalProfileState = 2;
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("Profile",{MentalProfileState:mentalProfile})}  />
        <Appbar.Content title="হেল্প সেন্টার" />
      </Appbar.Header>
      <ScrollView>
        {
          helplines.map((helpline, index) => ( helpLinesToShow.indexOf(index) != -1 &&
            <Card key={index} elevation={5} style={{ margin: 12, borderRadius: 5 }}>
              <Card.Title title={helpline.title} subtitle={helpline.subtitle} />
              <Card.Content>
                {
                  helpline.contacts.map((contact, cIndex) => (
                    <List.Item
                      key={cIndex}
                      title={contact.number}
                      description={contact.availability}
                      left={() => <List.Icon icon={contact.type} />}
                      onPress={() => dialCall(contact.number, contact.type)}
                    />
                  ))
                }
              </Card.Content>
            </Card>
          ))
        }
      </ScrollView>
    </>
  );
}