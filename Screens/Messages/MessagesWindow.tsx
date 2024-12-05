import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { Contact } from "../../navigation/types";
import Header from "../../Components/Header/Header";
import { useTheme } from "../../ThemeContext";
import TypingIndicator from "../../Components/TypingIndicator";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const MessagesWindow: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const contact = (route.params as { contact: Contact })?.contact;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { theme } = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [inputHeight, setInputHeight] = useState(40);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }, [])
  );

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: "This is an auto-response.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, response]);
      }, 2000);
    }
  };

  const renderMessageItem = ({ item }: { item: Message }) => (
    <Animated.View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.contactMessage,
        { opacity: fadeAnim },
      ]}
    >
      {!item.isUser && (
        <Image
          source={{ uri: contact.profilePicture }}
          style={styles.messageProfilePic}
        />
      )}
      <View
        style={[
          styles.messageBubble,
          { backgroundColor: item.isUser ? theme.colors.primary : theme.colors.card },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: item.isUser ? "white" : theme.colors.text },
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            { color: item.isUser ? "rgba(255,255,255,0.7)" : theme.colors.text + "80" },
          ]}
        >
          {item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>

        <Header
          username={contact?.name || "Unknown"}
          profileImageUrl={contact?.profilePicture}
          showBackButton={true}
          onLeftPress={() => navigation.goBack()}
          isOnline={true}
          onRightPress={() => console.log("Menu button pressed")}
        />
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={[
            styles.messageList,
            { paddingBottom: inputHeight + 20 },
          ]}
        />
        {isTyping && <TypingIndicator />}
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.plusButton}>
              <FontAwesome name="plus-circle" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { color: theme.colors.text, height: inputHeight }]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor={theme.colors.text + "80"}
              multiline
              onContentSizeChange={(event) =>
                setInputHeight(Math.min(100, Math.max(40, event.nativeEvent.contentSize.height)))
              }
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
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userMessage: {
    justifyContent: "flex-end",
  },
  contactMessage: {
    justifyContent: "flex-start",
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
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  plusButton: {
    padding: 5,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 10,
  },
  sendButton: {
    padding: 10,
  },
});

export default MessagesWindow;
