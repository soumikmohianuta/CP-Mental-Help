import React from 'react';
import { useFonts, Alegreya_400Regular } from '@expo-google-fonts/alegreya';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Alegreya_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Alegreya_400Regular',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Alegreya_400Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Alegreya_400Regular',
      fontWeight: 'normal',
    },
  },
};
fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ba262b',
    accent: '#ababab',
  },
  fonts: configureFonts(fontConfig),
};

export const ThemeProvider = ({ children }: any) => {
  let [fontsLoaded] = useFonts({
    Alegreya_400Regular,
  });
  return fontsLoaded && (
    <PaperProvider theme={theme}>
      {children}
    </PaperProvider>
  );
}
