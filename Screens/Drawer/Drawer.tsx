import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated,TouchableOpacity } from 'react-native';
import { useTheme } from '../../ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { LocationDetails } from '../Location/location';
import SaveLocation from '../Location/locationdetails'; 

interface DrawerProps {
  drawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
  selectedLocation: {
    latitude: number;
    longitude: number;
    name?: string;
  } | null;
}

export const Drawer = ({ drawerVisible, setDrawerVisible, selectedLocation }: DrawerProps) => {
  const { theme } = useTheme();
  const drawerHeight = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          drawerHeight.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100) {
          setDrawerVisible(false);
        } else {
          Animated.spring(drawerHeight, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  if (!drawerVisible || !selectedLocation) return null;

  return (
    <Animated.View 
      style={[styles.drawer, { transform: [{ translateY: drawerHeight }] }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.drawerHandle} />
      <TouchableOpacity 
                onPress={() => SaveLocation()} 
                style={{ marginRight: 15 }}
              >
                <Icon 
                  name="add-circle-outline" 
                  size={40} 
                  color={theme.colors.text} 
                />
              </TouchableOpacity>
      <LocationDetails 
        name={selectedLocation.name || 'Unknown Location'} 
        description="Description of the location" 
        comments={[]} // Pass actual comments if available
      />
    </Animated.View>
  );
};



const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    zIndex: 1000,
  },
  drawerHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
