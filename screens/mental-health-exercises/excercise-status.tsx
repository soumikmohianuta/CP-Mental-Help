import React, { useEffect, useState } from 'react';
import { List, Card, Appbar, Button, Headline, Paragraph,Text } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { checkMentalExaminationExists } from '../../services/firebase';
import {UserContext} from '../../context';
import {getUserInfo} from '../../storage';
import {exerciseStatusToContentMap,MENTAL_HEALTH_STATUS_TITLE,MENTAL_HEALTH_JUDGE_SECTIONS } from './content';

const { Navigator, Screen } = createStackNavigator();


export const ExcerciseStatusScreen = ({navigation }: any) => {
  const [mentalStateTitle, SetmentalStateTitle] = useState("");
  const [isExcersieOn, setIsExcersieOn] = useState(false);
  const {userName} = React.useContext(UserContext);

  

  const onStart = () => {

    navigation.navigate('MentalHealthRating', { navigateTo: 'Home',videoOrderId:-1 });
  }



  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')}  />
        <Appbar.Content title="মানসিক স্বাস্থ্যের গুণগত মান উন্নয়ন" />
      </Appbar.Header>

        <Card elevation={5} style={{ margin: 12, borderRadius: 5,marginTop: 50 }}>
                  
                  <Card.Content style={{ margin: 12, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
      
                      <Paragraph  style={{textAlign: 'justify', marginBottom: 10, fontSize: 15}}>মানসিক স্বাস্থ্যের গুণগত মান উন্নয়নের অনুশীলনগুলো পেতে হলে আপনাকে প্রথমে মানসিক স্বাস্থ্য যাচাই করে আসতে হবে ।</Paragraph>
      
                  </Card.Content>
                        
          </Card>
              
      <Button style={{ margin: 12 }} mode="contained" onPress={onStart}>যাচাই শুরু করুন</Button>

    </>  
  );
};