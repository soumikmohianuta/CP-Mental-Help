import React from 'react';
import { Appbar, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import ScoreCard from '../../components/scorecard';

export const PSSScoreViewScreen = ({ route, navigation }: any) => {
  const { score, scale } = route.params;
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title="Your PSS Score" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12, marginTop: 32 }}>
          <ScoreCard
            size={256}
            defaultPos={score}
            // TODO: max need to be change upon scale
            max={100}
          >
            <Text style={{ fontSize: 76 }}>
              {score}
            </Text>
          </ScoreCard>
      </ScrollView>
    </>
  )
}