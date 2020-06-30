import React, { useEffect, useState } from 'react';
import { Appbar, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { getMentalHealthScore } from '../../services/firebase';

export const PSSHistoryScreen = ({ navigation }: any) => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getPSSHistory = async () => {
      const pssHistory = await getMentalHealthScore('1', 'pss');
      setHistory(pssHistory);
    };
    getPSSHistory();
  }, []);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title="Your PSS Score History" />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>
        <Text>{JSON.stringify(history, null, 2)}</Text>
      </ScrollView>
    </>
  )
}