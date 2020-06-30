import React from 'react';
import { DataTable, Text } from 'react-native-paper';

const dateFormat = (date: any) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export const HistoryTable = ({  history }: any) => {
  const data = Object.keys(history).map((key: string) => ({
    date: dateFormat(new Date(Number(key))),
    score: history[key]
  }));

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Score</DataTable.Title>
      </DataTable.Header>
      {
        data.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell><Text>{item.date.toString()}</Text></DataTable.Cell>
            <DataTable.Cell>{item.score}</DataTable.Cell>
          </DataTable.Row>
        ))
      }
  </DataTable>
  )
}