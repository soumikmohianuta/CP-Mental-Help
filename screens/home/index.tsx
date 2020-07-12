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
import { PSSHistoryScreen } from '../PSS-history';
import { PSSScoreViewScreen } from '../PSS-score-view';
import{ AnxietyScaleMeasureScreen } from '../anxiety-scale-measure';
import { AnxietyScaleHistoryScreen } from '../anxiety-scale-history';

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
        <Screen name="PSSScoreView" component={PSSScoreViewScreen} />
        <Screen name="PSSHistory" component={PSSHistoryScreen} />
        <Screen name="AnxietyScaleMeasure" component={AnxietyScaleMeasureScreen} />
        <Screen name="AnxietyScaleHistory" component={AnxietyScaleHistoryScreen} />
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
        <Appbar.Content title="Home" />
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