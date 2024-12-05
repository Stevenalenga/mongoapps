import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../ThemeContext';
import { login } from './LoginApi';
import { validateEmail, validatePassword } from '../Components/Validators'
import createStyles from '../Screens/ScreenStyles/LoginStyles';

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const styles = createStyles();

  useEffect(() => {
    setIsFormValid(validateEmail(email) && validatePassword(password));
  }, [email, password]);

  const handleLogin = async () => {
    if (isFormValid) {
      setLoading(true);
      try {
        const token = await login(email, password);
        console.log('Login successful, token:', token);
        setEmail('');
        setPassword('');
        navigation.navigate("MainTabs" as never);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Login error details:', error);
          if (error.message === 'Network Error') {
            Alert.alert('Network Error', 'Please check your internet connection and try again.');
          } else if (error.message === 'Incorrect username or password') {
            Alert.alert('Login Failed', 'Incorrect username or password. Please try again.');
          } else {
            Alert.alert('Login Failed', error.message);
          }
        } else {
          Alert.alert('Login Failed', 'An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Invalid Login', 'Please enter a valid email and password.');
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.text + '80'} // 50% opacity
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.text + '80'} // 50% opacity
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <FontAwesome
            name={showPassword ? 'eye' : 'eye-slash'}
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.loginButton, !isFormValid && { opacity: 0.5 }]}
        disabled={!isFormValid || loading}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>
            {loading ? <ActivityIndicator size="small" color={theme.colors.text} /> : 'Log In'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
        <FontAwesome name="facebook" size={24} style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <FontAwesome name="google" size={24} style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.signUpContainer}
        onPress={() => navigation.navigate('SignUp' as never)}
      >
        <Text style={styles.signUpText}>Not signed up? <Text style={styles.signUpLink}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
