import React from 'react';
import styled from 'styled-components/native';
import { Text, View, Button } from 'react-native';

const StyledView = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const HomeScreen = ({ navigation }) => {
  return (
    <StyledView>
      <Text>Hello, CP Mental Help!</Text>
      <Button
        title="Go to Q/A"
        onPress={() => navigation.navigate('InitialQuestionnaireScreen')}
      />
    </StyledView>
  );
}