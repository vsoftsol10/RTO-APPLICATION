import { StatusBar, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import colors from '../../../constents/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // Using react-native-vector-icons instead

const DrivingLicense = ({ navigation }) => {
  const handleBack = () => {
    navigation.navigate("Home");
  }
  
  const handleNext = () => {
    navigation.navigate("step2"); // Fixed the string reference
  }
  
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={"#35cad1"} />
      
      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill}></View>
        </View>
        <Text style={styles.stepText}>Step 1 of 4</Text>
      </View>
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>What is Driving License?</Text>
      </View>
      
      {/* Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Icon name="car" size={36} color={"#35cad1"} />
        </View>
      </View>
      
      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.paraText}>
          A Driving License is an official government-issued document that authorizes an individual to operate a
          motor vehicle on public roads. It serves as both a legal permit and an identity proof in many countries.
        </Text>
        
        <Text style={styles.paraText}>
          The primary purpose of a driving license is to ensure that only qualified individuals are allowed to drive,
          promoting road safety and regulatory compliance. It also helps law enforcement track drivers and their records.
        </Text>
        
        <Text style={styles.paraText}>
          A month following the issuing of the learner license, the individual must take the test in front
          of an RTO authority, who will determine whether or not the individual passed after a thorough examination.
        </Text>
      </View>
      
      {/* Important note */}
      <View style={styles.noteContainer}>
        <Icon name="information-circle" size={24} color={"#35cad1"} />
        <Text style={styles.noteText}>
          This service includes both LLR and DL.
        </Text>
      </View>
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={handleBack} 
          style={[styles.button, styles.backButton]}
        >
          <Icon name="arrow-back" size={16} color={"#35cad1"} />
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={handleNext} 
          style={[styles.button, styles.nextButton]}
        >
          <Text style={styles.nextBtnText}>Next</Text>
          <Icon name="arrow-forward" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default DrivingLicense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  progressContainer: {
    marginBottom: 20,
    marginTop:20
  },
  progressBar: {
    height: 8,
    backgroundColor: '#dbf3f3',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    width: '25%', // First step of 4
    height: '100%',
    backgroundColor: "#35cad1",
    borderRadius: 4,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbf3f3', // Light purple background
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 24,
    elevation: 5,
  },
  paraText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 23,
    marginBottom: 16,
    fontWeight:"500"
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbf3f3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 30,
  },
  noteText: {
    fontSize: 17,
    fontWeight: '700',
    color: "#35cad1",
    marginLeft: 8,
    letterSpacing:0.5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation:5
  },
  backButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "#35cad1",
  },
  nextButton: {
    backgroundColor: "#35cad1",
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: '500',
    color: "#35cad1",
    marginLeft: 8,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
    marginRight: 8,
  }
});