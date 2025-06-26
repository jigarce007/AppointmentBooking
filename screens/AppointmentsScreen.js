import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const json = await AsyncStorage.getItem("appointments");
        const parsed = json ? JSON.parse(json) : [];
        setAppointments(parsed);
      } catch (e) {
        console.error("Failed to load appointments", e);
      }
    };

    if (isFocused) loadAppointments();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.salon}>{item.salonName}</Text>
        <Text style={styles.time}>
          {item.date} at {item.time}
        </Text>
      </View>
      <Ionicons name="checkmark-circle-outline" size={24} color="#4cd137" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Appointments</Text>

      {appointments.length === 0 ? (
        <Text style={styles.noData}>No appointments booked yet.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => navigation.navigate("SearchSalons")}
      >
        <Ionicons name="calendar-outline" size={20} color="#fff" />
        <Text style={styles.bookBtnText}>Book New Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 20 },
  noData: { color: "#ccc", fontSize: 16, textAlign: "center", marginTop: 20 },
  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  salon: { fontSize: 16, fontWeight: "600", color: "#fff" },
  time: { fontSize: 14, color: "#ccc", marginTop: 4 },

  bookBtn: {
    backgroundColor: "#1e90ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    marginTop: "auto",
  },
  bookBtnText: { color: "#fff", fontSize: 16, marginLeft: 8 },
});
