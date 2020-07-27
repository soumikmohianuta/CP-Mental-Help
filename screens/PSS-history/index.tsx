import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { getMentalHealthScore } from '../../services/firebase';
import { HistoryTable } from '../../components/history-table';
import { SCALE_NAME } from '../../utils/constants';

export const PSSHistoryScreen = ({ navigation }: any) => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getPSSHistory = async () => {
      const pssHistory = await getMentalHealthScore('2', SCALE_NAME.PSS);
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
          scaleLevel={SCALE_NAME.PSS}
        />
      </ScrollView>
    </>
  )
}