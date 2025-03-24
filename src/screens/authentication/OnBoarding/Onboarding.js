import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../../constents/colors';

const Onboarding = ({navigation}) => {
  // For CLI projects, you don't need to dynamically load fonts
  // They should be linked through the native project setup
  
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <Image
        source={require("../../../images/authentication/Onboarding_Pic.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.subText}>Effortless Licensing at Your Fingertips!</Text>
          </View>
          
          <TouchableOpacity
            onPress={() => navigation.navigate("login&Register")}
            activeOpacity={0.8}
            style={styles.continueButton}>
            <Text style={styles.buttonText}>Continue</Text>
            <View style={styles.arrowCircle}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black', // To match the phone frame
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.35)', // Subtle overlay for contrast
    marginTop: '130%', // Push content down to match image
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textContainer: {
    alignItems: 'flex-start',
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 38,
    fontWeight: '900',
    color: colors.black,
    fontFamily: Platform.OS === 'ios' ? 'Noteworthy' : 'cursive', // More script-like font
    marginBottom: 5,
  },
  subText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '500',
    letterSpacing:1
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '500',
    marginRight: 10,
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#30C4D1', // Teal circle color
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 28,
    marginTop:-10
  }
});