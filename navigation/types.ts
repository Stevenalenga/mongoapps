
// Define the type for Contact
export type Contact = {
    name: string;
    profilePicture: string;
    messagePreview?: string; // Optional field for message preview
  };
  
  // Define the type for the MessagesWindow route params
  export type MessagesWindowRouteParams = {
    contact: Contact; // Assuming you are passing a single contact to the MessagesWindow
  };
  
  // Define the type for navigation routes
  export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    MainTabs: undefined;
    Notifications: undefined;
    MessagesWindow: MessagesWindowRouteParams; // MessagesWindow expects a contact parameter
  };
  
  // Extend the navigation prop with your custom route params
  import { StackScreenProps } from '@react-navigation/stack';
  export type MessagesWindowScreenProps = StackScreenProps<RootStackParamList, 'MessagesWindow'>;
  