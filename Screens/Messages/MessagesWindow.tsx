import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Contact } from '../../navigation/types';
import Header from '../Header/Header';
import { useTheme } from '../../ThemeContext';

interface Message {
  text: string;
  isUser: boolean;
}

const MessagesWindow: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const contact = (route.params as { contact: Contact })?.contact;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const { theme } = useTheme();

  if (!contact) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>No contact information available</Text>
      </View>
    );
  }

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText.trim(), isUser: true }]);
      setInputText('');
    }
  };

  const handlePlusPress = () => {
    // Handle plus button press
    console.log('Plus button pressed');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>     
        <Header 
          username={contact.name}
          profileImageUrl={contact.profilePicture}
          showBackButton={true}
          onLeftPress={() => navigation.goBack()}
        />
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={[
              styles.messageContainer,
              item.isUser ? styles.userMessage : styles.contactMessage
            ]}>
              {!item.isUser && (
                <Image
                  source={{ uri: contact.profilePicture }}
                  style={styles.messageProfilePic}
                />
              )}
              <View style={[
                styles.messageBubble,
                { backgroundColor: item.isUser ? theme.colors.primary : theme.colors.card }
              ]}>
                <Text style={[styles.messageText, { color: item.isUser ? 'white' : theme.colors.text }]}>
                  {item.text}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TouchableOpacity onPress={handlePlusPress} style={styles.plusButton}>
              <FontAwesome name="plus-circle" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { color: theme.colors.text }]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor={theme.colors.text + '80'}
            />
          </View>
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Icon name="send" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messageList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  contactMessage: {
    justifyContent: 'flex-start',
  },
  messageProfilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageBubble: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  plusButton: {
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  sendButton: {
    padding: 10,
  },
});

export default MessagesWindow;
