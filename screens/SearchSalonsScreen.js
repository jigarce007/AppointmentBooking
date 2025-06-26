import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { salons } from "../dummy/salons";
import fallbackImage from "../assets/saloon.jpg"; // ensure salon.png is in assets folder

export default function SearchSalonsScreen() {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  const filtered = salons.filter((salon) =>
    salon.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search salons..."
        placeholderTextColor="#aaa"
        style={styles.searchInput}
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("SalonDetails", {
                salon: item,
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              defaultSource={fallbackImage}
              style={styles.image}
              onError={(e) => (e.target.src = fallbackImage)}
            />
            <View style={styles.overlay}>
              <Text style={styles.salonName}>{item.name}</Text>
              <View style={styles.infoRow}>
                
                <View style={styles.badge}>
                  <Ionicons name="location-outline" size={14} color="#fff" />
                  <Text style={styles.badgeText}>{item.location}</Text>
                </View>
                <View style={styles.badge}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.badgeText}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  searchInput: {
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 12,
    fontSize: 14,
    color: "#fff",
    marginBottom: 20,
  },
  card: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 12,
    position: "relative",
    backgroundColor: "#1a1a1a",
  },
  image: {
    width: "100%",
    height: 200,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  salonName: {
    fontSize: 22,
    fontWeight: "300",
    color: "#fff",
    marginBottom: 2,
  },
  name: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 13,
  },
});
