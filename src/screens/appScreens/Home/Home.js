import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import LinearGradient from 'react-native-linear-gradient';
import colors from "../../../constents/colors";



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
    <LinearGradient
        colors={[
          colors.bgLineGradeOne,
          colors.bgLineGradeTwo,
          colors.bgLineGradeThree,
          colors.bgLineGradeFour,
          colors.bgLineGradeFive,
          colors.bgLineGradeSix,
        ]}
        style={styles.linearGradient}
      >
    <View style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.header}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Text style={styles.welcomeText}>Hello, {userName}!  </Text>
      )}
      <View >
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={require("../../../images/Home/Setting.png")}style={styles.settingIcon}/>
        </TouchableOpacity>

      </View>
      </View>
      

      {/* License Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Your License Status</Text>
        <Text style={styles.statusText}>Pending Approval</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Status")}>
          <Text style={styles.viewDetails}>View Details</Text>
        </TouchableOpacity>
      </View>

      {/*Apply for License */}
      <View style={styles.licenseCard}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ApplyLicense")}>
          <Text style={styles.buttonText}>Apply for License</Text>
        </TouchableOpacity>
      </View>


      {/* Quick Actions */}
      <View style={styles.quickActions}>
        

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FindDrivingSchools")}>
          <Text style={styles.buttonText}>Find Driving Schools</Text>
        </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16
},
header:{
  flex:1,
  flexDirection:"row",
  justifyContent:"space-between"
},
settingIcon:{
  width: 20, // Adjust image width
  height: 20, 
  marginTop:8,
  marginRight:8
},
  
  welcomeText: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 
  },
  statusCard: { 
    padding: 20, 
    backgroundColor: "#e6ceed", 
    borderRadius: 10, 
    marginBottom: 20 
  },
  statusTitle: { 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  statusText: { 
    fontSize: 16, 
    color: "blue" 
  },
  viewDetails: { 
    color: "red", 
    marginTop: 5 
  },
  licenseCard:{
    backgroundColor:colors.white,
    padding:16
  },
  // quickActions: { flexDirection: "row", justifyContent: "space-between" },
  // button: { backgroundColor: "blue", padding: 15, borderRadius: 8, width: "48%" },
  // buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});

export default HomeScreen;
