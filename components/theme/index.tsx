import React from 'react';
import { ThemeProvider as RNE_ThemeProvider } from 'react-native-elements';

const theme = {
  colors: {
    primary: '#ba262b',
    secondary: '#ababab',
  },
  Button: {
    type: 'outline',
    raised: true,
    buttonStyle: {
      borderRadius: 5,
    },
  },
  Card: {
    containerStyle: {
      borderRadius: 8,
      width: '95%',
    },
  }
};

export const ThemeProvider = ({ children }: any) => (
  <RNE_ThemeProvider theme={theme}>
    {children}
  </RNE_ThemeProvider>
);
