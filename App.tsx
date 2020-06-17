import 'react-native-gesture-handler';

import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './screens/home';
import { LoginScreen } from './screens/login';
import { CurrentStateScreen } from './screens/current-state';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Navigator>
          <Screen name="Login" component={LoginScreen} />
          <Screen name="Home" component={HomeScreen} />
          <Screen
            options={{ title: 'আপনার বর্তমান অবস্থা' }}
            name="CurrentState"
            component={CurrentStateScreen}
          />
        </Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}