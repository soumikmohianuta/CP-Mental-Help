import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { getMentalHealthScore } from '../../services/firebase';
import { HistoryTable } from '../../components/history-table';
import { SCALE_NAME } from '../../utils/constants';

export const AnxietyScaleHistoryScreen = ({ navigation }: any) => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getAnxietyScaleHistory = async () => {
      const anxietyHistory = await getMentalHealthScore('2', SCALE_NAME.ANXIETY);
      setHistory(anxietyHistory);
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
          scale={SCALE_NAME.ANXIETY}
        />
      </ScrollView>
    </>
  )
}