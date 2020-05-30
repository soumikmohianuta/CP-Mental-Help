import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const HomeScreen = ({ navigation }) => {
  return (
    <Container>
      <Button
        title="Go to Current State"
        onPress={() => navigation.navigate('CurrentState')}
      />
      <Button
        title="Go to Mental State Measurement"
        onPress={() => navigation.navigate('MentalStateMeasure')}
      />
    </Container>
  );
}