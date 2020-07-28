import React, { useEffect, useState, useContext } from 'react';
import { Appbar, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { getMentalHealthScore } from '../../services/firebase';
import { HistoryTable } from '../../components/history-table';
import { UserContext } from '../../context';
import { SCALE_NAME_MAP } from '../../utils/constants';

export const ScaleHistoryViewScreen = ({ route, navigation }: any) => {
  const [history, setHistory] = useState([]);
  const { userName: userId } = useContext(UserContext);

  const { scale } = route.params;
  const scaleName =  SCALE_NAME_MAP.get(scale);
  useEffect(() => {
    const getHistory = async () => {
      const historyData = await getMentalHealthScore(userId, scale);
      setHistory(historyData);
    };
    getHistory();
  }, []);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title={`আপনার ${scaleName} ইতিহাস`} />
      </Appbar.Header>
      <ScrollView style={{ margin: 12 }}>
        <HistoryTable
          history={history}
          scale={scale}
        />
      </ScrollView>
    </>
  )
}