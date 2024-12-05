
import { StyleSheet,Dimensions } from 'react-native';
import { useTheme } from '../../ThemeContext';



const createStyles = () => {
const { theme } = useTheme();

return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: 'absolute',
    },
    header: {
      position: 'absolute',
      top: 50,
      left: 15,
      right: 15,
      zIndex: 1,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 25,
      paddingHorizontal: 15,
      height: 50,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    searchInput: {
      height: 50,
      color: theme.colors.text,
      fontSize: 16,
      borderRadius: 25,
    },
    searchIcon: {
      padding: 5,
      marginRight: 5,
      position: 'absolute',
      right: 10,
      zIndex: 1,
    },
    historyContainer: {
      position: 'absolute',
      top: 80,
      left: 15,
      right: 15,
      backgroundColor: theme.colors.card,
      borderRadius: 15,
      elevation: 5,
      zIndex: 1000,
    },
    historyItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    clearButton: {
      padding: 15,
      alignItems: 'center',
    },
    addButton: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      padding: 15,
      zIndex: 1000,
    },
  });

}
  export default createStyles;