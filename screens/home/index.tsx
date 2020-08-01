import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MentalHealthMeasureCard } from './mental-health-measure-card';
import { MentalHealthRatingScreen } from '../mental-health-rating';
import { MentalHealthMeasureListScreen } from '../mental-health-measure-list';
import { GHQMeasureScreen } from '../GHQ-measure';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar,Card,Button,Text,ActivityIndicator } from 'react-native-paper';
import { PSSMeasureScreen } from '../PSS-measure';
import { ScaleHistoryViewScreen } from '../scale-history-view';
import{ AnxietyScaleMeasureScreen } from '../anxiety-scale-measure';
import { MentalHealthScoreViewScreen } from '../mental-health-score-view';
import { MentalHealthExerciseScreen } from '../mental-health-exercises';
import { HelpCenterScreen } from '../help-center';
import { ExerciseVideoScreen } from '../exercise-video';
import {ExcerciseStatusScreen} from '../mental-health-exercises/excercise-status';
import {checkPreSurveyRequires} from '../../storage';
import CircularProgress from '../../components/percentage-circle';
import { getMentalHealthExcercise } from '../../services/firebase';
import {UserContext} from '../../context';
import {excerCisePercentage} from '../../utils/exercise';
import {getHomeProgressRequire} from '../../storage';

const HelpCenterImage = require('./assets/help.jpg');
const MentalStateImage = require('./assets/help.jpg');
const MentalExcerciseImage = require('./assets/mentalexcercise.png');
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
      </Navigator>
    </NavigationContainer>
  );
}

export const HomeScreen = ({navigation}: any) => {

  const [loading, setLoading] = useState(true);

  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [isProgesAvailable, setIsProgesAvailable] = useState(true);
  const {userName} = React.useContext(UserContext);


   useFocusEffect(
    React.useCallback( () => {
      const getPersonalData = async () => {
        setLoading(true);
        //To prevent each time updating from internet
        var isUpdateRequire =await getHomeProgressRequire();
        if(isUpdateRequire){
          try {

            const curlist = await getMentalHealthExcercise(userName);
            var totalCompleted = excerCisePercentage(curlist); 
          
            // if no progress done show cover
            if(totalCompleted==0){
              setCurrentAnswer(totalCompleted);
              setIsProgesAvailable(false);
            }
            // if stated watching show progress 

            else{
              setCurrentAnswer(totalCompleted);
              setIsProgesAvailable(true);
          
            }
          } 
          catch(e) {
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
          
          navigation.navigate('MentalHealthRating', { navigateTo: 'MentalHealthMeasureList'});
        } 
        else {
          navigation.navigate('MentalHealthMeasureList');
        }
  }
  const handleExcercise = () => {
    navigation.navigate('ExcerciseStatus', { progressStaus: currentAnswer, isProgess:isProgesAvailable});

  }

  const onHelpCenterClick = () => {
    navigation.navigate('HelpCenter');

  }

  
  const onMentalHealthStateClick = () => {
    navigation.navigate('MentalHealthRating', { navigateTo: 'Home'});

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
        <MentalHealthMeasureCard
          onStartClick={handleStart}
        />

      <Card>
          <Card.Title title="আপনার মানসিক অবস্থার মূল্যায়ন" /> 
          <Card.Cover source={HelpCenterImage} />
          <Card.Actions>
           <Button onPress={onMentalHealthStateClick}>নিজেকে যাচাই করুন</Button>
          </Card.Actions>
      </Card>

        <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 12
        }}
      >
      <Card>
          <Card.Title title="মানসিক স্বাস্থ্য" />
          {isProgesAvailable? <CircularProgress
                size={180}
                defaultPos={currentAnswer}
              >
                <Text style={{ fontSize: 55}}>
                  {currentAnswer}%
                </Text>
              </CircularProgress> :  <Card.Cover source={MentalExcerciseImage} />}
          <Card.Actions>
       
        <Button onPress={handleExcercise}>অনুশীলনীগুলো দেখে আসুন</Button>
      </Card.Actions>

        </Card>


        <Card>
          <Card.Title title="Help Center" />
          <Card.Cover source={MentalStateImage} />
          <Card.Actions>
          <Button onPress={onHelpCenterClick}>এখানে ক্লিক করুন</Button>
          </Card.Actions>
        </Card>

        </View>
      </ScrollView>
    </>
  );
}