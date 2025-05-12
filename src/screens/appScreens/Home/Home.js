import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, SafeAreaView, StatusBar, ScrollView, Modal, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Ionic from 'react-native-vector-icons/Ionicons';

import colors from "../../../constents/colors";
import { SignOutUser } from "../../../utilities/Utilities";

const { width, height } = Dimensions.get('window');
const screenHeight = Dimensions.get('screen').height;

const wp = (percentage) => {
  return width * (percentage / 100);
};

const hp = (percentage) => {
  return height * (percentage / 100);
};

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
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollViewRef = useRef(null);
  
  // Info cards data
  const infoCards = [
    {
      id: 1,
      title: "Eligibility",
      description: "Applicant Criteria",
      icon: require("../../../../assets/requirements.png"),
      navigateTo: "eligibility"
    },
    {
      id: 2,
      title: "Documents",
      description: "Documents Needed to Apply",
      icon: require("../../../../assets/folders.png"),
      navigateTo: "doc"
    },
    {
      id: 3,
      title: "Driving License",
      description: "Steps to get Driving license",
      icon: require("../../../../assets/drivers-license.png"),
      navigateTo: "license"
    },
    {
      id: 4,
      title: "Fees",
      description: "Fee Details",
      icon: require("../../../../assets/payment.png"),
      navigateTo: "Fee"
    }
  ];
  
  // Get window width for calculating card width
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = 130; // Same as your infoCard width
  const cardMargin = 15; // Your infoCard marginRight

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
  
  // Handle scroll to update active index
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // Calculate visible card index more precisely
    const itemWidth = cardWidth + cardMargin;
    const index = Math.round(scrollPosition / itemWidth);
    
    // Make sure index is within bounds
    const boundedIndex = Math.max(0, Math.min(index, infoCards.length - 1));
    
    if (activeCardIndex !== boundedIndex) {
      setActiveCardIndex(boundedIndex);
    }
  };

  // Handle scroll to previous card
  const scrollToPrevious = () => {
    if (activeCardIndex > 0) {
      const newIndex = activeCardIndex - 1;
      setActiveCardIndex(newIndex);
      scrollViewRef.current.scrollTo({
        x: newIndex * (cardWidth + cardMargin),
        animated: true,
      });
    }
  };

  // Handle scroll to next card
  const scrollToNext = () => {
    if (activeCardIndex < infoCards.length - 1) {
      const newIndex = activeCardIndex + 1;
      setActiveCardIndex(newIndex);
      scrollViewRef.current.scrollTo({
        x: newIndex * (cardWidth + cardMargin),
        animated: true,
      });
    }
  };

  return (
    <>
      <StatusBar 
        translucent 
        backgroundColor="transparent" 
        barStyle="light-content" 
      />         <SafeAreaView 
        style={styles.safeArea} 
        edges={['right', 'left']} // Don't include top/bottom in edges so we can control them manually
      >
          <ScrollView showsVerticalScrollIndicator={false} 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
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
                      <Text style={styles.buttonText}>Apply for License</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate("ApplyLicense")}
                  >
                      <Text style={styles.buttonText}>Apply for Learner</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate("FindSchools")}
                  >
                    <Text style={styles.secondaryButtonText}>Find Driving Schools</Text>
                  </TouchableOpacity>

                </View>

                {/* Quick Info Cards - Horizontal Scrollable */}
                <View style={styles.infoCardsWrapper}>
                  <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.infoCardsScrollContainer}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    snapToInterval={cardWidth + cardMargin}
                    snapToAlignment="start"
                    decelerationRate="fast"
                  >
                    {infoCards.map((item, index) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.infoCard}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate(item.navigateTo)}
                      >
                        <View style={styles.infoCardContent}>
                          <View style={styles.infoIconContainer}>
                            <Image
                              source={item.icon}
                              style={styles.infoIcon}
                            />
                          </View>
                          <View style={styles.infoTextContainer}>
                            <Text style={styles.infoTitle}>{item.title}</Text>
                            <Text style={styles.infoDescription}>{item.description}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  
                  {/* Arrow Pagination */}
                  <View style={styles.arrowPaginationContainer}>
                    <TouchableOpacity 
                      style={[styles.arrowButton, activeCardIndex === 0 && styles.disabledArrow]}
                      disabled={activeCardIndex === 0}
                      onPress={scrollToPrevious}
                    >
                      <Ionic name="chevron-back" size={24} color={activeCardIndex === 0 ? "#cce8ea" : "#35cad1"} />
                    </TouchableOpacity>
                    
                    <View style={styles.pageIndicator}>
                      <Text style={styles.pageText}>{activeCardIndex + 1}/{infoCards.length}</Text>
                    </View>
                    
                    <TouchableOpacity
                      style={[styles.arrowButton, activeCardIndex === infoCards.length-1 && styles.disabledArrow]}
                      disabled={activeCardIndex === infoCards.length-1}
                      onPress={scrollToNext}
                    >
                      <Ionic name="chevron-forward" size={24} color={activeCardIndex === infoCards.length-1 ? "#cce8ea" : "#35cad1"} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                {/*RTO Helps */}
                <View style={styles.rtoCardWrapper}>
                  <TouchableOpacity
                    style={styles.rtoCard}
                    activeOpacity={0.8}
                    onPress={()=>navigation.navigate("rules")}
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
    backgroundColor: '#dbf3f3', 
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
  },
  headerContainer: {
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? hp(5) : hp(8), // Account for status bar height
    paddingBottom: hp(5),
    backgroundColor: "#35cad1",
    // Remove fixed height, use percentage of screen height instead
    height: hp(30),
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
    backgroundColor: "#35cad1",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    elevation: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 50 }, // Adds shadow below the element
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
  quoteText: {
    fontSize: 21,
    color: "white",
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
    textShadowColor:"#35cad1",
    textShadowRadius:2,
  },
  contentContainer: {
    backgroundColor: "#dbf3f3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: wp(5),
    paddingTop: hp(4),
    paddingBottom: hp(2),
    flex: 1,
    marginTop: -hp(7),
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
    marginBottom: hp(1),
    height: hp(25),
  },
  
  infoCardsScrollContainer: {
    paddingRight: 20,
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
    padding: wp(4),
    marginRight: wp(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 9,
    width: wp(32), // 32% of screen width
    height: hp(20), // 20% of screen height
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
  // Arrow pagination styles
  arrowPaginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(255, 255, 255)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:-30
  },
  disabledArrow: {
    backgroundColor: 'rgba(112, 117, 117, 0.47)',
  },
  pageIndicator: {
    paddingHorizontal: 25,
    marginBottom:-30
  },
  pageText: {
    color: '#35cad1',
    fontWeight: '700',
    fontSize: 18,
  },
  rtoCardWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 30,
  },
  rtoCard: {
    backgroundColor: THEME.white,
    borderRadius: 12,
    padding: wp(4),
    marginHorizontal: wp(2),
    shadowColor: "#35cad1",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 10,
    width: wp(42), // 42% of screen width
    height: hp(20), // 20% of screen height
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
    padding: wp(5),
    shadowColor: "#35cad1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: "#35cad1",
    marginBottom: hp(5), // Add extra bottom padding
    marginTop: hp(3),
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
  // Modal styles
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