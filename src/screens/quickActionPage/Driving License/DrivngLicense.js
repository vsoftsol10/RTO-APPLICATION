import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../../../constents/colors';

const DrivingLicense = ({navigation}) => {

    const handleBack=()=>{
        navigation.navigate("Home")
    }
  return (
    <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" backgroundColor={colors.purple} />

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Steps to Get Driving License</Text>
      </View>

      {/* Steps Section */}
      <View style={styles.container}>
        <View style={styles.stepsContainer}>
          {[
            "Authentication with E-KYC",
            "Personal Details",
            "Address Details",
            "Book Slot with Date",
            "Document Submission",
          ].map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={styles.stepText}>{index + 1}. {step}</Text>
            </View>
          ))}
        </View>
      </View>
     <View style={styles.backBtnContainer}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.8} onPress={handleBack} >
            <Text style={styles.backButtonTxt}>Back to Home</Text>
        </TouchableOpacity>
     </View>
    </View>
  );
};

export default DrivingLicense;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white, // Background color for better contrast
  },
  headerContainer: {
    backgroundColor: colors.purple,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 50,
    alignItems: "center",
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    elevation: 5, // Shadow effect
  },
  header: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  container: {
    padding: 16,
  },
  stepsContainer: {
    gap: 20, // Adds space between steps
  },
  stepContainer: {
    backgroundColor: colors.border,
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Light shadow
    flexDirection: "row",
    alignItems: "center",
  },
  stepText: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.darkGrey,
  },
  backButton:{
    alignItems:"center",
    backgroundColor:colors.purple,
    width:"50%",
    padding:10,
    borderRadius:10,
    marginVertical:30

  },
  backBtnContainer:{
    alignItems:"center",
    justifyContent:"center"
  },
  backButtonTxt:{
    fontSize:18,
    color:"#ffffff",
    letterSpacing:2,
    fontWeight:"600"
  }
});
