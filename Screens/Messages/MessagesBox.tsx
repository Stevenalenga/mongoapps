import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../ThemeContext';
import { Contact } from '../../navigation/types';

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

  // Use background color as fallback if card color is not available
  const backgroundColor = theme.colors.card || theme.colors.background;

  return (
    <TouchableOpacity
      style={[styles.messageBox, { backgroundColor }]}
      onPress={() => navigation.navigate('MessagesWindow', { contact })}
    >
      <Image source={{ uri: contact.profilePicture }} style={styles.profilePicture} />
      <View style={styles.messageContent}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{contact.name}</Text>
        <Text style={[styles.preview, { color: theme.colors.text }]}>{contact.messagePreview}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageBox: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  preview: {
    fontSize: 14,
  },
});

export default MessageBox;
