import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './screens/home';
import { InitialQuestionnaireScreen } from './screens/initial-questionnaire';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={HomeScreen} />
        <Screen name="InitialQuestionnaireScreen" component={InitialQuestionnaireScreen} />
      </Navigator>
    </NavigationContainer>
  );
}