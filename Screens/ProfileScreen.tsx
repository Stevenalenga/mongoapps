import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import Header from './Header/Header';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

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
   
      <Text style={styles.text}>Profile Screen</Text>
      
    
    </View>
  );
}
