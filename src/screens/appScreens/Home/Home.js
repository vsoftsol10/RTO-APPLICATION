import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, SafeAreaView, StatusBar, ScrollView, Modal, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import LinearGradient from 'react-native-linear-gradient';
import Ionic from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';


import colors from "../../../constents/colors";
import { SignOutUser } from "../../../utilities/Utilities";

// Define theme colors
const THEME = {
  primary: "#7A3C6D",     // Rich purple
  secondary: "#E5E5E5",   // Light gray
  white: "#FFFFFF",
  black: "#333333",
  accent: "#BF6BA8",      // Lighter purple for accents
  lightPurple: "rgba(122, 60, 109, 0.1)",
  mediumPurple: "rgba(122, 60, 109, 0.2)",
  darkText: "#444",
  lightText: "#777",
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const buttonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

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

  const togglePopup = () => {
    if (!showPopup) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonPosition({ x: pageX, y: pageY });
      });
    }
    setShowPopup(!showPopup);
  };

  const handleProfilePress = () => {
    setShowPopup(false);
    navigation.navigate("Profile");
  };

  const handleLogoutPress = () => {
    setShowPopup(false);
    SignOutUser();
    navigation.navigate("Onboarding")
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      {/* <LinearGradient
        colors={[
          THEME.primary,
          "#8D4980",  // Slightly lighter purple
          "#9D5691",  // Even lighter purple
          "#AD64A1",  // Transitioning to lighter shade
          THEME.accent,
          THEME.secondary, // End with light gray
        ]}
        style={styles.linearGradient}
      > */}
        <SafeAreaView style={styles.safeArea}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.container}>
              {/* Header Section */}
              <View style={styles.headerContainer}>
                <View style={styles.headerTop}>
                  {loading ? (
                    <ActivityIndicator size="large" color={THEME.white} />
                  ) : (
                    <View style={styles.welcomeContainer}>
                      <Text style={styles.welcomeText}>
                        Hello, <Text style={styles.userName}>{userName}</Text>
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    ref={buttonRef}
                    style={styles.settingButton}
                    activeOpacity={0.8}
                    onPress={togglePopup}
                  >
                    <Ionic name="person" style={styles.iconStyle}/>
                  </TouchableOpacity>
                </View>

                <View style={styles.quoteContainer}>
                  <Text style={styles.quoteText}>
                    Drive Legally - get started.
                  </Text>
                </View>
              </View>

              {/* Content Cards Section */}
              <View style={styles.contentContainer}>
                {/* License Status Card */}
                <View style={styles.card}>
                  <View style={styles.statusIndicator}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusTitle}>License Status</Text>
                  </View>
                  <Text style={styles.statusText}>Pending Approval</Text>
                  <TouchableOpacity
                    style={styles.viewDetailsButton}
                    onPress={() => navigation.navigate("Status")}
                  >
                    <Text style={styles.viewDetailsText}>View Details</Text>
                  </TouchableOpacity>
                </View>

                {/* Main Action Buttons */}
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate("DL")}
                  >
                    {/* <LinearGradient
                      colors={[THEME.primary, THEME.accent]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.buttonGradient}
                    > */}
                      <Text style={styles.buttonText}>Apply for License</Text>
                    {/* </LinearGradient> */}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate("ApplyLicense")}
                  >
                    {/* <LinearGradient
                      colors={[THEME.primary, THEME.accent]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 0 }}
                      style={styles.buttonGradient}
                    > */}
                      <Text style={styles.buttonText}>Apply for Learner</Text>
                    {/* </LinearGradient> */}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate("FindDrivingSchools")}
                  >
                    <Text style={styles.secondaryButtonText}>Find Driving Schools</Text>
                  </TouchableOpacity>

                </View>

                {/* Quick Info Cards - Horizontal Scrollable */}
                <View style={styles.infoCardsWrapper}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.infoCardsScrollContainer}
                  >
                    <TouchableOpacity
                      style={styles.infoCard}
                      activeOpacity={0.9}
                      onPress={() => navigation.navigate("eligibility")}
                    >
                      <View style={styles.infoCardContent}>
                        <View style={styles.infoIconContainer}>
                          <Image
                            source={require("../../../../assets/requirements.png")}
                            style={styles.infoIcon}
                          />
                        </View>
                        <View style={styles.infoTextContainer}>
                          <Text style={styles.infoTitle}>Eligibility</Text>
                          <Text style={styles.infoDescription}>Applicant Criteria</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.infoCard}
                      activeOpacity={0.9}
                      onPress={() => navigation.navigate("doc")}
                    >
                      <View style={styles.infoCardContent}>

                        <View style={styles.infoIconContainer}>
                          <Image
                            source={require("../../../../assets/folders.png")}
                            style={styles.infoIcon}
                          />
                        </View>
                        <View style={styles.infoTextContainer}>

                          <Text style={styles.infoTitle}>Documents</Text>
                          <Text style={styles.infoDescription}>Documents Needed to Apply</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.infoCard}
                      activeOpacity={0.9}
                      onPress={() => navigation.navigate("license")}
                    >
                      <View style={styles.infoCardContent}>

                        <View style={styles.infoIconContainer}>
                          <Image
                            source={require("../../../../assets/drivers-license.png")}
                            style={styles.infoIcon}
                          />
                        </View>
                        <View style={styles.infoTextContainer}>
                          <Text style={styles.infoTitle}>Driving License</Text>
                          <Text style={styles.infoDescription}>Steps to get Driving license</Text>

                        </View>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.infoCard}
                      activeOpacity={0.9}
                      onPress={() => navigation.navigate("Fee")}
                    >
                      <View style={styles.infoCardContent}>
                        <View style={styles.infoIconContainer}>
                          <Image
                            source={require("../../../../assets/payment.png")}
                            style={styles.infoIcon}
                          />
                        </View>
                        <View style={styles.infoTextContainer}>

                          <Text style={styles.infoTitle}>Fees</Text>
                          <Text style={styles.infoDescription}>Fee Details</Text>

                        </View>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                {/*RTO Helps */}
                <View style={styles.rtoCardWrapper}>
                  <TouchableOpacity
                    style={styles.rtoCard}
                    activeOpacity={0.8}
                    >
                    <View style={styles.rtoCardContainer}>
                      <View style={styles.rtoIconContainer}>
                        <Image
                          source={require("../../../images/Home/Setting.png")}
                          style={styles.rtoIcon}
                        />
                      </View>
                     <View style={styles.rtoTextContainer}>
                        <Text style={styles.rtoCardTitle}>Rules of RTO</Text>
                        <Text style={styles.rtoCardSubtitle}>Rules made simple</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.rtoCard}
                    activeOpacity={0.8}
                    onPress={()=>navigation.navigate("symbol")}
                    >
                    <View style={styles.rtoCardContainer}>
                      <View style={styles.rtoIconContainer}>
                        <Image
                          source={require("../../../images/Home/Setting.png")}
                          style={styles.rtoIcon}
                        />
                      </View>
                      <View style={styles.rtoTextContainer}>
                        <Text style={styles.rtoCardTitle}>RTO Symbol</Text>
                        <Text style={styles.rtoCardSubtitle}>Know your road signs</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                  
                {/* Additional Info Card */}
                <TouchableOpacity
                  style={styles.tipsCard}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate("Tips")}
                >
                  <Text style={styles.tipsTitle}>Driving Tips</Text>
                  <Text style={styles.tipsDescription}>
                    Prepare for your driving test with these essential tips and guidelines.
                  </Text>
                  <Text style={styles.tipsReadMore}>Read More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      {/* </LinearGradient> */}

      {/* Settings popup menu */}
      <Modal
        transparent={true}
        visible={showPopup}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.popupMenu,
                {
                  position: 'absolute',
                  top: buttonPosition.y,
                  right: 20,
                }
              ]}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleProfilePress}
              >
                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleLogoutPress}
              >
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  iconStyle:{
    fontSize:16,
    color:colors.white,
    backgroundColor:"#35cad1",
    padding:6,
    borderRadius:50
  }
  ,
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
    backgroundColor:"#35cad1",
    height:260
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
   
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "500",
    color: THEME.white,
  },
  userName: {
    fontWeight: "700",
    color: THEME.white,
  },
  settingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  settingIcon: {
    width: 22,
    height: 22,
    tintColor: THEME.white,
  },
  quoteContainer: {
    backgroundColor: "#dbf3f3",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  quoteText: {
    fontSize: 18,
    color: "#5ed4d9",
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  contentContainer: {
    backgroundColor: "#dbf3f3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    flex: 1,
    marginTop:-70
  },
  card: {
    backgroundColor: "#35cad1",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: "white",
    marginRight: 10,
  },
  
  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  
  statusText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  
  viewDetailsButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "white",
    
  },
  
  viewDetailsText: {
    color: "black",
    fontWeight: "600",
    fontSize: 12,
    textTransform:"uppercase"
  },
  
    actionsContainer: {
    marginBottom: 25,
  },
  
  primaryButton: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    backgroundColor:"#35cad1",
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: THEME.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing:1,
  },
  
  secondaryButton: {
    backgroundColor: THEME.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#35cad1",
    shadowColor: "#35cad1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
 
  secondaryButtonText: {
    color: "#35cad1",
    fontSize: 16,
    fontWeight: "600",
  },
  
  infoCardsWrapper: {
    marginBottom: -45,
    height:"25%"
  },
  
  infoCardsScrollContainer: {
    paddingRight: 20, // Extra padding at the end for better UX
    marginLeft:5,
    marginTop:10
  },
  
  infoCardContent: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  infoCard: {
    backgroundColor: "#dbf3f3",
    borderRadius: 5,
    padding: 16,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    
    // Android shadow (elevation)
    elevation: 9,
    width: 130, // Fixed width for consistent layout
    height: 160,
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  },
  infoIconContainer: {
    backgroundColor: "#dbf3f3",
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIcon: {
    width: "100%",
    height: "100%",
    // tintColor: "#35cad1",
    resizeMode: "contain",
  },
  infoTextContainer: {
    width: '100%',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: THEME.darkText,
    marginBottom: 6,
    textAlign: "center",
  },
  infoDescription: {
    fontSize: 12,
    color: THEME.lightText,
    textAlign: "center",
    lineHeight: 16,
  },
  rtoCardWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 60,
  },
  rtoCard: {
    backgroundColor: THEME.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 10,
    shadowColor: "#35cad1",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 10,
    width: 182,
    height: 170,
    alignItems: "center",
    justifyContent: "center",
  },
  rtoCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  rtoIconContainer: {
    backgroundColor: "#dbf3f3",
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  rtoIcon: {
    width: 40,
    height: 40,
    tintColor: "#35cad1",
    resizeMode: "contain",
  },
  rtoTextContainer: {
    alignItems: 'center',
  },
  rtoCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#35cad1",
    marginTop: 10,
    textAlign: "center",
  },
  rtoCardSubtitle: {
    fontSize: 12,
    color: THEME.lightText,
    textAlign: "center",
  },
  tipsCard: {
    backgroundColor: THEME.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#35cad1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: "#35cad1",
    marginBottom:100,
    marginTop:-25
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#35cad1",
    marginBottom: 8,
  },
  tipsDescription: {
    fontSize: 14,
    color: THEME.darkText,
    lineHeight: 20,
    marginBottom: 12,
  },
  tipsReadMore: {
    fontSize: 14,
    fontWeight: "600",
    color: "#35cad1",
    alignSelf: "flex-end",
  },
  // New styles for popup menu
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  popupMenu: {
    backgroundColor: THEME.white,
    borderRadius: 8,
    width: 120,
    shadowColor: '#35cad1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: "#35cad1",
    fontWeight: "500",
  },
  separator: {
    height: 1,
    backgroundColor: "#d4f3f8",
  },
});

export default HomeScreen;