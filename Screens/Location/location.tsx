import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  date: string;
}

interface LocationDetailsProps {
  name: string;
  description: string;
  comments: Comment[];
}

export function LocationDetails({ name, description, comments }: LocationDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.separator} />
      <Text style={styles.commentsHeader}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.userName}>{item.user}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
        style={styles.scrollArea}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    borderLeftWidth: 1,
    borderColor: "#ccc",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  scrollArea: {
    flexGrow: 0,
  },
  commentContainer: {
    marginBottom: 16,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  commentText: {
    fontSize: 14,
  },
});
