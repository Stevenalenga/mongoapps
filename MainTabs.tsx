import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SettingsScreen from './Screens/SettingsScreen';
import MessagesScreen from './Screens/MessagesScreen';
import { useTheme } from './ThemeContext';


const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'My Maps') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          return    <Icon name={iconName || 'default-icon-name'} size={24} color={theme.colors.text} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: { backgroundColor: theme.colors.background },
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
      })}
    >
      <Tab.Screen 
        name="My Maps" 
        component={HomeScreen} 
        options={{
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Notifications' as never)}
                style={{ marginRight: 15 }}
              >
                <Icon 
                  name="notifications-outline" 
                  size={24} 
                  color={theme.colors.text} 
                />
              </TouchableOpacity>
            
            </View>
          ),
        }}
      />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
