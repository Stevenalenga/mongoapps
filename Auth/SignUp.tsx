import React, { useState, useEffect } from 'react';
import {  View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../ThemeContext';
import { signUp } from './SignUpApi';
import createStyles from '../Styles/SignUpStyles';
import { validateEmail, validatePassword } from '../Components/Validators'

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  Home: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

export default function SignUp() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const styles = createStyles();



  useEffect(() => {
    setIsFormValid(
      validateEmail(email) &&
      validatePassword(password) &&
      password === confirmPassword
    );
  }, [email, password, confirmPassword]);

  const handleSignUp = async () => {
    if (isFormValid) {
      try {
        const response = await signUp(email, email, password);
        Alert.alert('Success', 'Account created successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('MainTabs' as never);
            }
          }
        ]);
      } catch (error) {
        Alert.alert('Sign Up Failed', (error as Error).message);
      }
    } else {
      Alert.alert('Invalid Sign Up', 'Please check your information and try again.');
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={theme.colors.text + '80'} // 50% opacity
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <FontAwesome
            name={showConfirmPassword ? 'eye' : 'eye-slash'}
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={[styles.signUpButton, !isFormValid && { opacity: 0.5 }]}
        onPress={handleSignUp}
        disabled={!isFormValid}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
        <FontAwesome name="facebook" size={24} style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <FontAwesome name="google" size={24} style={styles.socialIcon} />
        <Text style={styles.socialButtonText}>Sign up with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.loginContainer}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Log In</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
