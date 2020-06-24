
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export const Container = styled(View)`
  padding: 24px 24px 72px ;
`;

export const QuestionText = styled(Text)`
  margin: 24px 0 12px;
`;

export const NoteText = styled(Text)`
    margin-bottom: 24px;
`;

export const SliderContainer = styled(View)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ActionsContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;
