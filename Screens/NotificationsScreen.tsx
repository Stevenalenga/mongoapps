import React, { useState, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  TextInput, 
  Animated, 
  RefreshControl,
  Alert
} from 'react-native';
import { useTheme } from '../ThemeContext';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';

interface Notification {
  id: number;
  userImage: string;
  title: string;
  description: string;
  timestamp: string;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    userImage: "https://picsum.photos/50",
    title: "New Message",
    description: "You have a new message from John",
    timestamp: "2 min ago"
  },
  {
    id: 2,
    userImage: "https://picsum.photos/51",
    title: "Friend Request",
    description: "Anna sent you a friend request",
    timestamp: "1 hour ago"
  },
  {
    id: 3,
    userImage: "https://picsum.photos/52",
    title: "Like",
    description: "Tom liked your post",
    timestamp: "3 hours ago"
  },
];

export default function NotificationsScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState(initialNotifications);
    const [refreshing, setRefreshing] = useState(false);

    const filteredNotifications = notifications.filter(notification =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      // Simulating a data fetch
      setTimeout(() => {
        setNotifications(initialNotifications);
        setRefreshing(false);
      }, 2000);
    }, []);

    const deleteNotification = useCallback((id: number) => {
      setNotifications(prevNotifications => 
        prevNotifications.filter(notification => notification.id !== id)
      );
    }, []);

    const clearAllNotifications = useCallback(() => {
      Alert.alert(
        "Clear All Notifications",
        "Are you sure you want to clear all notifications?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "OK", 
            onPress: () => setNotifications([])
          }
        ]
      );
    }, []);

    const renderRightActions = useCallback((progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>, id: number) => {
      const trans = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      return (
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => deleteNotification(id)}
        >
          <Animated.Text style={[styles.deleteButtonText, { opacity: trans }]}>
            Delete
          </Animated.Text>
        </TouchableOpacity>
      );
    }, [deleteNotification]);

    const renderNotification = useCallback(({ item }: { item: Notification }) => (
      <Swipeable
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}
      >
        <TouchableOpacity style={styles.notificationItem}>
          <Image source={{ uri: item.userImage }} style={styles.userImage} />
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.description, { color: theme.colors.text }]}>{item.description}</Text>
            <Text style={[styles.timestamp, { color: theme.colors.text }]}>{item.timestamp}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    ), [theme.colors.text, renderRightActions]);

    const styles = StyleSheet.create({
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
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <FontAwesome name="arrow-left" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Notifications</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.clearAllButton}
                        onPress={clearAllNotifications}
                    >
                        <Text style={styles.clearAllText}>Clear All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                    <FontAwesome 
                        name="search" 
                        size={20} 
                        color={theme.colors.text} 
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search notifications..."
                        placeholderTextColor={theme.colors.text}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <FlatList
                    data={filteredNotifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[theme.colors.primary]}
                        tintColor={theme.colors.primary}
                      />
                    }
                />
            </View>
        </SafeAreaView>
    );
}

