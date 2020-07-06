import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { getMentalHealthScore } from '../../services/firebase';
import { HistoryTable } from '../../components/history-table';

const SCALE_LEVEL = [
  {
    name: 'Mild anxiety',
    maxRange: 54,
  },
  {
    name: 'Moderate anxiety',
    maxRange: 66,
  },
  {
    name: 'Severe anxiety',
    maxRange: 77,
  },
  {
    name: 'Profound anxiety',
    maxRange: 135,
  }];

export const AnxietyScaleHistoryScreen = ({ navigation }: any) => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getAnxietyScaleHistory = async () => {
      const pssHistory = await getMentalHealthScore('2', 'anxiety_scale');
      setHistory(pssHistory);
    };
    getAnxietyScaleHistory();
  }, []);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title="Your Anxiety Scale Score History" />
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