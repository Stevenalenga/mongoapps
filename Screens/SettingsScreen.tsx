import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  // ... other screen names
};

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const SettingsScreen: React.FC = () => {
  const { theme, themeType, setThemeType } = useTheme();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const toggleTheme = () => {
    if (themeType === 'light') setThemeType('dark');
    else if (themeType === 'dark') setThemeType('lightBlueDark');
    else setThemeType('light');
  };

  const handleLogout = () => {
    // Here you would typically clear any stored user data or tokens
    // For this example, we'll just navigate to the Login screen
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.text, { color: theme.colors.text }]}>Settings Screen</Text>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.colors.primary }]} 
        onPress={toggleTheme}
      >
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>
      <Text style={[styles.text, { color: theme.colors.text }]}>Current Theme: {themeType}</Text>
      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]} 
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 200,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30', // A red color for the logout button
    marginTop: 40, // Add more space above the logout button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

