import React from 'react';
import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { CurrentStateCard } from './current-state-card';
import { MentalStateMeasureCard } from './mental-state-measure-card';
import { OthersCard } from './others-card';

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