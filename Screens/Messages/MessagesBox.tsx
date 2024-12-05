import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../ThemeContext';
import { Contact } from '../../navigation/types';
import { FontAwesome } from '@expo/vector-icons';

type RootStackParamList = {
  MessagesWindow: { contact: Contact };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MessagesWindow'>;

export interface MessageBoxProps {
  contact: Contact;
}

const MessageBox: React.FC<MessageBoxProps> = ({ contact }) => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const backgroundColor = theme.colors.card || theme.colors.background;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const renderProfilePicture = () => {
    if (contact.profilePicture) {
      return <Image source={{ uri: contact.profilePicture }} style={styles.profilePicture} />;
    } else {
      return (
        <View style={[styles.profilePicture, styles.initialsContainer, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.initials}>{getInitials(contact.name)}</Text>
        </View>
      );
    }
  };

  return (
    <Animated.View style={{ opacity: animation }}>
      <TouchableOpacity
        style={[styles.messageBox, { backgroundColor }]}
        onPress={() => navigation.navigate('MessagesWindow', { contact })}
        activeOpacity={0.7}
      >
        {renderProfilePicture()}
        <View style={styles.messageContent}>
          <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
            {contact.name}
          </Text>
          <Text style={[styles.preview, { color: theme.colors.text }]} numberOfLines={2}>
            {contact.messagePreview}
          </Text>
        </View>
        <View style={styles.metaContainer}>
          <Text style={[styles.time, { color: theme.colors.text }]}>12:34 PM</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>2</Text>
          </View>
          <FontAwesome name="angle-right" size={20} color={theme.colors.text} style={styles.chevron} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  messageBox: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  preview: {
    fontSize: 14,
    opacity: 0.7,
  },
  metaContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 5,
  },
  badgeContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chevron: {
    opacity: 0.3,
  },
});

export default MessageBox;

