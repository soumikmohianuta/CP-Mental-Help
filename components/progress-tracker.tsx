import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

const Step = styled(View)`
  height: 5px;
  background-color: ${({ visited }: any) => visited ? '#2089dc': '#ddd'};
  width: ${({ totalStep }: any) => `${100/totalStep}%`};
  margin-right: 2px;
  border-radius: 5px;
`;

const ProgressTrackerContainer = styled(View)`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  margin-bottom: 32px;
`;

export const ProgressTracker = ({
  totalStep,
  current,
}: any) => {
  return (
    <ProgressTrackerContainer>
      {
        [...Array(totalStep).keys()].map((index) => (
          <Step
            key={index}
            totalStep={totalStep}
            visited={index <= current}  
          />
        ))
      }
    </ProgressTrackerContainer>
  )
}