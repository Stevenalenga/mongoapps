import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../ThemeContext';

export default function ProfileSettings() {
    const { theme } = useTheme();
    const [username, setUsername] = useState('james_doe');
    const [privacy, setPrivacy] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [email, setEmail] = useState('james_doe@example.com');
    const [password, setPassword] = useState('');

    const handleSave = () => {
        // Save settings logic here
        console.log('Settings saved');
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: 20,
        },
        section: {
            marginBottom: 20,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 10,
        },
        input: {
            backgroundColor: theme.colors.card,
            padding: 10,
            borderRadius: 10,
            color: theme.colors.text,
        },
        switchContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        },
        switchLabel: {
            fontSize: 16,
            color: theme.colors.text,
        },
        saveButton: {
            backgroundColor: theme.colors.primary,
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
        },
        saveButtonText: {
            color: theme.colors.background,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Privacy</Text>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Private Account</Text>
                    <Switch
                        value={privacy}
                        onValueChange={setPrivacy}
                        trackColor={{ false: theme.colors.card, true: theme.colors.primary }}
                        thumbColor={privacy ? theme.colors.primary : theme.colors.text}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Enable Notifications</Text>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: theme.colors.card, true: theme.colors.primary }}
                        thumbColor={notifications ? theme.colors.primary : theme.colors.text}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personalization</Text>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Dark Mode</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: theme.colors.card, true: theme.colors.primary }}
                        thumbColor={darkMode ? theme.colors.primary : theme.colors.text}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Settings</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
