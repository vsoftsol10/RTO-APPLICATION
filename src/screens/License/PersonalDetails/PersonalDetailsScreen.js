import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const PersonalDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params || { email: '' };
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [qualification, setQualification] = useState('');
  const [mobile, setMobile] = useState('');
  const [emailAddress, setEmailAddress] = useState(email);
  const [aadhar, setAadhar] = useState('');
  
  // Form validation state
  const [errors, setErrors] = useState({});
  
  // Set email from route params when available
  useEffect(() => {
    if (email) {
      setEmailAddress(email);
    }
  }, [email]);

  // Handle date picker
  const onDateChange = (event, selectedDate) => {
    // Close the date picker on Android
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    // Update the date if a new one was selected
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  // Open date picker based on platform
  const showDatepicker = () => {
    if (Platform.OS === 'android') {
      setShowDatePicker(true);
    } else {
      setDateModalVisible(true);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Calculate age from date of birth
  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    
    if (!fullName.trim()) newErrors.fullName = 'Name is required';
    
    const age = calculateAge(dob);
    if (age < 18) newErrors.dob = 'You must be at least 18 years old';
    
    if (!gender) newErrors.gender = 'Please select a gender';
    if (!qualification) newErrors.qualification = 'Please select your qualification';
    
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (emailAddress.trim() && !/\S+@\S+\.\S+/.test(emailAddress)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!aadhar.trim()) {
      newErrors.aadhar = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(aadhar)) {
      newErrors.aadhar = 'Please enter a valid 12-digit Aadhar number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Create personal details object
      const personalDetails = {
        fullName,
        dob,
        age: calculateAge(dob),
        gender,
        qualification,
        mobile,
        emailAddress,
        aadhar
      };
      
      // Navigate to next screen with data
      navigation.navigate('AddressDetails', { personalDetails });
      
      // You can also save to redux/context state here
      console.log('Form submitted:', personalDetails);
    }
  };

  // Render the date picker differently based on platform
  const renderDatePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={dateModalVisible}
          onRequestClose={() => {
            setDateModalVisible(false);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.datePickerHeader}>
                <TouchableOpacity onPress={() => setDateModalVisible(false)}>
                  <Text style={styles.datePickerCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDateModalVisible(false);
                  }}
                >
                  <Text style={styles.datePickerDone}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={dob}
                mode="date"
                display="spinner"
                onChange={onDateChange}
                maximumDate={new Date()}
                style={styles.datePicker}
              />
            </View>
          </View>
        </Modal>
      );
    }
    
    // For Android, render inline instead of as a modal
    return showDatePicker && (
      <View style={styles.androidDatePickerContainer}>
        <DateTimePicker
          testID="dateTimePicker"
          value={dob}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
          style={styles.androidDatePicker}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Apply for License</Text>
            <Text style={styles.subHeaderText}>Personal Details</Text>
          </View>
          
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name (As per Aadhar)</Text>
              <TextInput
                style={[styles.input, errors.fullName && styles.inputError]}
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
              />
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            </View>
            
            {/* Date of Birth */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity 
                style={[styles.datePickerButton, errors.dob && styles.inputError]} 
                onPress={showDatepicker}
                activeOpacity={0.7}
              >
                <Text style={styles.dateText}>{formatDate(dob)}</Text>
              </TouchableOpacity>
              
              {/* Render the date picker */}
              {renderDatePicker()}
              
              {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
              <Text style={styles.helperText}>Age: {calculateAge(dob)} years</Text>
            </View>
            
            {/* Gender */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <View style={[styles.pickerContainer, errors.gender && styles.inputError]}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
              {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
            </View>
            
            {/* Educational Qualification */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Educational Qualification</Text>
              <View style={[styles.pickerContainer, errors.qualification && styles.inputError]}>
                <Picker
                  selectedValue={qualification}
                  onValueChange={(itemValue) => setQualification(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Qualification" value="" />
                  <Picker.Item label="Below 10th" value="below_10th" />
                  <Picker.Item label="10th Pass" value="10th_pass" />
                  <Picker.Item label="12th Pass" value="12th_pass" />
                  <Picker.Item label="Graduate" value="graduate" />
                  <Picker.Item label="Post Graduate" value="post_graduate" />
                  <Picker.Item label="PhD" value="phd" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
              {errors.qualification && <Text style={styles.errorText}>{errors.qualification}</Text>}
            </View>
            
            {/* Mobile Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                style={[styles.input, errors.mobile && styles.inputError]}
                placeholder="Enter your 10-digit mobile number"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="number-pad"
                maxLength={10}
              />
              {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
              <Text style={styles.helperText}>OTP verification will be required</Text>
            </View>
            
            {/* Email Address */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address (Optional)</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Enter your email address"
                value={emailAddress}
                onChangeText={setEmailAddress}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            
            {/* Aadhar Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Aadhar Number</Text>
              <TextInput
                style={[styles.input, errors.aadhar && styles.inputError]}
                placeholder="Enter your 12-digit Aadhar number"
                value={aadhar}
                onChangeText={setAadhar}
                keyboardType="number-pad"
                maxLength={12}
              />
              {errors.aadhar && <Text style={styles.errorText}>{errors.aadhar}</Text>}
              <Text style={styles.helperText}>For ID verification</Text>
            </View>
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#35cad1',
    alignItems: 'center',
    height:150
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    top:60
  },
  subHeaderText: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 65,
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 5,
  },
  helperText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
  },
  datePickerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#35cad1',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  // Additional styles for date picker modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  datePickerCancel: {
    color: '#ff3b30',
    fontSize: 16,
  },
  datePickerDone: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  datePicker: {
    height: 200,
  },
  // New styles for Android date picker
  androidDatePickerContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  androidDatePicker: {
    width: '100%',
    backgroundColor: 'white',
  }
});

export default PersonalDetailsScreen;