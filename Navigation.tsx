import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Login from './Login';
import SignUp from './SignUp';
import MainTabs from './MainTabs';
import NotificationsScreen from './Screens/NotificationsScreen';
import MessagesWindow from './Screens/Messages/MessagesWindow';
import Header from './Screens/Header/Header';
import { RootStackParamList } from './navigation/types';

// Define the stack navigator with type RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen 
        name="MessagesWindow" 
        component={MessagesWindow}  
        options={({ route }: { route: RouteProp<RootStackParamList, 'MessagesWindow'> }) => ({
          header: () => {
            const contact = route.params?.contact;  // Optional chaining for safety
            return (
              <Header 
              username={contact.name}
              profileImageUrl={contact.profilePicture}
              showBackButton={true}
            />
            );
          }
        })}
      />
    </Stack.Navigator>
  );
}
