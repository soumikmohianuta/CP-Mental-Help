
import React from 'react';
import styled from 'styled-components/native';
import { Image, View } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

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

const ScoreContainer = styled(View)`
  display: flex;
  flex-direction: column;
`

export const MentalHealthMeasureCard = ({ onStartClick, onHistoryClick, rating }: any) => {
  var emoIcon = rating > 50
  ? require('./assets/sad-alt.png')
  : require('./assets/happy-alt.png');

  return (
    <>
    {/* <Card title='আপনার মানসিক স্বাস্থ্য কেমন?' containerStyle={{ borderRadius: 8, width: '95%' }}>
        <MainContainer>
          {/* <EmoContainer>
              <Image
                source={emoIcon}
                style={{ width: 100, height: 120 }}
              />
          </EmoContainer> */}
          {/* <ScoreContainer>
          <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
          </Button> */}
            {/* <Button
              title="নিজেকে যাচাই করুন"
              onPress={onStartClick}
            /> */}
            {/* <Text style={{ fontSize: 16 }}>আপনার স্কোরঃ
            </Text>
            <View>
              <Text style={{ fontSize: 24 }}>৩০</Text>
            </View> */}
          {/* </ScoreContainer>
        </MainContainer> */}
        {/* <Button
          type="clear"
          title="আপনার মানসিক স্বাস্থ্যের হিস্ট্রি দেখুন"
          titleStyle={{
            color: '#ba262b'
          }}
          onPress={onHistoryClick}
        /> */}
    {/* </Card> */}
    <Card>
        <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button onPress={onStartClick}>Ok</Button>
        </Card.Actions>
      </Card>
    </>
  )
}