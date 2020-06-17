
import React from 'react';
import styled from 'styled-components/native';
import { Image, View } from 'react-native';
import { Button, Card } from 'react-native-elements';

const EmoContainer = styled(View)`
  height: 150px;
  width: 150px;
  padding: 10px;
  border: 1px solid;
  border-radius: 75;
  align-items: center;
  background: #ffd1a9;
`;

const MainContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 12px;
`;

export const CurrentStateCard = ({ onStartClick, onHistoryClick, rating }: any) => {
  var emoIcon = rating > 50
  ? require('./assets/sad-alt.png')
  : require('./assets/happy-alt.png');

  return (
    <Card title='আপনি কেমন বোধ করছেন?' containerStyle={{ borderRadius: 8, width: '95%' }}>
        <MainContainer>
          <EmoContainer>
              <Image
                source={emoIcon}
                style={{ width: 100, height: 120 }}
              />
          </EmoContainer>
          <Button
            buttonStyle={{
              borderRadius: 5,
              backgroundColor: '#ba262b'
            }}
            title="নিজেকে যাচাই করুন"
            onPress={onStartClick}
          />
        </MainContainer>
        <Button
          type="clear"
          title="আপনার মানসিক স্বাস্থ্যের হিস্ট্রি দেখুন"
          titleStyle={{
            color: '#ba262b'
          }}
          onPress={onHistoryClick}
        />
    </Card>
  )
}