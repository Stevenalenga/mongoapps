import { StyleSheet,Dimensions } from 'react-native';
import { useTheme } from '../../ThemeContext';


const createStyles = () => {
    const { theme } = useTheme();
  
    return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.card,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    username: {
      fontSize: 16,
      color: theme.colors.text,
      opacity: 0.7,
    },
    bioContainer: {
      backgroundColor: theme.colors.card,
      padding: 20,
      margin: 15,
      borderRadius: 15,
      overflow: 'hidden',
    },
    bioContent: {
      marginBottom: 25,
    },
    bio: {
      fontSize: 14,
      color: theme.colors.text,
      lineHeight: 20,
    },
    expandButton: {
      position: 'absolute',
      bottom: 10,
      right: 20,
      backgroundColor: theme.colors.card,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    expandButtonText: {
      color: theme.colors.primary,
      fontSize: 14,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: theme.colors.card,
      padding: 15,
      margin: 15,
      borderRadius: 15,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    statLabel: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.7,
    },
    activityContainer: {
      backgroundColor: theme.colors.card,
      padding: 15,
      margin: 15,
      borderRadius: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 10,
    },
    activityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    activityIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    activityContent: {
      flex: 1,
    },
    activityDescription: {
      fontSize: 14,
      color: theme.colors.text,
    },
    activityTime: {
      fontSize: 12,
      color: theme.colors.text,
      opacity: 0.7,
      marginTop: 2,
    },
    editButton: {
      backgroundColor: theme.colors.primary,
      padding: 15,
      margin: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    editButtonText: {
      color: theme.colors.background,
      fontSize: 16,
      fontWeight: 'bold',
    },
    });
  
}
export default createStyles;