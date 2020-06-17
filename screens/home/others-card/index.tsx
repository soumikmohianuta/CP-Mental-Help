
import React from 'react';
import { Card, Button } from 'react-native-elements';

export const OthersCard = ({ }: any) => {
  return (
    <Card title='অন্যান্য' containerStyle={{ borderRadius: 8, width: '95%' }}>
        <Button
          type="clear"
          title="Psychotic"
          titleStyle={{
            color: '#ba262b'
          }}
        />
        <Button
          type="clear"
          title="Suicidal Ideation"
          titleStyle={{
            color: '#ba262b'
          }}
        />
        <Button
          type="clear"
          title="Domestic violence"
          titleStyle={{
            color: '#ba262b'
          }}
        />
    </Card>
  )
}