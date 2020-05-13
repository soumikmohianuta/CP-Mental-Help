
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Slider, Text } from 'react-native-elements';

export const StyledView = styled(View)`
padding: 24px;
`;

export const StyledText = styled(Text)`
  margin-bottom: 24px;
`;

export const StyledAnswerText = styled(Text)`
  color: #2089dc;
  margin-bottom: 24px;
`;

export const StyledSlider = styled(Slider)`
margin-bottom: 24px;
`;

export const ActionsContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

export const TestView = styled(View)`
  height: 2px;
  background-color: red;
  width: 20%;
`