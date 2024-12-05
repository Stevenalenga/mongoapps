import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from '../ThemeContext';
import createStyles from './ScreenStyles/LoginScreenStyles';

export default function LoginScreen() {
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const styles = createStyles();

 

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={theme.colors.text + '80'}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.text + '80'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => { 
              Keyboard.dismiss(); 
              // handle login 
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}