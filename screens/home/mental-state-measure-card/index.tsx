
import React from 'react';
import styled from 'styled-components/native';
import { Image, View } from 'react-native';
import { Button, Card } from 'react-native-elements';

const MainContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 12px;
`;

const circleButtonStyle = {
  borderRadius: 50,
  height: 100,
  width: 100,
  padding: 12,
  backgroundColor: '#ba262b',
}

export const MentalStateMeasureCard = ({ }: any) => {
  return (
    <Card title='কিভাবে মানসিক অবস্থা পরিমাপ করবেন?' containerStyle={{ borderRadius: 8, width: '95%' }}>
        <MainContainer>
          <Button
            buttonStyle={circleButtonStyle}
            titleStyle={{ fontSize: 14 }}
            title="মানসিক অবস্থা যাচাইকরণ"
          />
          <Button
            buttonStyle={circleButtonStyle}
            titleStyle={{ fontSize: 14 }}
            title="মানসিক চাপ নির্ণয়"
          />
          <Button
            buttonStyle={circleButtonStyle}
            titleStyle={{ fontSize: 14 }}
            title="দুশ্চিন্তা নির্ণয়"
          />
        </MainContainer>
    </Card>
  )
}