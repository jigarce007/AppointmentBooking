import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileBox}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/68.jpg" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Emily Carter</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.row}>
            <Ionicons name="mail-outline" size={20} color="#FFD700" />
            <View style={styles.textGroup}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>emily.carter@example.com</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Ionicons name="call-outline" size={20} color="#28a745" />
            <View style={styles.textGroup}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>+1 555-123-7890</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={20} color="#1e90ff" />
            <View style={styles.textGroup}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>New York, NY</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  profileBox: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  role: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: "#303030",
    borderRadius: 16,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  textGroup: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
});
