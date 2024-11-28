import { StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

const createStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
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
      height: 50,
      borderColor: theme.colors.border,
      borderWidth: 1,
      marginBottom: 15,
      borderRadius: 10,
    },
    input: {
      flex: 1,
      height: '100%',
      paddingLeft: 15,
      paddingRight: 45,
      color: theme.colors.text,
      fontSize: 16,
    },
    signUpButton: {
      backgroundColor: theme.colors.primary,
      padding: 15,
      borderRadius: 25,
      width: '100%',
      alignItems: 'center',
    },
    signUpButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 25,
      width: '100%',
      marginTop: 15,
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
};

export default createStyles;