import React from 'react';
import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { Text, Button, Card, Icon } from 'react-native-elements';

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;

const roundButtonStyle = {
  height: 50,
  borderRadius: 25,
  marginBottom: 16,
};

const RoundCard = styled(Card)`
  border-radius: 20px;
`;

export const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <Container>
        <RoundCard title='আপনার মানসিক স্বাস্থ্যের রেটিং'>
            <Text style={{marginBottom: 20, fontSize: 30}}>
              আপনি নিজেকে বর্তমানে ১০০ এর মধ্যে ৭০ রেটিং দিয়েছেন
            </Text>
            <Button
              buttonStyle={roundButtonStyle}
              type="outline"
              title="হিস্টরি দেখুন"
              onPress={() => navigation.navigate('CurrentState')}
            />
            <Button
              buttonStyle={roundButtonStyle}
              title="পুনরায় রেটিং করুন"
              onPress={() => navigation.navigate('CurrentState')}
            />
          </RoundCard>
          <Button
            buttonStyle={roundButtonStyle}
            title="মানসিক অবস্থার পরিমাপ"
            onPress={() => navigation.navigate('MentalStateMeasure')}
          />
      </Container>
    </ScrollView>
  );
}