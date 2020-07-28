import React from 'react';
import { View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MentalHealthMeasureCard } from './mental-health-measure-card';
import { MentalHealthRatingScreen } from '../mental-health-rating';
import { MentalHealthMeasureListScreen } from '../mental-health-measure-list';
import { GHQMeasureScreen } from '../GHQ-measure';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { PSSMeasureScreen } from '../PSS-measure';
import { ScaleHistoryViewScreen } from '../scale-history-view';
import{ AnxietyScaleMeasureScreen } from '../anxiety-scale-measure';
import { MentalHealthScoreViewScreen } from '../mental-health-score-view';
import { MentalHealthExerciseScreen } from '../mental-health-exercises';
import { MentalExcerciseCard } from './mental-excercise-measure-card';
import {HelpCenterCard} from './help-center-card';
import { HelpCenterScreen } from '../help-center';
import { ExerciseVideoScreen } from '../exercise-video';

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
      </Navigator>
    </NavigationContainer>
  );
}

export const HomeScreen = ({
  navigation,
}: any) => {
  const handleStart = () => {
    const isPreStartSurveyEnabled = false;
    if (isPreStartSurveyEnabled) {
      navigation.navigate('MentalHealthRating');
    } else {
      navigation.navigate('MentalHealthMeasureList');
    }
  }
  const handleExcercise = () => {
    navigation.navigate('MentalHealthExercise', { navigateTo: 'Home'});

  }

  const handleEmergencyContact = () => {
    navigation.navigate('HelpCenter');

  }
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="মুল পাতা" /> 
      </Appbar.Header>
      <ScrollView>
        <MentalHealthMeasureCard
          onStartClick={handleStart}
          onHistoryClick={handleStart}
        />
        <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 12
        }}
      >
         <MentalExcerciseCard
          onStartClick={handleExcercise}
        />
        <HelpCenterCard
          onStartClick={handleEmergencyContact}
        />

        </View>
      </ScrollView>
    </>
  );
}