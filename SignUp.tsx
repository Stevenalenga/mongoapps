import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from './ThemeContext';

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

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && !password.includes(' ');
  };

  useEffect(() => {
    setIsFormValid(
      validateEmail(email) &&
      validatePassword(password) &&
      password === confirmPassword
    );
  }, [email, password, confirmPassword]);

  const handleSignUp = () => {
    if (isFormValid) {
      // Here you would typically make an API call to create a new user
      // For this example, we'll just simulate a successful sign up
      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to the Home screen after the user dismisses the alert
            navigation.navigate('MainTabs' as never);
          }
        }
      ]);
    } else {
      Alert.alert('Invalid Sign Up', 'Please check your information and try again.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 50, // Increased height
      borderColor: theme.colors.border,
      borderWidth: 1,
      marginBottom: 15, // Increased margin
      borderRadius: 10, // Added border radius
    },
    input: {
      flex: 1,
      height: '100%',
      paddingLeft: 15, // Increased padding
      paddingRight: 45, // Increased padding
      color: theme.colors.text,
      fontSize: 16, // Increased font size
    },
    signUpButton: {
      backgroundColor: theme.colors.primary,
      padding: 15, // Increased padding
      borderRadius: 25, // Increased border radius for more rounded corners
      width: '100%',
      alignItems: 'center',
    },
    signUpButtonText: {
      color: '#ffffff',
      fontSize: 18, // Increased font size
      fontWeight: 'bold',
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15, // Increased padding
      borderRadius: 25, // Increased border radius for more rounded corners
      width: '100%',
      marginTop: 15, // Increased margin
    },
    facebookButton: {
      backgroundColor: '#3b5998',
    },
    googleButton: {
      backgroundColor: '#db4a39',
    },
    socialIcon: {
      marginRight: 10,
      color: '#ffffff',
    },
    socialButtonText: {
      color: '#ffffff',
      fontSize: 16,
      flex: 1,
      textAlign: 'center',
    },
    loginContainer: {
      marginTop: 20,
    },
    loginText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    loginLink: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    eyeIcon: {
      position: 'absolute',
      right: 15,
      height: '100%',
      justifyContent: 'center',
    },
  });

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
