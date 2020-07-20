import React from 'react';
import { Appbar, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export const PSSScoreViewScreen = ({ route, navigation }: any) => {
  const { score, scale } = route.params;
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Your PSS Score" />
      </Appbar.Header>
      <Text>{score} {scale} </Text>
    </>
  )
}