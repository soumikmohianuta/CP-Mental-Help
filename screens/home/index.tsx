import React from 'react';
import { ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MentalHealthMeasureCard } from './mental-health-measure-card';
import { MentalHealthRatingScreen } from '../mental-health-rating';
import { MentalHealthMeasureListScreen } from '../mental-health-measure-list';
import { GHQMeasureScreen } from '../GHQ-measure';
import { NavigationContainer } from '@react-navigation/native';

const { Navigator, Screen } = createStackNavigator();

export const HomePageStack = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={HomeScreen} />
        <Screen name="MentalHealthRating" component={MentalHealthRatingScreen} />
        <Screen name="MentalHealthMeasureList" component={MentalHealthMeasureListScreen} />
        <Screen name="GHQMeasure" component={GHQMeasureScreen} />
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
    <ScrollView>
      <MentalHealthMeasureCard
        onStartClick={handleStart}
        onHistoryClick={handleStart}
      />
    </ScrollView>
  );
}