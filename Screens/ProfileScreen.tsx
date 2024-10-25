import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';


interface Stat {
  label: string;
  value: number;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
}

export default function ProfileScreen() {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [bioHeight, setBioHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const stats: Stat[] = [
    { label: 'Posts', value: 248 },
    { label: 'Followers', value: 12453 },
    { label: 'Following', value: 567 },
  ];

  const recentActivity: Activity[] = [
    { id: '1', type: 'post', description: 'Shared a new photo', time: '2h ago' },
    { id: '2', type: 'like', description: 'Liked a comment', time: '4h ago' },
    { id: '3', type: 'comment', description: 'Commented on a post', time: '1d ago' },
    { id: '4', type: 'follow', description: 'Followed a new user', time: '2d ago' },
  ];

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.spring(animation, {
      toValue: expanded ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, Math.max(contentHeight + 40, 200)],
  });

  const styles = StyleSheet.create({
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

  return (
    <View style={styles.container}>
  
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Jane Doe</Text>
          <Text style={styles.username}>@jane_doe</Text>
        </View>

        <Animated.View style={[styles.bioContainer, { height: animatedHeight }]}>
          <View
            style={styles.bioContent}
            onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
          >
            <Text style={styles.bio} numberOfLines={expanded ? undefined : 3}>
              Passionate photographer 📸 | Travel enthusiast ✈️ | Coffee lover ☕️
              Exploring the world one snapshot at a time. Always looking for the next
              adventure and the perfect light. Let's connect and share our stories!
            </Text>
          </View>
          <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
            <Text style={styles.expandButtonText}>
              {expanded ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons
                  name={
                    activity.type === 'post'
                      ? 'image'
                      : activity.type === 'like'
                      ? 'heart'
                      : activity.type === 'comment'
                      ? 'chatbubble'
                      : 'person-add'
                  }
                  size={24}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
