
import React from "react";
import { View, Text,  FlatList, Image } from "react-native";
import createStyles from '../ScreenStyles/LocationStyles';

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
  const styles = createStyles();
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

