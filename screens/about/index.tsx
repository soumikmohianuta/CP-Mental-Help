import React from 'react';
import { Appbar, Card, Paragraph } from 'react-native-paper';
import { about } from './content';
import { ScrollView } from 'react-native-gesture-handler';

export const AboutScreen = ({ navigation }: any) => {

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Settings')}  />
        <Appbar.Content title="About" />
      </Appbar.Header>
      <ScrollView>
        <Card elevation={5} style={{ margin: 12, borderRadius: 5 }}>
          <Card.Title title='About us' />
          <Card.Content>
            <Paragraph>{about.block1}</Paragraph>
            <Paragraph>{about.block2}</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}