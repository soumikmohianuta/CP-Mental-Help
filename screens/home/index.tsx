import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableHighlight, ColorPropType } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MentalHealthRatingScreen } from '../mental-health-rating';
import { MentalHealthMeasureListScreen } from '../scales';
import { GHQMeasureScreen } from '../scales/GHQ-measure';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar, Card, Button, Text, ActivityIndicator } from 'react-native-paper';
import { PSSMeasureScreen } from '../scales/PSS-measure';
import { ScaleHistoryViewScreen } from '../scores/score-history';
import { AnxietyScaleMeasureScreen } from '../scales/anxiety-scale-measure';
import { MentalHealthScoreViewScreen } from '../scores';
import { MentalHealthExerciseScreen } from '../mental-health-exercises';
import { HelpCenterScreen } from './help-center';
import { ExerciseVideoScreen } from '../mental-health-exercises/excercise-video';
import { ExcerciseStatusScreen } from '../mental-health-exercises/excercise-status';
import { UserContext } from '../../context';
import { ExcerciseStateScreen } from '../mental-health-exercises/excercise-video/video-completion';
import { GetingStartedScreen } from './getting-started';
import { checkMentalExaminationExists } from '../../services/firebase';
import {MentalRatingScoreViewScreen} from '../mental-health-rating/rating-score';
import {SevereHelpCenterScreen} from '../scores/severe-help';
import {getMentalHealthRatingRequire} from '../../storage';
import { isNetworkAvailable } from '../../utils/network';
import { useFocusEffect } from '@react-navigation/native';
const HelpCenterImage = require('../../Images/help.jpg');
const MentalExcerciseImage = require('../../Images/mentalexcercise.jpg');
const QlifeImage = require('../../Images/QLife.jpg');
const ExamineImage = require('../../Images/examine.jpg');

const { Navigator, Screen } = createStackNavigator();

export const HomePageStack = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="Home" component={HomeScreen} />
        <Screen name="MentalHealthRating" component={MentalHealthRatingScreen} />
        <Screen name="MentalHealthMeasureList" component={MentalHealthMeasureListScreen} />
        <Screen name="GHQMeasure" component={GHQMeasureScreen} />
        <Screen name="PSSMeasure" component={PSSMeasureScreen} />
        <Screen name="AnxietyScaleMeasure" component={AnxietyScaleMeasureScreen} />
        <Screen name="MentalHealthScoreView" component={MentalHealthScoreViewScreen} />
        <Screen name="MentalHealthExercise" component={MentalHealthExerciseScreen} />
        <Screen name="ScaleHistoryView" component={ScaleHistoryViewScreen} />
        <Screen name="ExerciseVideo" component={ExerciseVideoScreen} />
        <Screen name="HelpCenter" component={HelpCenterScreen} />
        <Screen name="ExcerciseStatus" component={ExcerciseStatusScreen} />
        <Screen name="ExcerciseStateScreen" component={ExcerciseStateScreen} />
        <Screen name="GetingStartedScreen" component={GetingStartedScreen} />
        <Screen name="MentalRatingScoreViewScreen" component={MentalRatingScoreViewScreen} />
        <Screen name="SevereHelpCenterScreen" component={SevereHelpCenterScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

export const HomeScreen = ({ navigation }: any) => {

  const [loading, setLoading] = useState(false);

  const { userName } = React.useContext(UserContext);


  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
    }, [])
  );

  const handleStart = async () => {
    setLoading(true);
    try{
      const mentalHealthNotDoneToday = await getMentalHealthRatingRequire();
      
      if(mentalHealthNotDoneToday){
          navigation.navigate('MentalHealthRating', { navigateTo: 'Home',videoOrderId:-1 });
          //setLoading(false);
      }
      else{
        navigation.navigate('MentalHealthMeasureList');
       // setLoading(false);
      }
    }
    catch{
      setLoading(false);
      alert('স্কেল দেখানো যাচ্ছে না');
    }
    
  }
  const handleExcercise = async () => {

    try {
      setLoading(true);
      const isConnected = await isNetworkAvailable();
      if (isConnected) {
      const mentalExamState = await checkMentalExaminationExists(userName);

      if (mentalExamState.mentalstatemeasure) {
        if (mentalExamState.ghq || mentalExamState.pss || mentalExamState.anxiety) {

          navigation.navigate('MentalHealthExercise');
        }
        else {
          navigation.navigate('ExcerciseStatus');
  
        }
      }

      else {
        navigation.navigate('ExcerciseStatus');
        setLoading(false);

      }
      }
      else{
        throw new Error("Net") ;
      }
      
    }
    catch (e){
      console.log(e);
      if(e.message =='Net'){
        alert('ইন্টারনেট সংযোগ নেই, অনুশীলনি দেখানো যাচ্ছে না'); 
      }
      else{
        alert('অনুশীলনি দেখানো যাচ্ছে না');
      }
      navigation.navigate('ExcerciseStatus', { navigateTo: 'Home' })
      setLoading(false);
    }
    
  }

  const onHelpCenterClick = () => {
    navigation.navigate('HelpCenter');

  }


  const onGettingStarted = () => {
    navigation.navigate('GetingStartedScreen');

  }

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="হোম পেজ" />
      </Appbar.Header>
      <ScrollView>
      <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 12
          }}
        >
          <TouchableHighlight onPress={handleStart} underlayColor="#ba262b"
            style={{
              flex: 1,
              marginTop: 6,
              marginLeft: 10,
              marginRight: 5
            }}
          >
            <Card>
              <Card.Title title="মানসিক স্বাস্থ্য যাচাই করুন" />
              <Card.Cover style={{
              flex: 1,
              width:undefined,
              resizeMode: 'contain'
              }}source={ExamineImage} />
            </Card>
          </TouchableHighlight >
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20
          }}
        >

          <TouchableHighlight onPress={handleExcercise} underlayColor="#ba262b"
            style={{
              flex: 1,
              marginLeft: 10,
              marginRight: 5
            }}>
            <Card >
              <Card.Title
               title="মানসিক স্বাস্থ্যের গুণগত মান উন্নয়ন" />
              <Card.Cover style={{
              flex: 1,
              width:undefined,
              resizeMode: 'contain'
              }}source={MentalExcerciseImage} />

            </Card>
          </TouchableHighlight>


        </View>


        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginBottom:10
          }}
        >


          <TouchableHighlight onPress={onGettingStarted} underlayColor="#ba262b"
            style={{
              flex: 1,
              marginLeft: 5,
              marginRight: 10
            }}
          >
            <Card>
              <Card.Title title="ব্যবহার নির্দেশিকা" />
              <Card.Cover  style={{
              flex: 1,
              width:undefined,
              resizeMode: 'contain'
              }} source={QlifeImage} />
            </Card>
          </TouchableHighlight >

          <TouchableHighlight onPress={onHelpCenterClick} underlayColor="#ba262b"
            style={{
              flex: 1,
              marginLeft: 5,
              marginRight: 10
            }}
          >
            <Card>
              <Card.Title title="হেল্প সেন্টার" />
              <Card.Cover style={{
              flex: 1,
              resizeMode: 'contain'
              }} 
            source={HelpCenterImage} />
            </Card>
          </TouchableHighlight>

        </View>



      </ScrollView>
    </>
  );
}