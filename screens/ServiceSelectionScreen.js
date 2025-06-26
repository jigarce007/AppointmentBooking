import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { services } from "../dummy/services";

export default function ServiceSelectionScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const salon = route.params?.salon;
  const [selectedService, setSelectedService] = useState(null);

  const handleContinue = () => {
    if (selectedService) {
      navigation.navigate("BookWithSalon", {
        salon,
        serviceName: selectedService.name, // 👈 make sure this is set
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pick One</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedService?.name === item.name && styles.selectedItem,
            ]}
            onPress={() => setSelectedService(item)}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name={item.icon}
                size={24}
                color="#fff"
                style={{ marginRight: 10 }}
              />

              <Text style={styles.itemText}>{item.name}</Text>
            </View>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedService && { backgroundColor: "#555" },
        ]}
        onPress={handleContinue}
        disabled={!selectedService}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  header: {
    fontSize: 20,
    fontWeight: "300",
    color: "#fff",
    marginBottom: 5,
  },
  item: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedItem: {
    borderColor: "#FFD700",
    borderWidth: 0.8,
  },
  itemText: { color: "#fff", fontSize: 20, fontWeight: "200" },
  itemPrice: {
    color: "#ccc",
    fontSize: 20,
    color: "#FFD700",
    fontWeight: "200",
  },
  continueButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  continueText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "300",
  },
});
