import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

const StyledView = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const InitialQuestionnaireScreen = () => {
  return (
    <StyledView>
      <Text>Q/A</Text>
    </StyledView>
  );
}