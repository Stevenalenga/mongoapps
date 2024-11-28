import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useTheme } from '../ThemeContext';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Notification {
  id: number;
  userImage: string;
  title: string;
  description: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    userImage: "https://picsum.photos/50",
    title: "New Message",
    description: "You have a new message from John",
  },
  {
    id: 2,
    userImage: "https://picsum.photos/51",
    title: "Friend Request",
    description: "Anna sent you a friend request",
  },
  {
    id: 3,
    userImage: "https://picsum.photos/52",
    title: "Like",
    description: "Tom liked your post",
  },
];

export default function NotificationsScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation();

    const renderNotification = ({ item }: { item: Notification }) => (
        <TouchableOpacity style={styles.notificationItem}>
          <Image source={{ uri: item.userImage }} style={styles.userImage} />
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.description, { color: theme.colors.text }]}>{item.description}</Text>
          </View>
        </TouchableOpacity>
    );

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
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
        },
        backButton: {
            marginRight: 16,
        },
        headerTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.text,
        },
        notificationItem: {
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
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
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <FontAwesome name="arrow-left" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    );
}
