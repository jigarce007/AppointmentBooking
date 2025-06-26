import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import fallbackImage from "../assets/barber-icon.png";

export default function ProductCard({ item }) {
  const [imageUri, setImageUri] = useState({ uri: item.image });

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <Image
        source={imageUri}
        style={styles.image}
        onError={() => setImageUri(fallbackImage)}
      />
      <View style={styles.overlay}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 200,
    backgroundColor: "#eee",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  price: {
    fontSize: 13,
    color: "#eee",
    marginTop: 2,
  },
});
