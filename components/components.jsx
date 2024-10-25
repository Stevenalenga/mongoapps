import { View, Image } from 'react-native';
import { useTheme } from '../ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const CustomMarker = () => {
  const { theme } = useTheme();

  return (
    <View style={{ width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: theme.colors.primary, 
    justifyContent: 'center', alignItems: 'center', 
    borderWidth: 2, 
    borderColor: theme.colors.background }}>
      <Image source={{ uri: 'https://picsum.photos/50' }} 
      style={{ width: 50,
       height: 50, 
       borderRadius: 25 }} />
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