
import styled from 'styled-components/native';
import { View, Slider } from 'react-native';
import { Text } from 'react-native-elements';

export const Container = styled(View)`
padding: 72px 24px;
`;

export const QuestionText = styled(Text)`
  margin: 24px 0 12px;
`;

export const NoteText = styled(Text)`
  margin: 0;
`;

export const AnswerText = styled(Text)`
  color: #2089dc;
  margin-bottom: 36px;
`;

export const AnswerSlider = styled(Slider)`
  margin: 36px 0 24px;
`;

export const ActionsContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
`;
