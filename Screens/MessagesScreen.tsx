import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import MessageBox from './Messages/MessagesBox';
import { Contact } from '../navigation/types';
import { FontAwesome } from '@expo/vector-icons';

// Sample data for the list of messages
const messagesList: Contact[] = [
  { name: 'John Doe', profilePicture: 'https://picsum.photos/200', messagePreview: 'Hey, how are you?' },
  { name: 'Jane Smith', profilePicture: 'https://picsum.photos/200', messagePreview: 'Are we still on for lunch?' },
  // Add more contacts as needed
];

export default function MessagesScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

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
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search messages..."
          placeholderTextColor={theme.colors.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={() => {/* Handle search */}}>
          <FontAwesome name="search" size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchIcon: {
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
