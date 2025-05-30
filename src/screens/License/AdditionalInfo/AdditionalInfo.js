import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { ChevronDown, Check, User, Users } from 'lucide-react-native';
import Ionic from "react-native-vector-icons/Ionicons";

const AdditionalInfo = ({ navigation, route }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [guardianName, setGuardianName] = useState('');
  const [isUnder18, setIsUnder18] = useState(false);
  
  // Extract params with default values to avoid undefined errors
  const { email = '', applicationType = 'license' } = route?.params || {};

  const qualifications = [
    'High School Diploma',
    'GED',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate',
    'Professional Certification',
    'Trade School',
    'Some College',
    'Other'
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectQualification = (qualification) => {
    setSelectedQualification(qualification);
    setIsOpen(false);
  };

  const getHeaderText = () => {
    return applicationType === 'learner' ? 'Apply for Learner' : 'Apply for License';
  };

  const handleNext = () => {
    // Create a completeDetails object with all the information
    const completeDetails = {
      ageGroup: isUnder18 ? 'Under 18' : '18+',
      guardianName: isUnder18 ? guardianName : null,
      qualification: selectedQualification,
      email
    };
    
    navigation.navigate('details', { 
      completeDetails, 
      applicationType 
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.iconstyle}
        onPress={() => navigation.navigate("AddressDetails")}>
        <Ionic name="chevron-back"
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>{getHeaderText()}</Text>
        <Text style={styles.subtitle}>Additional Information</Text>
      </View>

      <View style={styles.ageGroupContainer}>
        <Text style={styles.label}>Age Group</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, !isUnder18 && styles.activeToggle]} 
            onPress={() => setIsUnder18(false)}
          >
            <User size={16} color={!isUnder18 ? "#fff" : "#35cad1"} />
            <Text style={[styles.toggleText, !isUnder18 && styles.activeToggleText]}>18+</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, isUnder18 && styles.activeToggle]} 
            onPress={() => setIsUnder18(true)}
          >
            <Users size={16} color={isUnder18 ? "#fff" : "#35cad1"} />
            <Text style={[styles.toggleText, isUnder18 && styles.activeToggleText]}>Under 18</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isUnder18 && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Guardian's Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter guardian's full name"
            value={guardianName}
            onChangeText={setGuardianName}
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Educational Qualification</Text>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>
            {selectedQualification || "Select your qualification"}
          </Text>
          <ChevronDown size={20} color="#35cad1" />
        </TouchableOpacity>
        
        {isOpen && (
          <View style={styles.dropdownMenu}>
            <ScrollView style={styles.optionsContainer}>
              {qualifications.map((qualification, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => selectQualification(qualification)}
                >
                  <Text style={styles.optionText}>{qualification}</Text>
                  {selectedQualification === qualification && (
                    <Check size={16} color="#35cad1" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={styles.submitButton} 
        activeOpacity={0.8} 
        onPress={handleNext}
      >
        <Text style={styles.submitButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  header: {
    padding: 30,
    backgroundColor: '#35cad1',
    alignItems: 'center',
    height: 150,
    marginBottom: 15
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    marginTop: 50
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5
  },
  ageGroupContainer: {
    marginBottom: 20,
    padding: 15
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#35cad1',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    flex: 1,
    gap: 8,
  },
  activeToggle: {
    backgroundColor: '#35cad1',
  },
  toggleText: {
    color: '#35cad1',
    fontWeight: '500',
  },
  activeToggleText: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
    padding: 15
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 76,
    left: 15,
    right: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionsContainer: {
    maxHeight: 200,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#35cad1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 15
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdditionalInfo;