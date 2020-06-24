import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {PersonalProfile} from './personalProfile';
import {MentalProfileStack} from './mentalProfile';
const { Navigator, Screen } = createMaterialTopTabNavigator();

export const ProfileScreen = () => {
  return (
    <Navigator>
      <Screen
        name="FirstPage"
        component={PersonalProfile}
        options={{
          tabBarLabel: 'Personal',

        }}  />
      <Screen
        name="SecondPage"
        component={MentalProfileStack}
        options={{
          tabBarLabel: 'Mental',

        }} />
    </Navigator>
  );
}

