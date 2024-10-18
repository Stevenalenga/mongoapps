import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../ThemeContext';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const { theme } = useTheme();
 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const updatedHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 5);
      setSearchHistory(updatedHistory);
      setShowHistory(false);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      // Perform search operation here
      console.log('Searching for:', searchQuery);
      // Clear the search input
      setSearchQuery('');
    }
  };

  const clearHistory = async () => {
    setSearchHistory([]);
    setShowHistory(false);
    await AsyncStorage.removeItem('searchHistory');
  };

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Failed to load search history', error);
      }
    };
    loadSearchHistory();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 25,
      paddingHorizontal: 15,
      height: 50,
    },
    searchInput: {
      flex: 1,
      color: theme.colors.text,
      marginRight: 10,
      fontSize: 16,
    },
    searchIcon: {
      padding: 5,
    },
    historyContainer: {
      position: 'absolute',
      top: 80,
      left: 15,
      right: 15,
      backgroundColor: theme.colors.card,
      borderRadius: 15,
      elevation: 5,
      zIndex: 1000,
    },
    historyItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    clearButton: {
      padding: 15,
      alignItems: 'center',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={theme.colors.text + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setShowHistory(true)}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
            <FontAwesome name="search" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      {showHistory && searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <FlatList
            data={searchHistory}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.historyItem}
                onPress={() => {
                  setSearchQuery(item);
                  setShowHistory(false);
                  handleSearch();
                }}
              >
                <Text style={{ color: theme.colors.text, fontSize: 16 }}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
            <Text style={{ color: theme.colors.primary, fontSize: 16 }}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.content}>
        <Text style={{ color: theme.colors.text, fontSize: 24 }}>Home Screen</Text>
        <Text style={{ color: theme.colors.text }}>Welcome to your personalized home!</Text>
      </View>
    </View>
  );
}
