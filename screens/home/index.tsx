import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;


export const HomeScreen = ({ navigation }) => {
  return (
    <Container>
      <Button
        buttonStyle={{
          height: 60,
          borderRadius: 30,
          width: '100%',
          marginBottom: 32,
        }}
        type="outline"
        title="আপনার বর্তমান অবস্থা"
        onPress={() => navigation.navigate('CurrentState')}
      />
      <Button
        type="outline"
        buttonStyle={{
          height: 60,
          borderRadius: 30,
          width: '100%',
          marginBottom: 32,
        }}
        title="মানসিক অবস্থার পরিমাপ"
        onPress={() => navigation.navigate('MentalStateMeasure')}
      />
    </Container>
  );
}