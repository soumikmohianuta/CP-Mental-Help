import React from 'react';
import { Drawer, Appbar, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {PrivacyScreen} from '../privacy';
import { AboutScreen } from '../about';
import {AuthContext} from '../../context';

const { Navigator, Screen } = createStackNavigator();

export const SettingsNavigation = () => {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name="Settings" component={SettingsScreen} />
        <Screen name="About" component={AboutScreen} />
        <Screen name="Privacy" component={PrivacyScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

export const SettingsScreen = ({ navigation }: any) => {
  const {signOut} = React.useContext(AuthContext);
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
          onPress={() => navigation.navigate('Privacy')}
        />
        <Divider />
        <Drawer.Item
          icon="logout"
          label="Log out"
          onPress={() =>signOut()}
        />
      </ScrollView>
    </>
  )
}