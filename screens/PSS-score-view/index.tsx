import React from 'react';
import { Appbar, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

// const SCALE_LEVEL = [
//   {
//     name: 'Low',
//     maxRange: 13,
//   },
//   {
//     name: 'Moderate',
//     maxRange: 26,
//   },
//   {
//     name: 'High Percieved',
//     maxRange: 40,
//   }];

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