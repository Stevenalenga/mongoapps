import { StyleSheet,Dimensions } from 'react-native';
import { useTheme } from '../../ThemeContext';

const createStyles = () => {
    const { theme } = useTheme();
  
    return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#fff",
      borderLeftWidth: 1,
      borderColor: "#ccc",
    },
    header: {
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: "#666",
    },
    separator: {
      height: 1,
      backgroundColor: "#ccc",
      marginVertical: 16,
    },
    commentsHeader: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 8,
    },
    scrollArea: {
      flexGrow: 0,
    },
    commentContainer: {
      marginBottom: 16,
    },
    commentHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 8,
    },
    userName: {
      fontSize: 14,
      fontWeight: "bold",
    },
    date: {
      fontSize: 12,
      color: "#666",
    },
    commentText: {
      fontSize: 14,
    },
  });
}
export default createStyles;