import React, { useEffect, useState, useContext } from 'react';
import { Appbar, Text,ActivityIndicator, Paragraph, Headline } from 'react-native-paper';
import {
  View,  ScrollView} from "react-native";
import { getMentalHealthScore } from '../../services/firebase';
import { HistoryTable } from '../../components/history-table';
import { UserContext } from '../../context';
import { SCALE_NAME_MAP } from '../../utils/constants';
import {SCALE_Label} from './content';
import {
  LineChart
} from 'react-native-chart-kit';
import { database } from 'firebase';

export const ScaleHistoryViewScreen = ({ route, navigation }: any) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userName: userId } = useContext(UserContext);
  const [labelData, setLabelData] = useState([]);
  const [valueData, setValueData] = useState([]);


  const dateFormat = (date: any) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }
 
   const setLineData = (history: any) =>{
      Object.keys(history).forEach(function(key) {
        const dateData = dateFormat(new Date(Number(key)));
        setLabelData(oldArray => [...oldArray, dateData]);
        setValueData(oldArray => [...oldArray, history[key]]);
    });

    }
  
  const getLatestFive=(historyData:any)=>{
    let sortedData =Object.keys(historyData);
    if(sortedData.length>5){
      sortedData= sortedData.slice(Math.max(sortedData.length - 5, 1))
      }
      var sortedHistoryData = {}
      Object.keys(historyData).forEach(function(key) {
              if (sortedData.includes(key)){
                sortedHistoryData[key] = historyData[key];
              }
            });

    return sortedHistoryData;
  }

  const { scale } = route.params;
  const scaleName =  SCALE_NAME_MAP.get(scale);
  const socreLabelText= SCALE_Label.get(scale);
  useEffect(() => {
    const getHistory = async () => {
      try{
      const historyData = await getMentalHealthScore(userId, scale);
      console.log(historyData);
      if(historyData!=null){
        if (Object.keys(historyData).length>5){
         const historylatest = getLatestFive(historyData);
          getLatestFive(historylatest);
          setHistory(historylatest);
         setLineData(historylatest);
        }
        else{
          getLatestFive(historyData);
          setHistory(historyData);
         setLineData(historyData);
        }
      }

      }
      catch{
        alert("ব্যক্তিগত তথ্য দেখানো যাচ্ছে না") 
      }

      setLoading(false);
    };
    getHistory();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('MentalHealthMeasureList')}  />
        <Appbar.Content title={`আপনার ${scaleName} ইতিহাস`} />
      </Appbar.Header>
      <ScrollView style={{ margin: 12} }>
        {labelData.length>0 &&<Headline>আপনার মানসিক অবস্থার গ্রাফ</Headline>}
      {labelData.length>0 && <LineChart
          data={{
          labels: labelData,
          datasets: [{data:valueData}]
        }}    
        width={350} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
        backgroundColor: "rgb(231, 231, 231)",
        backgroundGradientFrom: 'rgb(255, 97, 99)',
        backgroundGradientTo: 'rgb(247, 129, 119)',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#c62828"
      }
    }}
  
      bezier
      style={{
       marginVertical: 8,
        borderRadius: 16
     }}
    
    />
  }
     {labelData.length>0 ? <Paragraph>{socreLabelText}</Paragraph>:
     <>
     <View style={{
          flex: 1, 
          alignItems: 'center',
          justifyContent: 'center', 
        }}>

     <Headline> আপনি এখনো পরিমাপ করেননি </Headline>
     </View>
     </>}
     
     
     {labelData.length>0 &&<HistoryTable
          history={history}
          scale={scale}
        />
        }
      </ScrollView>
    </>
  )
}