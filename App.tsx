import 'react-native-gesture-handler';

import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen } from './screens/home';
// import { LoginScreen } from './screens/login';
import { ProfileScreen } from './screens/profile';

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Navigator>
          <Screen name="Home" component={HomeStackScreen} />
          <Screen
            name="Profile"
            component={ProfileScreen}
          />
        </Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}