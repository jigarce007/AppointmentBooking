import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { reviews } from "../dummy/reviews";
import { Ionicons } from "@expo/vector-icons";

export default function AllReviewsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.topRow}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <View style={styles.infoBox}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </View>
              <View style={styles.ratingRow}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Ionicons
                    key={index}
                    name="star"
                    size={16}
                    color={index < item.rating ? "#FFD700" : "#444"}
                  />
                ))}
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  card: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    marginRight: 10,
  },
  infoBox: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  date: {
    color: "#888",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 6,
    color: "#ccc",
    fontSize: 14,
  },
  comment: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 4,
  },
});
