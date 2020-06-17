import React from 'react';
import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CurrentStateCard } from './current-state-card';
import { MentalStateMeasureCard } from './mental-state-measure-card';
import { OthersCard } from './others-card';
import { CurrentStateScreen } from '../current-state';

const { Navigator, Screen } = createStackNavigator();

export const HomeStackScreen = () => {
  return (
    <Navigator>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="CurrentState" component={CurrentStateScreen} />
    </Navigator>
  );
}

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;

export const HomeScreen = ({ navigation }: any) => {
  const handleStart = () => {
    navigation.navigate('CurrentState');
  }

  return (
    <ScrollView>
      <Container>
        <CurrentStateCard
          onStartClick={handleStart}
          onHistoryClick={handleStart}
        />
        <MentalStateMeasureCard />
        <OthersCard />
      </Container>
    </ScrollView>
  );
}