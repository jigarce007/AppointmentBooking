import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
  Dimensions,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { services } from "../dummy/services";
import { reviews } from "../dummy/reviews";
export default function SalonDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const salon = route.params?.salon;
  const [showAll, setShowAll] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [salon]);

  const handleCall = () => {
    Linking.openURL(`tel:${salon?.phone}`);
  };

  const handleBook = () => {
    navigation.navigate("BookWithSalon", { salon });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${salon?.name} located at ${salon?.location}.`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleSeeAllReviews = () => {
    navigation.navigate("AllReviewsScreen", { salon });
  };

  if (!salon)
    return (
      <Text style={{ color: "#fff", padding: 20 }}>No salon selected</Text>
    );

  const visibleServices = showAll ? services : services.slice(0, 5);
  const visibleReviews = reviews.slice(0, 5);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: salon.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{salon.name}</Text>
          <View style={styles.loc}>
            <Ionicons name="location-outline" size={20} color="#FFD700" />
            <Text style={styles.location}>{salon.location}</Text>
          </View>
          <Text style={styles.description}>
            Welcome to our premium salon experience. Our staff is professionally
            trained to offer top-tier services in a clean and relaxing
            environment.
          </Text>

          <View style={styles.ratingBox}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{salon.rating}</Text>
          </View>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesList}>
            {visibleServices.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name={service.icon}
                    size={24}
                    color="#fff"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={styles.serviceName}>{service.name}</Text>
                </View>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </View>
            ))}
            {services.length > 5 && (
              <TouchableOpacity onPress={() => setShowAll(!showAll)}>
                <Text style={styles.showMore}>
                  {showAll ? "Show Less" : "Show More"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {salon.latitude && salon.longitude && (
            <>
              <Text style={styles.sectionTitle}>Location</Text>
              <View style={styles.mapWrapper}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: salon.latitude,
                    longitude: salon.longitude,
                    latitudeDelta: 0.0005,
                    longitudeDelta: 0.0005,
                  }}
                  region={{
                    latitude: salon.latitude,
                    longitude: salon.longitude,
                    latitudeDelta: 0.0005,
                    longitudeDelta: 0.0005,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                >
                  <Marker
                    coordinate={{
                      latitude: salon.latitude,
                      longitude: salon.longitude,
                    }}
                    title={salon.name}
                    description={salon.location}
                  />
                </MapView>
              </View>
            </>
          )}

          <Text style={styles.sectionTitle}>Reviews</Text>
          {visibleReviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.topRow}>
                <Image source={{ uri: review.image }} style={styles.avatar} />
                <View style={styles.infoBox}>
                  <Text style={styles.clientname}>{review.name}</Text>
                  <Text style={styles.date}>
                    {new Date(review.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                </View>
                <View style={styles.reviewTextContent}>
                  <Text style={styles.reviewName}>{review.user}</Text>
                </View>
                <View style={styles.ratingRow}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={16}
                      color={i < review.rating ? "#FFD700" : "#444"}
                    />
                  ))}
                  <Text style={styles.ratingText}>{review.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          ))}

          <TouchableOpacity onPress={handleSeeAllReviews}>
            <Text style={styles.showMore}>See All Reviews</Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <View style={styles.fixedButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ServiceSelection", { salon })}
        >
          <Ionicons name="calendar-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.callButton]}
          onPress={handleCall}
        >
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Call Salon</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  scrollContent: { paddingBottom: 20 },
  image: { width: "100%", height: 250, resizeMode: "cover" },
  details: { padding: 20 },
  name: { fontSize: 24, fontWeight: "700", color: "#fff" },
  clientname: { fontSize: 14, fontWeight: "500", color: "#fff" },
  location: { fontSize: 15, color: "#ccc", marginTop: 4, fontWeight: "300" },
  description: { fontSize: 14, color: "#aaa", marginTop: 8 },
  loc: {
    flexDirection: "row",
    alignItems: "center", // This ensures vertical centering
    marginTop: 6,
    gap: 6, // or use marginRight on the icon if gap isn't supported
  },
  date: {
    color: "#888",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 1,
  },
  mapWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "#222",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  rating: { marginLeft: 4, color: "#fff", fontWeight: "500" },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
    marginTop: 20,
    marginBottom: 10,
  },
  map: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    round: 10,
  },
  servicesList: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },
  serviceName: { color: "#eee", fontSize: 16, fontWeight: "300" },
  servicePrice: { color: "#FFD700", fontSize: 15, fontWeight: "300" },
  showMore: {
    color: "#1e90ff",
    fontWeight: "500",
    marginTop: 5,
    textAlign: "center",
  },
  reviewItem: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    color: "#FFD700",
    fontWeight: "500",
  },
  fixedButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderTopWidth: 1,
    borderColor: "#222",
    backgroundColor: "#000",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 4,
  },
  callButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
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
    marginRight: 10,
  },
  reviewTextContent: {
    flex: 1,
  },
  reviewName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 6,
    color: "#ccc",
    fontSize: 14,
  },
  reviewText: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 4,
  },
  reviewItem: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
});
