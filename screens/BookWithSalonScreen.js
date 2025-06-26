import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

export default function BookWithSalonScreen({ route, navigation }) {
  const { salon, serviceName } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert("Missing info", "Please select both date and time.");
      return;
    }

    const newAppointment = {
      salonName: salon.name,
      salonId: salon.id,
      salonImage: salon.image,
      location: salon.location,
      phone: salon.phone,
      serviceName: serviceName || "", // 👈 added this line
      date: selectedDate,
      time: selectedTime,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem("appointments");
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(newAppointment);

      await AsyncStorage.setItem("appointments", JSON.stringify(parsed));

      Alert.alert(
        "Appointment Confirmed",
        `You have booked at ${salon.name} on ${selectedDate} at ${selectedTime}`,
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("MyAppointments", {
                screen: "MyAppointmentsMain",
              }),
          },
        ]
      );
    } catch (e) {
      console.error("Failed to save appointment:", e);
      Alert.alert(
        "Error",
        "Could not save your appointment. Please try again."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Book at {salon.name}</Text>

      <Text style={styles.section}>Choose a Date</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "#000",
          },
        }}
        theme={{
          backgroundColor: "#fff",
          calendarBackground: "#fff",
          textSectionTitleColor: "#000",
          selectedDayBackgroundColor: "#000",
          selectedDayTextColor: "#fff",
          todayTextColor: "#000",
          arrowColor: "#000",
        }}
        style={styles.calendar}
      />

      <Text style={styles.section}>Choose a Time Slot</Text>
      <View style={styles.slots}>
        {TIME_SLOTS.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[styles.slot, selectedTime === slot && styles.slotSelected]}
            onPress={() => setSelectedTime(slot)}
          >
            <Text
              style={[
                styles.slotText,
                selectedTime === slot && styles.slotTextSelected,
              ]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000",
  },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#000",
  },
  calendar: {
    borderRadius: 10,
    overflow: "hidden",
  },
  slots: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  slot: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  slotSelected: {
    backgroundColor: "#000",
  },
  slotText: {
    color: "#000",
    fontWeight: "500",
  },
  slotTextSelected: {
    color: "#fff",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
