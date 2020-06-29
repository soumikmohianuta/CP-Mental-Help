import React from 'react';
import { Drawer, Appbar, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export const SettingsScreen = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <ScrollView style={{ marginTop: 12, marginBottom: 12}}>
        <Drawer.Item
          icon="info"
          label="About Us"
        />
        <Drawer.Item
          icon="star"
          label="Privacy"
        />
        <Drawer.Item
          icon="help"
          label="Help Center"
        />
        <Divider />
        <Drawer.Item
          icon="logout"
          label="Log out"
        />
      </ScrollView>
    </>
  )
}