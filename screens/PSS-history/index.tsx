import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { getMentalHealthScore } from '../../services/firebase';
import { HistoryTable } from '../../components/history-table';

const SCALE_LEVEL = [
  {
    name: 'Low',
    maxRange: 13,
  },
  {
    name: 'Moderate',
    maxRange: 26,
  },
  {
    name: 'High Percieved',
    maxRange: 40,
  }];

export const PSSHistoryScreen = ({ navigation }: any) => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getPSSHistory = async () => {
      const pssHistory = await getMentalHealthScore('2', 'pss');
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
        <HistoryTable
          history={history}
          scaleLevel={SCALE_LEVEL}
        />
      </ScrollView>
    </>
  )
}