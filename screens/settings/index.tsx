import React from 'react';
import { Drawer, Appbar, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HelpCenterScreen } from '../help-center';
import { AboutScreen } from '../about';

const { Navigator, Screen } = createStackNavigator();

export const SettingsNavigation = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="Settings" component={SettingsScreen} />
        <Screen name="HelpCenter" component={HelpCenterScreen} />
        <Screen name="About" component={AboutScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

export const SettingsScreen = ({ navigation }: any) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <ScrollView style={{ marginTop: 12, marginBottom: 12}}>
        <Drawer.Item
          icon="archive"
          label="About Us"
          onPress={() => navigation.navigate('About')}
        />
        <Drawer.Item
          icon="label"
          label="Privacy"
        />
        <Drawer.Item
          icon="equal"
          label="Help Center (Emergency Contact)"
          onPress={() => navigation.navigate('HelpCenter')}
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