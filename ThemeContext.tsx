import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define our custom themes
const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    text: '#000000',
    primary: '#1E90FF',
  },
};

const CustomDarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#121212',
    text: '#FFFFFF',
    primary: '#BB86FC',
  },
};

const LightBlueDarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#1A2B3C',
    text: '#FFFFFF',
    primary: '#4FC3F7',
  },
};

type ThemeType = 'light' | 'dark' | 'lightBlueDark';

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeType, setThemeType] = useState<ThemeType>('light');

  useEffect(() => {
    // Load the saved theme when the app starts
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeType');
      if (savedTheme !== null) {
        setThemeType(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error('Failed to load the theme', error);
    }
  };

  const setThemeTypeAndSave = async (newThemeType: ThemeType) => {
    setThemeType(newThemeType);
    try {
      await AsyncStorage.setItem('themeType', newThemeType);
    } catch (error) {
      console.error('Failed to save the theme', error);
    }
  };

  const theme = 
    themeType === 'dark' ? CustomDarkTheme :
    themeType === 'lightBlueDark' ? LightBlueDarkTheme :
    LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeType, setThemeType: setThemeTypeAndSave }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
