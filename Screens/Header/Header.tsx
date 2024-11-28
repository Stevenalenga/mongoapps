import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native"
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from '../../ThemeContext';

export interface HeaderProps {
  username?: string;
  profileImageUrl?: string;
  showBackButton?: boolean;
  onLeftPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  username, 
  profileImageUrl, 
  showBackButton, 
  onLeftPress 
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={onLeftPress} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerContainer}>
        {profileImageUrl && <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />}
        <Text style={[styles.username, { color: theme.colors.text }]}>{username}</Text>
      </View>
      <View style={styles.rightContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
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
  },
  backButton: {
    padding: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
