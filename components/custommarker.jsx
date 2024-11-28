import { View, Image } from 'react-native';
import { useTheme } from '../ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const CustomMarker = () => {
  const { theme } = useTheme();

  return (
    <View style={{ 
      width: 40, 
      height: 60, 
      backgroundColor: theme.colors.primary, 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderWidth: 2, 
      borderColor: theme.colors.background, 
      borderTopLeftRadius: 20, 
      borderTopRightRadius: 20, 
      borderBottomLeftRadius: 20, 
      borderBottomRightRadius: 0, 
      transform: [{ rotate: '45deg' }],
      position: 'relative', // Change to relative positioning
      bottom: 0, // Align the bottom of the marker to the location point
      zIndex: 1000 // Ensure it appears above other map elements
    }}>
      <View style={{
        width: 20, 
        height: 20, 
        backgroundColor: theme.colors.primary, 
        borderRadius: 10, 
        transform: [{ rotate: '-45deg' }]
      }} />
    </View>
  );
}

export const handleSearch = async ({ searchQuery, searchHistory, setSearchHistory, setShowHistory }) => {
  if (!searchQuery.trim()) return;
  
  try {
    // Add the new search to history without duplicates
    const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)];
    
    // Limit history to last 10 items
    const limitedHistory = newHistory.slice(0, 5);
    
    // Save to AsyncStorage
    await AsyncStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
    
    // Update state
    setSearchHistory(limitedHistory);
    setShowHistory(false);
    
    // TODO: Implement your actual search logic here
    
  } catch (error) {
    console.error('Failed to save search history', error);
  }
};

export const clearHistory = async ({ setSearchHistory, setShowHistory }) => {
  if (!setSearchHistory || !setShowHistory) {
    console.error('Required parameters are missing');
    return;
  }

  try {
    await AsyncStorage.removeItem('searchHistory');
    setSearchHistory([]);
    setShowHistory(false);
  } catch (error) {
    console.error('Failed to clear search history', error);
  }
};


export const handleInputFocus = async ({ setSearchHistory, setShowHistory } ) => {
  try {
    const savedHistory = await AsyncStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    setShowHistory(true);
  } catch (error) {
    console.error('Failed to load search history', error);
  }
};



export const handleLocationSelect = (data, details, setSelectedLocation, mapRef) => {
  const { geometry, name } = details;
  const location = {
    latitude: geometry.location.lat,
    longitude: geometry.location.lng,
    name: name || data.description
  };
  
  setSelectedLocation(location);
  
  // Animate map to new location
  mapRef.current?.animateToRegion({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }, 1000)
}