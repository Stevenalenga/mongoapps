import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';
import CreateStyles from './ScreenStyles/ProfileScreenStyles';


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
  const [contentHeight, setContentHeight] = useState(0);
  const styles = CreateStyles();

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


  return (
    <View style={styles.container}>
  
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>James Doe</Text>
          <Text style={styles.username}>@james_doe</Text>
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
