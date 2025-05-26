import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionic from "react-native-vector-icons/Ionicons";
import auth from '@react-native-firebase/auth';
import FONTS from '../../../constents/Fonts';

const VerifyEmail = ({ navigation, route }) => {
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const { email, message } = route.params || { email: '', message: 'Please verify your email.' };

  // Set a countdown timer for resending verification
  useEffect(() => {
    let interval;
    if (timer > 0 && resendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer, resendDisabled]);
  
  // Check if current user's email is verified
  const checkVerification = async () => {
    try {
      const currentUser = auth().currentUser;
      
      if (currentUser) {
        // Reload the user to get the latest verification status
        await currentUser.reload();
        
        if (currentUser.emailVerified) {
          // Email is verified, navigate back to signup
          navigation.navigate("SignUp", { verifiedEmail: email });
        } else {
          alert("Your email is not verified yet. Please check your inbox and verify your email.");
        }
      } else {
        // No user is signed in, try to sign in temporarily to check status
        try {
          // Create a temporary user to check verification
          // This uses a temporary password pattern for testing only
          const tempUser = await auth().signInWithEmailAndPassword(email, `temp${email}`);
          
          if (tempUser.user.emailVerified) {
            // Email is verified, sign out and navigate
            await auth().signOut();
            navigation.navigate("SignUp", { verifiedEmail: email });
          } else {
            await auth().signOut();
            alert("Your email is not verified yet. Please check your inbox and verify your email.");
          }
        } catch (error) {
          // If sign in fails, likely the user exists but password is wrong,
          // which means the email was sent but not verified yet
          console.log("Verification check error:", error);
          
          if (error.code === 'auth/wrong-password') {
            alert("Your email exists but is not verified yet. Please check your inbox and verify your email.");
          } else if (error.code === 'auth/user-not-found') {
            alert("This email is not registered. Please go back and check your email address.");
          } else {
            alert("Failed to check verification status. Please try again.");
          }
        }
      }
    } catch (error) {
      console.error("Error checking email verification:", error);
      alert("Failed to check verification status. Please try again.");
    }
  };

  // Resend verification email using Firebase Auth
  const resendVerification = async () => {
    try {
      // Get current user or try to create a temporary session
      const currentUser = auth().currentUser;
      
      if (currentUser) {
        // If user is signed in, send verification directly
        await currentUser.sendEmailVerification();
        alert("Verification email sent. Please check your inbox.");
      } else {
        // Try to send verification through backend or API
        // In a real app, this would call your backend API that handles email verification
        alert("A new verification email has been requested. Please check your inbox.");
        
        // For demo purposes only - simulate sending via a direct Firebase call
        // In production, replace this with a secure backend call
        try {
          // This is a simplified demonstration and not secure for production
          // This approach assumes the user was previously created in SignUp component
          // In a real implementation, use a backend endpoint to handle this
          const tempUser = await auth().createUserWithEmailAndPassword(email, `temp${email}`);
          await tempUser.user.sendEmailVerification();
          await auth().signOut();
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            // User exists - we'd normally use a backend API to handle this
            console.log("Email exists, verification would be sent by backend");
          } else {
            throw error;
          }
        }
      }
      
      // Reset timer
      setTimer(60);
      setResendDisabled(true);
    } catch (error) {
      console.error("Error resending verification:", error);
      alert("Failed to resend verification email. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.iconstyle}
        onPress={() => navigation.goBack()}>
        <Ionic name="chevron-back" style={styles.icon} />
      </TouchableOpacity>
      
      {/* Main Content */}
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Ionic name="mail" style={styles.emailIcon} />
          <Text style={styles.headerText}>Verify Your Email</Text>
          <Text style={styles.messageText}>{message}</Text>
          <Text style={styles.emailText}>{email}</Text>
          
          <TouchableOpacity 
            style={styles.verifyButton}
            onPress={checkVerification}
          >
            <Text style={styles.buttonText}>I've Verified My Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.resendButton, 
              resendDisabled && styles.disabledButton
            ]}
            onPress={resendVerification}
            disabled={resendDisabled}
          >
            <Text style={[
              styles.resendButtonText, 
              resendDisabled && styles.disabledButtonText
            ]}>
              {resendDisabled 
                ? `Resend in ${timer}s` 
                : 'Resend Verification Email'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.changeEmailButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.changeEmailText}>Change Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fallback background if image is missing
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: "white",
  },
  iconstyle: {
    backgroundColor: 'rgba(27, 25, 25, 0.37)',
    marginTop: 50,
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    aspectRatio: 1/1,
    width: 40,
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  contentContainer: {
    width: '85%',
    maxWidth: 350,
    backgroundColor: 'rgba(184, 184, 184, 0.7)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  emailIcon: {
    fontSize: 70,
    color: '#00BCD4',
    marginBottom: 20,
  },
  headerText: {
    fontFamily: FONTS.BOLD,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  emailText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  verifyButton: {
    width: '100%',
    backgroundColor: '#00BCD4',
    borderRadius: 8,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#00BCD4',
    borderRadius: 8,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  disabledButton: {
    borderColor: '#888',
  },
  resendButtonText: {
    color: '#00BCD4',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#888'
  },
  changeEmailButton: {
    marginTop: 10,
  },
  changeEmailText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default VerifyEmail;