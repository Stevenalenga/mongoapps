import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import Header from './Header/Header';


export default function ProfileScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    text: {
      fontSize: 18,
      color: theme.colors.text,
      marginBottom: 20,
    },
    
    
  });



  return (
    <View style={styles.container}>
   <Header />
      <Text style={styles.text}>Profile Screen</Text>
      
    
    </View>
  );
}
