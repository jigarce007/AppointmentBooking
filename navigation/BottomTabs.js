import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchSalonsScreen from "../screens/SearchSalonsScreen";
import SalonDetailsScreen from "../screens/SalonDetailsScreen";
import BookWithSalonScreen from "../screens/BookWithSalonScreen";
import ShopScreen from "../screens/ShopScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BookedAppointmentsScreen from "../screens/BookedAppointmentsScreen";
import AllReviewsScreen from "../screens/AllReviewsScreen";
import ServiceSelectionScreen from "../screens/ServiceSelectionScreen";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 🧩 Appointments Flow: Search → Details → Book
function AppointmentsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="SearchSalons"
        component={SearchSalonsScreen}
        options={{ title: "Book Appointment" }}
      />
      <Stack.Screen
        name="SalonDetails"
        component={SalonDetailsScreen}
        options={({ route }) => ({
          title: route.params?.salon?.name ?? "Details",
        })}
      />
      <Stack.Screen
        name="ServiceSelection"
        component={ServiceSelectionScreen}
        options={{
          title: "Select Service",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#000" },
        }}
      />

      <Stack.Screen
        name="BookWithSalon"
        component={BookWithSalonScreen}
        options={{
          title: "Book Appointment",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#000" },
        }}
      />
      <Stack.Screen
        name="AllReviewsScreen"
        component={AllReviewsScreen}
        options={{ title: "All Reviews" }}
      />
    </Stack.Navigator>
  );
}

// 📋 View My Booked Appointments
function MyAppointmentsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="MyAppointmentsMain"
        component={BookedAppointmentsScreen}
        options={{ title: "My Appointments" }}
      />
    </Stack.Navigator>
  );
}

// 🛒 Shop Tab
function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="ShopMain"
        component={ShopScreen}
        options={{ title: "Shop" }}
      />
    </Stack.Navigator>
  );
}

// 👤 Profile Tab
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tab.Screen
        name="Appointments"
        component={AppointmentsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="MyAppointments"
        component={MyAppointmentsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
