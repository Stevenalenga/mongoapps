import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './ThemeContext';
import { StatusBar } from 'react-native';
import Navigation from './Navigation';
import 'react-native-get-random-values';



const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};




const AppContent = () => {
  const { theme, themeType } = useTheme();

  return (
    <>
      <StatusBar 
        barStyle={themeType === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={theme.colors.background}
      />
      <NavigationContainer theme={theme}>
        <Navigation />
      </NavigationContainer>
    </>
  );
};

export default App;
