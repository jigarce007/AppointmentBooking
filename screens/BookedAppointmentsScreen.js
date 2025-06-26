import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function BookedAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const stored = await AsyncStorage.getItem("appointments");
        const parsed = stored ? JSON.parse(stored) : [];
        setAppointments(parsed.reverse());
      } catch (e) {
        console.error("Error loading appointments:", e);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!appointments.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No appointments booked yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={appointments}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.salonImage }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{item.salonName}</Text>

            {item.serviceName && (
              <View style={styles.row}>
                <Ionicons name="cut-outline" size={16} color="#aaa" />
                <Text style={styles.info}>{item.serviceName}</Text>
              </View>
            )}

            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color="#aaa" />
              <Text style={styles.info}>{item.location}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="calendar-outline" size={16} color="#aaa" />
              <Text style={styles.info}>{item.date}</Text>
            </View>

            <View style={styles.row}>
              <Ionicons name="time-outline" size={16} color="#aaa" />
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#303030",
    fontSize: 16,
    fontWeight: "500",
  },
  list: {
    padding: 10,
    backgroundColor: "#000",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#303030",
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
    height: 100,
  },
  image: {
    width: 120,
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: "#222",
    marginRight: 5,
  },
  details: {
    flex: 1,
    marginLeft: 2,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  info: {
    color: "#ccc",
    marginLeft: 6,
    fontSize: 12,
    fontStyle: "normal",
  },
  time: {
    color: "#FFD700",
    marginLeft: 6,
    fontSize: 14,
    fontStyle: "italic",
  },
});
