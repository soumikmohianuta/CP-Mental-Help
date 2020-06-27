import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ba262b',
    accent: '#ababab',
  },
};

export const ThemeProvider = ({ children }: any) => (
  <PaperProvider theme={theme}>
    {children}
  </PaperProvider>
);
