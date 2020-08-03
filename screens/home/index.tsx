import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MentalHealthMeasureCard } from './mental-health-measure-card';
import { MentalHealthRatingScreen } from '../mental-health-rating';
import { MentalHealthMeasureListScreen } from '../mental-health-measure-list';
import { GHQMeasureScreen } from '../GHQ-measure';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar, Card, Button, Text, ActivityIndicator } from 'react-native-paper';
import { PSSMeasureScreen } from '../PSS-measure';
import { ScaleHistoryViewScreen } from '../scale-history-view';
import { AnxietyScaleMeasureScreen } from '../anxiety-scale-measure';
import { MentalHealthScoreViewScreen } from '../mental-health-score-view';
import { MentalHealthExerciseScreen } from '../mental-health-exercises';
import { HelpCenterScreen } from '../help-center';
import { ExerciseVideoScreen } from '../exercise-video';
import { ExcerciseStatusScreen } from '../mental-health-exercises/excercise-status';
import { checkPreSurveyRequires } from '../../storage';
import CircularProgress from '../../components/percentage-circle';
import { getMentalHealthExcercise } from '../../services/firebase';
import { UserContext } from '../../context';
import { excerCisePercentage } from '../../utils/exercise';
import { getHomeProgressRequire } from '../../storage';
import { ExcerciseStateScreen } from '../exercise-video/excercise-state';
import { GetingStartedScreen } from '../getting-started';

const HelpCenterImage = require('./assets/help.png');
const MentalStateImage = require('./assets/evaluate.jpeg');
const MentalExcerciseImage = require('./assets/mentalexcercise.jpeg');
const QlifeImage = require('../../Images/QLife.png');
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
      </Navigator>
    </NavigationContainer>
  );
}

export const HomeScreen = ({ navigation }: any) => {

  const [loading, setLoading] = useState(true);

  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [isProgesAvailable, setIsProgesAvailable] = useState(true);
  const { userName } = React.useContext(UserContext);


  useFocusEffect(
    React.useCallback(() => {
      const getPersonalData = async () => {
        setLoading(true);
        //To prevent each time updating from internet
        var isUpdateRequire = await getHomeProgressRequire();
        if (isUpdateRequire) {
          try {

            const curlist = await getMentalHealthExcercise(userName);
            var totalCompleted = excerCisePercentage(curlist);

            // if no progress done show cover
            if (totalCompleted == 0) {
              setCurrentAnswer(totalCompleted);
              setIsProgesAvailable(false);
            }
            // if stated watching show progress 

            else {
              setCurrentAnswer(totalCompleted);
              setIsProgesAvailable(true);

            }
          }
          catch (e) {
            setIsProgesAvailable(false);
          }
        };
        setLoading(false);
      }
      getPersonalData();
    }, [])
  );

  const handleStart = async () => {
    var presurveyRequire = await checkPreSurveyRequires();
    if (presurveyRequire) {

      navigation.navigate('MentalHealthRating', { navigateTo: 'MentalHealthMeasureList' });
    }
    else {
      navigation.navigate('MentalHealthMeasureList');
    }
  }
  const handleExcercise = () => {
    navigation.navigate('ExcerciseStatus', { progressStaus: currentAnswer, isProgess: isProgesAvailable });

  }

  const onHelpCenterClick = () => {
    navigation.navigate('HelpCenter');

  }


  const onMentalHealthStateClick = () => {
    navigation.navigate('MentalHealthRating', { navigateTo: 'Home' });

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
        <Appbar.Content title="মুল পাতা" />
      </Appbar.Header>
      <ScrollView>
        <TouchableHighlight  onPress={handleStart} underlayColor="#ba262b"
          style={{
            flex: 1,
            marginTop: 6
          }}
        >
          <MentalHealthMeasureCard
            onStartClick={handleStart}
          />
        </TouchableHighlight >


        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12
          }}
        >
          <TouchableHighlight onPress={onMentalHealthStateClick} underlayColor="#ba262b"
            style={{
              flex: 1,
              marginLeft: 10,
              marginRight: 5
            }}
          >
            <Card>
              <Card.Title title="মানসিক মূল্যায়ন" />
              <Card.Cover source={MentalStateImage} />
              <Card.Actions>
                <Button onPress={onMentalHealthStateClick}>নিজেকে মূল্যায়ন করুন</Button>
              </Card.Actions>
            </Card>
          </TouchableHighlight>

          <TouchableHighlight onPress={onGettingStarted} underlayColor="#ba262b"
            style={{
              flex: 1,
              marginLeft: 5,
              marginRight: 10
            }}
          >
            <Card>
              <Card.Title title="ব্যবহার নির্দেশিকা" />
              <Card.Cover source={QlifeImage} />
              <Card.Actions>
                <Button onPress={onGettingStarted}>অ্যাপ ব্যবহারের উপায়</Button>
              </Card.Actions>
            </Card>
          </TouchableHighlight >

        </View>


        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 12
          }}
        >

          <TouchableHighlight onPress={handleExcercise} underlayColor="#ba262b"
            style={{
              flex: 1,
              marginLeft: 10,
              marginRight: 5
            }}>
            <Card>
              <Card.Title title="মানসিক স্বাস্থ্য" />
              {isProgesAvailable ? <CircularProgress
                size={185}
                defaultPos={currentAnswer}
              >
                <Text style={{ fontSize: 55 }}>
                  {currentAnswer}%
                  </Text>
              </CircularProgress> : <Card.Cover source={MentalExcerciseImage} />}
              <Card.Actions>

                <Button onPress={handleExcercise}>অনুশীলনীগুলো দেখি </Button>
              </Card.Actions>

            </Card>
          </TouchableHighlight>


          <TouchableHighlight onPress={onHelpCenterClick} underlayColor="#ba262b"
            style={{
              flex: 1,
              marginLeft: 5,
              marginRight: 10
            }}
          >
            <Card>
              <Card.Title title="Help Center" />
              <Card.Cover source={HelpCenterImage} />
              <Card.Actions>
                <Button onPress={onHelpCenterClick}>মানসিক সাহায্য পেতে</Button>
              </Card.Actions>
            </Card>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
}