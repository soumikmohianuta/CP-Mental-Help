import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const Step = styled(View)`
  height: 5px;
  background-color: ${({ visited }: any) => visited ? '#ba262b': '#ddd'};
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

const StepText = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProgressTracker = ({
  totalStep,
  current,
}: any) => {
  return (
    <>
      <Text>Step {current + 1} of {totalStep}</Text>
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
    </>
  )
}