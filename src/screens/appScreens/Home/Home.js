import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Ionic from "react-native-vector-icons"

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
          console.log("No authenticated user found");
          return;
        }

        // Fetch user data from Firestore
        const userDoc = await firestore().collection("users").doc(currentUser.uid).get();

        if (userDoc.exists) {
          setUserName(userDoc.data().name); // Set user name
        } else {
          console.log("No user data found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  return (
    <View style={styles.container}>
      {/* Welcome Section */}
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Text style={styles.welcomeText}>Hello, {userName}! </Text>
      )}

      {/* License Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Your License Status</Text>
        <Text style={styles.statusText}>Pending Approval</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Status")}>
          <Text style={styles.viewDetails}>View Details</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ApplyLicense")}>
          <Text style={styles.buttonText}>Apply for License</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FindDrivingSchools")}>
          <Text style={styles.buttonText}>Find Driving Schools</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  welcomeText: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  statusCard: { padding: 20, backgroundColor: "#fff", borderRadius: 10, marginBottom: 20 },
  statusTitle: { fontSize: 18, fontWeight: "bold" },
  statusText: { fontSize: 16, color: "blue" },
  viewDetails: { color: "red", marginTop: 5 },
  quickActions: { flexDirection: "row", justifyContent: "space-between" },
  button: { backgroundColor: "blue", padding: 15, borderRadius: 8, width: "48%" },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});

export default HomeScreen;
