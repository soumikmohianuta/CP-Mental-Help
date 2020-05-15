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
      <Text>Hello, CP Mental Help!</Text>
      <Button
        title="Go to Q/A"
        onPress={() => navigation.navigate('InitialQuestionnaire')}
      />
    </Container>
  );
}