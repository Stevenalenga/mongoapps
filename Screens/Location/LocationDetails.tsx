import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

// Define TypeScript interfaces
interface SaveFormData {
  name: string;
  description: string;
  context: string;
}

interface Place {
  lat: number;
  lng: number;
}

export default function SaveLocation() {
  const [saveFormData, setSaveFormData] = useState<SaveFormData>({
    name: "",
    description: "",
    context: "",
  });

  const [currentPlace, setCurrentPlace] = useState<Place | null>({
    lat: -1.2921, // Default latitude (Nairobi example)
    lng: 36.8219, // Default longitude
  });

  const handleSaveMarker = async () => {
    if (!saveFormData.name || !currentPlace) {
      Alert.alert("Error", "Please provide a name and ensure location data is loaded.");
      return;
    }

    const dataToSave = {
      name: saveFormData.name,
      latitude: currentPlace.lat,
      longitude: currentPlace.lng,
      description: saveFormData.description,
      context: saveFormData.context,
    };

    try {
      // Replace with your API endpoint or local storage logic
      const response = await fetch("https://your-api-endpoint.com/save-location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        throw new Error("Failed to save the location.");
      }

      Alert.alert("Success", "Location saved successfully!");
    } catch (error) {
      Alert.alert("Error", (error as Error).message || "An unexpected error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Save Location</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={saveFormData.name}
        onChangeText={(text) => setSaveFormData((prev) => ({ ...prev, name: text }))}
        placeholder="Enter location name"
      />

      <Text style={styles.label}>Latitude</Text>
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        value={currentPlace?.lat.toFixed(6) || ""}
        editable={false}
      />

      <Text style={styles.label}>Longitude</Text>
      <TextInput
        style={[styles.input, styles.readOnlyInput]}
        value={currentPlace?.lng.toFixed(6) || ""}
        editable={false}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textarea}
        value={saveFormData.description}
        onChangeText={(text) => setSaveFormData((prev) => ({ ...prev, description: text }))}
        placeholder="Enter location description"
        multiline
      />

      <Text style={styles.label}>Context</Text>
      <TextInput
        style={styles.input}
        value={saveFormData.context}
        onChangeText={(text) => setSaveFormData((prev) => ({ ...prev, context: text }))}
        placeholder="Enter location context"
      />

      <Button title="Save Marker" onPress={handleSaveMarker} />
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  readOnlyInput: {
    backgroundColor: "#e9e9e9",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 80,
    textAlignVertical: "top",
  },
});
