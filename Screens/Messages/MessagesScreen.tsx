import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Text, RefreshControl } from 'react-native';
import { useTheme } from '../ThemeContext';
import MessageBox from '../Screens/Messages/MessagesBox';
import { Contact } from '../navigation/types';
import { FontAwesome } from '@expo/vector-icons';

// Sample data for the list of messages
const messagesList: Contact[] = [
  { name: 'John Doe', profilePicture: 'https://picsum.photos/200', messagePreview: 'Hey, how are you?' },
  { name: 'Jane Smith', profilePicture: 'https://picsum.photos/201', messagePreview: 'Are we still on for lunch?' },
  { name: 'Alice Johnson', profilePicture: 'https://picsum.photos/203', messagePreview: 'I have sent you the files you requested.' },
  { name: 'Bob Williams', profilePicture: 'https://picsum.photos/202', messagePreview: 'Can we reschedule our meeting?' },
  { name: 'Emma Brown', profilePicture: 'https://picsum.photos/204', messagePreview: 'Thanks for your help yesterday!' },
];

export default function MessagesScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const filteredMessages = useMemo(() => 
    messagesList.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.messagePreview?.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  const renderItem = useCallback(({ item }: { item: Contact }) => (
    <MessageBox contact={item} />
  ), []);

  const renderEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <FontAwesome name="comments-o" size={50} color={theme.colors.text} style={styles.emptyIcon} />
      <Text style={[styles.emptyText, { color: theme.colors.text }]}>
        {searchQuery ? 'No matching messages found.' : 'No messages available.'}
      </Text>
    </View>
  ), [theme.colors.text, searchQuery]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulating a data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color={theme.colors.text} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search messages..."
          placeholderTextColor={theme.colors.text + '80'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <FontAwesome name="times-circle" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={renderEmptyComponent}
        initialNumToRender={10}
        windowSize={5}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

