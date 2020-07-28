import React from 'react';
import { ScrollView } from 'react-native';
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
      </ScrollView>
    </>
  );
}