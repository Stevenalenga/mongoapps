import { StyleSheet,Dimensions } from 'react-native';
import { useTheme } from '../../ThemeContext';


const createStyles = () => {
    const { theme } = useTheme();
  
    return StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    clearAllButton: {
        padding: 8,
    },
    clearAllText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    notificationItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.background,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "gray",
    },
    timestamp: {
        fontSize: 12,
        color: "gray",
        marginTop: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingLeft: 40,
        color: theme.colors.text,
    },
    searchIcon: {
        position: 'absolute',
        left: 25,
        zIndex: 1,
    },
    deleteButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'flex-end',
      width: 100,
      height: '100%',
    },
    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
      padding: 20,
    },
})
}
export default createStyles;
