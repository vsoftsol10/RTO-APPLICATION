import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constents/colors';
import { SignOutUser } from '../../../utilities/Utilities';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.reload(); // Force reload to fetch latest user details
        setUser(auth().currentUser); // Update user state
      }
    };
  
    const unsubscribe = auth().onAuthStateChanged((updatedUser) => {
      if (updatedUser) {
        fetchUser(); // Ensure we get the latest user data
      } else {
        setUser(null); // Handle logout case
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleSignOut = async () => {
    try {
      await SignOutUser();
      setUser(null); // Reset state after sign-out
      console.log("Signed out");
    } catch (error) {
      console.log("Sign-out error:", error);
    }
  };

  return (
    <View>
      <StatusBar backgroundColor={colors.bgLineGradeOne} barStyle={"dark-content"} />
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
        <Text style={{ fontSize: 20, color: colors.black }}>Welcome</Text>
        <Text style={styles.userText}>
          {user?.displayName ? user.displayName : "Anonymous User"}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSignOut}
          style={styles.signoutText}
        >
          <Text style={{ color: colors.white }}>Sign Out</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  userText: {
    fontSize: 40,
    color: colors.black,
    letterSpacing: 2,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 20
  },
  signoutText: {
    fontWeight: "400",
    marginTop: 10,
    backgroundColor: colors.warning,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10
  }
});
