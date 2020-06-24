import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

// primary: '#ba262b',
// secondary: '#ababab',

export const ThemeProvider = ({ children }: any) => (
  <PaperProvider>
    {children}
  </PaperProvider>
);
