import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Slider, Text } from 'react-native-elements';

const StyledView = styled(View)`
  padding: 24px;
`;

const StyledText = styled(Text)`
  margin-bottom: 24px;
`;

export const InitialQuestionnaireScreen = () => {
  const [val, setVal] = useState(20);
  return (
    <StyledView>
      <StyledText h4>
        আমি অত্যাধিক চিন্তা/উদ্বেগ অনুভব করছি?
      </StyledText>
      <StyledText>
        (যেখানে ০ মানে হল একেবারেই না আর ১০০ মানে হল সর্ব পরিমাণে)
      </StyledText>
      <StyledText h4>
            {val}
      </StyledText>
      <Slider
        value={20}
        minimumValue={0}
        step={1}
        maximumValue={100}
        onSlidingComplete={val => setVal(val)}
        // onValueChange={val => setVal(val)}
      />
    </StyledView>
  );
}