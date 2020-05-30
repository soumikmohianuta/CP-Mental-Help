import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MentalStateMeasureScreen = ({ navigation }) => {
  return (
    <Container>
     <Text>Mental state</Text>
    </Container>
  );
}