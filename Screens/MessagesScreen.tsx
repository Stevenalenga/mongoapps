import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useTheme } from '../ThemeContext';
import MessageBox from './Messages/MessagesBox';
import { Contact } from '../navigation/types';

// Sample data for the list of messages
const messagesList: Contact[] = [
  { name: 'John Doe', profilePicture: 'https://picsum.photos/200', messagePreview: 'Hey, how are you?' },
  { name: 'Jane Smith', profilePicture: 'https://picsum.photos/200', messagePreview: 'Are we still on for lunch?' },
  // Add more contacts as needed
];

export default function MessagesScreen() {
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: Contact }) => (
    <MessageBox contact={item} />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.colors.text }]}>No messages available.</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={messagesList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={renderEmptyComponent}
        initialNumToRender={10}
        windowSize={5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
