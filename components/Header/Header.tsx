import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Platform } from "react-native"
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from '../../ThemeContext';

export interface HeaderProps {
  username?: string;
  profileImageUrl?: string;
  showBackButton?: boolean;
  onLeftPress?: () => void;
  isOnline?: boolean;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  username, 
  profileImageUrl, 
  showBackButton, 
  onLeftPress,
  isOnline = false,
  onRightPress
}) => {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 12,
        bounciness: 8,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.header, 
        { 
          backgroundColor: theme.colors.background,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconButton} accessibilityLabel="Go back">
            <Icon name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <Animated.View style={[styles.centerContainer, { opacity: fadeAnim }]}>
        <View style={styles.profileContainer}>
          {profileImageUrl && (
            <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
          )}
          {isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View>
          <Text style={[styles.username, { color: theme.colors.text }]}>{username}</Text>
          <Text style={[styles.status, { color: theme.colors.text }]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
      </Animated.View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onRightPress} style={styles.iconButton} accessibilityLabel="Open menu">
          <Icon name="ellipsis-vertical" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  profileContainer: {
    position: 'relative',
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 12,
    opacity: 0.7,
  },
});

export default Header;

