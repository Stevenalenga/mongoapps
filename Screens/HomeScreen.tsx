import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { useTheme } from '../ThemeContext';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleSearch, clearHistory, CustomMarker } from '../components/components';

export default function HomeScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
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
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      position: 'absolute',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      zIndex: 1, // Ensure header stays above map
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 25,
      paddingHorizontal: 15,
      height: 50,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    searchInput: {
      flex: 1,
      color: theme.colors.text,
      marginRight: 10,
      fontSize: 16,
      height: '100%',
    },
    searchIcon: {
      padding: 5,
      marginRight: 5,
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      
      {/* Existing header with search */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={theme.colors.text + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setShowHistory(true)}
            onSubmitEditing={() => handleSearch({ searchQuery, searchHistory, setSearchHistory, setShowHistory })}
          />
          <TouchableOpacity 
            onPress={() => handleSearch({ searchQuery, searchHistory, setSearchHistory, setShowHistory })} 
            style={styles.searchIcon}
          >
            <FontAwesome name="search" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search history dropdown */}
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
                  handleSearch({ searchQuery: item, searchHistory, setSearchHistory, setShowHistory });
                }}
              >
                <Text style={{ color: theme.colors.text, fontSize: 16 }}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={() => clearHistory({ setSearchHistory, setShowHistory })}
          >
            <Text style={{ color: theme.colors.primary, fontSize: 16 }}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
