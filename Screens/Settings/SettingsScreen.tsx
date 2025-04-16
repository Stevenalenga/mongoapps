import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../../ThemeContext"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"

import ProfileSettings from "./ProfileSettings"
import TermsOfService from "./TermsofService"
import PrivacyPolicy from "./PrivacyPolicy"
import LocationSettings from "./LocationSettings"

type RootStackParamList = {
  Login: undefined
  ProfileSettings: undefined
  LocationSettings: undefined
  TermsOfService: undefined
  PrivacyPolicy: undefined
  // ... other screen names
}

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList>

interface SettingItemProps {
  icon: string
  title: string
  description: string
  isSwitch?: boolean
  value?: boolean
  onValueChange?: (value: boolean) => void
  onPress?: () => void
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  description,
  isSwitch,
  value,
  onValueChange,
  onPress,
}) => {
  const { theme } = useTheme()
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.settingItem}
      accessibilityLabel={`${title} setting`}
      accessibilityHint={description}
    >
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.settingText}>
        <Text style={[styles.settingTitle, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.settingDescription, { color: theme.colors.text }]}>{description}</Text>
      </View>
      {isSwitch && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#767577", true: theme.colors.primary }}
          thumbColor={value ? theme.colors.primary : "#f4f3f4"}
        />
      )}
      {!isSwitch && <Ionicons name="chevron-forward" size={24} color={theme.colors.text} />}
    </TouchableOpacity>
  )
}

const SettingsScreen: React.FC = () => {
  const { theme, themeType, setThemeType } = useTheme()
  const navigation = useNavigation<SettingsScreenNavigationProp>()
  const [notifications, setNotifications] = useState(true)
  const [locationServices, setLocationServices] = useState(true)

  const toggleTheme = () => {
    switch (themeType) {
      case "light":
        setThemeType("dark")
        break
      case "dark":
        setThemeType("lightBlueDark")
        break
      case "lightBlueDark":
        setThemeType("light")
        break
      default:
        console.error("Unknown theme type:", themeType)
        setThemeType("light")
    }
  }

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => navigation.navigate("Login"),
      },
    ])
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Account</Text>
        <SettingItem
          icon="person-outline"
          title="Profile"
          description="Manage your account information"
          onPress={() => navigation.navigate("ProfileSettings")}
        />
        <SettingItem
          icon="lock-closed-outline"
          title="Security"
          description="Manage your password and security settings"
          onPress={() => console.log("Navigate to Security")}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Preferences</Text>
        <SettingItem
          icon="notifications-outline"
          title="Notifications"
          description="Manage your notification settings"
          isSwitch
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingItem
          icon="moon-outline"
          title="Dark Mode"
          description="Toggle dark mode on or off"
          isSwitch
          value={themeType !== "light"}
          onValueChange={toggleTheme}
        />
        <SettingItem
          icon="location-outline"
          title="Location Services"
          description="Manage location access for the app"
          isSwitch
          value={locationServices}
          onValueChange={setLocationServices}
          onPress={() => navigation.navigate("LocationSettings")}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Support</Text>
        <SettingItem
          icon="help-circle-outline"
          title="Help Center"
          description="Get help and contact support"
          onPress={() => console.log("Navigate to Help Center")}
        />
        <SettingItem
          icon="document-text-outline"
          title="Terms of Service"
          description="Read our terms of service"
          onPress={() => navigation.navigate("TermsOfService")}
        />
        <SettingItem
          icon="shield-checkmark-outline"
          title="Privacy Policy"
          description="Read our privacy policy"
          onPress={() => navigation.navigate("PrivacyPolicy")}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  section: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  settingIcon: {
    width: 30,
    alignItems: "center",
    marginRight: 10,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
})

export default SettingsScreen

