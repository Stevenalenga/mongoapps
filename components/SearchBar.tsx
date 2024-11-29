import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { handleSearch, handleInputFocus, handleLocationSelect } from '../Components/CustomMarker';
import { useTheme } from '../ThemeContext';
import MapView from 'react-native-maps'; // Add this import

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchHistory: string[];
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
  mapRef: React.RefObject<MapView>;
  setSelectedLocation: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
    name?: string;
  } | null>>;
  styles: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  searchHistory,
  setSearchHistory,
  setShowHistory,
  mapRef,
  setSelectedLocation,
  styles
}) => {
  const { theme } = useTheme();

  return (
    <GooglePlacesAutocomplete
      placeholder="Search location..."
      onPress={(data, details) => {
        handleLocationSelect(data, details, setSelectedLocation, mapRef);
      }}
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
        placeholderTextColor: theme.colors.text + '80',
        onChangeText: (text) => {
          setSearchQuery(text);
        },
        onFocus: async () => {
          try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&key=${process.env.GOOGLE_PLACES_API_KEY}`);
            if (!response.ok) {
              throw new Error('API is offline');
            }
          } catch (error) {
            handleInputFocus({ setSearchHistory, setShowHistory });
          }
        },
      }}
      enablePoweredByContainer={false}
      fetchDetails={true}
    />
  );
};

export default SearchBar;