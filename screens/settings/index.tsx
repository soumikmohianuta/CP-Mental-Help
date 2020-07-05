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
          icon="archive"
          label="About Us"
        />
        <Drawer.Item
          icon="label"
          label="Privacy"
        />
        <Drawer.Item
          icon="equal"
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