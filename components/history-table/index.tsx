import React from 'react';
import { DataTable, Paragraph,Text } from 'react-native-paper';
import { getLevelByScore } from '../../utils/scale';

const dateFormat = (date: any) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

const getData = (history: any, scale: string) => Object.keys(history).map((key: string) => ({
  date: dateFormat(new Date(Number(key))),
  score: history[key],
  level: getLevelByScore(scale, history[key]),
}))

export const HistoryTable = ({ history, scale }: any) => {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>তারিখ</DataTable.Title>
        <DataTable.Title>স্কোর</DataTable.Title>
        <DataTable.Title>মাত্রা</DataTable.Title>
      </DataTable.Header>
      {
        history && Object.keys(history).length ?
          getData(history, scale).map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell><Text>{item.date.toString()}</Text></DataTable.Cell>
              <DataTable.Cell>{item.score}</DataTable.Cell>
              <DataTable.Cell>{item.level}</DataTable.Cell>
            </DataTable.Row>
          )):null
        
      }
  </DataTable>
  )
}