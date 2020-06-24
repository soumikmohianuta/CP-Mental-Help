import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import {PersonalProfile} from './personalProfile';
import {MentalProfileStack} from './mentalProfile';
const Container = styled(View)`
  flex: 1;
  align-items: center;
`;

const { Navigator, Screen } = createMaterialTopTabNavigator();
export const ProfileScreen = () => {
  return (
    <Navigator
      tabBarOptions={{
        // style: {
        //   backgroundColor: '#B82204',
        //  },
        //  labelStyle: {
        //    textAlign: 'center',
        // },
        // indicatorStyle: {
        //    borderBottomColor: '#423C3B',
        //    borderBottomWidth: 2,
        // },
       }}>
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

