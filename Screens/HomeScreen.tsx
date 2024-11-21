import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../ThemeContext';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleSearch, clearHistory, CustomMarker, handleLocationSelect } from '../components/components';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Drawer } from './Drawer/Drawer';

export default function HomeScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const mapRef = useRef<MapView>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    name?: string;
  } | null>(null);

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('searchHistory');
        if (savedHistory) {
          setSearchHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error('Failed to load search history', error);
      }
    };
    loadSearchHistory();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      mapRef.current?.animateToRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  }, [selectedLocation]);

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
      position: 'absolute',
      top: 50,
      left: 15,
      right: 15,
      zIndex: 1,
    },
    searchContainer: {
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
      height: 50,
      color: theme.colors.text,
      fontSize: 16,
      borderRadius: 25,
    },
    searchIcon: {
      padding: 5,
      marginRight: 5,
      position: 'absolute',
      right: 10,
      zIndex: 1,
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
    addButton: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      padding: 15,
      zIndex: 1000,
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude
            }}
            title={selectedLocation.name}
            anchor={{ x: 0.5, y: 1 }} 
          >
            
          </Marker>
        )}
      </MapView>
      
      <View style={styles.header}>
        <GooglePlacesAutocomplete
          placeholder="Search location..."
          onPress={(data, details) => handleLocationSelect(data, details, setSelectedLocation, mapRef)}
          renderRightButton={() => (
            <TouchableOpacity 
              onPress={() => handleSearch({ searchQuery, searchHistory, setSearchHistory, setShowHistory })} 
              style={styles.searchIcon}
            >
              <FontAwesome name="search" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
          query={{
            key: process.env.GOOGLE_PLACES_API_KEY,
            language: 'en',
          }}
          styles={{
            container: {
              flex: 1,
            },
            textInput: {
              ...styles.searchInput,
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
            },
            textInputContainer: {
              backgroundColor: 'transparent',
            },
            listView: {
              backgroundColor: theme.colors.card,
              borderRadius: 10,
              marginTop: 5,
            },
            row: {
              backgroundColor: theme.colors.card,
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            description: {
              color: theme.colors.text,
            },
          }}
          textInputProps={{
            placeholderTextColor: theme.colors.text + '80', // Sets placeholder color with slight opacity if desired
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
        />
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

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => setDrawerVisible(true)}
      >
        <Ionicons name="add-circle" size={40} color={theme.colors.text} />
      </TouchableOpacity>

      <Drawer 
        drawerVisible={drawerVisible} 
        setDrawerVisible={setDrawerVisible} 
        selectedLocation={selectedLocation} 
      />
    </View>
  );
}
