import { StyleSheet,Dimensions } from 'react-native';
import { useTheme } from '../../ThemeContext';


const createStyles = () => {
    const { theme } = useTheme();
  
    return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      height: 50,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
      color: theme.colors.text,
    },
    button: {
      height: 50,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 16,
    },
  })

}
export default createStyles;