import 'react-native-gesture-handler';

import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './screens/home';
import { InitialQuestionnaireScreen } from './screens/initial-questionnaire';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Navigator>
          <Screen name="Home" component={HomeScreen} />
          <Screen
            options={{ title: 'Initial Questions' }}
            name="InitialQuestionnaire"
            component={InitialQuestionnaireScreen}
          />
        </Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}