import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../ThemeContext';
import {  Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleSearch, clearHistory } from '../Components/CustomMarker';
import { Drawer } from './Drawer/Drawer';
import createStyles from '../Styles/HomeScreenStyles';
import SearchBar from '../Components/SearchBar';

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
  const styles = createStyles();

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
    const loadSelectedLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem('selectedLocation');
        if (savedLocation) {
          const location = JSON.parse(savedLocation);
          setSelectedLocation(location);
          mapRef.current?.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }, 1000);
        }
      } catch (error) {
        console.error('Failed to load selected location', error);
      }
    };
    loadSelectedLocation();
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

  useEffect(() => {
    const saveSelectedLocation = async () => {
      try {
        if (selectedLocation) {
          await AsyncStorage.setItem('selectedLocation', JSON.stringify(selectedLocation));
        }
      } catch (error) {
        console.error('Failed to save selected location', error);
      }
    };
    saveSelectedLocation();
  }, [selectedLocation]);

  
  return (
    <View style={styles.container}>
      {selectedLocation && (
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
            />
          )}
        </MapView>
      )}
      
      <View style={styles.header}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
          setShowHistory={setShowHistory}
          mapRef={mapRef}
          setSelectedLocation={setSelectedLocation}
          styles={styles}
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
