import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionic from "react-native-vector-icons/Ionicons";


const TestSlotBooking = ({ route }) => {
  const navigation = useNavigation();
  const { licenseDetails } = route.params || {};
  
  // Date and time states
  const [preferredDate, setPreferredDate] = useState(null);
  const [preferredTime, setPreferredTime] = useState(null);
  
  // Modal visibility states
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  
  // Date picker state (platform specific)
  const [showIOSDatePicker, setShowIOSDatePicker] = useState(false);
  
  // Form validation state
  const [errors, setErrors] = useState({});

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', 
    '03:00 PM', '04:00 PM'
  ];

  // Formatting functions
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Handle date change
  const handleDateChange = (event, selectedDate) => {
    setShowIOSDatePicker(false);
    
    if (selectedDate) {
      // Check if date is in the future and not on weekends
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const day = selectedDate.getDay();
      const isWeekend = day === 0 || day === 6;
      
      if (selectedDate < today) {
        setErrors({...errors, date: 'Please select a future date'});
        return;
      }
      
      if (isWeekend) {
        setErrors({...errors, date: 'RTO tests are not conducted on weekends'});
        return;
      }
      
      setPreferredDate(selectedDate);
      setErrors({...errors, date: null});
    }
    
    if (Platform.OS === 'android') {
      setDatePickerVisible(false);
    }
  };

  // Open date picker according to platform
  const showDatePicker = () => {
    if (Platform.OS === 'ios') {
      setShowIOSDatePicker(true);
    } else {
      setDatePickerVisible(true);
    }
  };

  // Submit handler
  const handleSubmit = () => {
    // Since both fields are optional, we can just proceed
    const testSlotDetails = {
      ...licenseDetails,
      testDate: preferredDate ? formatDate(preferredDate) : 'Not specified',
      testTime: preferredTime || 'Not specified'
    };
    
    console.log('Test slot booked with details:', testSlotDetails);
    alert('Test slot booking completed successfully!');
    navigation.navigate("UploadDoc")
    // Navigate to next screen (you would replace this with your actual next screen)
    // navigation.navigate('PaymentScreen', { bookingDetails: testSlotDetails });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconstyle}
            onPress={() => navigation.navigate("details")}>
            <Ionic name="chevron-back"
                style={styles.icon}
            />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Permanent License</Text>
            <Text style={styles.subHeaderText}>Book Test Slot</Text>
          </View>
          
          <View style={styles.formContainer}>
            {/* Preferred Date */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Preferred Test Date <Text style={styles.optionalText}>(Optional)</Text>
              </Text>
              <TouchableOpacity 
                style={[styles.selectionButton, errors.date && styles.inputError]}
                onPress={showDatePicker}
                activeOpacity={0.7}
              >
                <Text style={preferredDate ? styles.selectionText : styles.placeholderText}>
                  {preferredDate ? formatDate(preferredDate) : 'Select Preferred Date'}
                </Text>
              </TouchableOpacity>
              {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
              <Text style={styles.helperText}>RTO tests are conducted Monday through Friday</Text>
            </View>
            
            {/* Preferred Time */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Preferred Test Time <Text style={styles.optionalText}>(Optional)</Text>
              </Text>
              <TouchableOpacity 
                style={styles.selectionButton}
                onPress={() => setTimeModalVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={preferredTime ? styles.selectionText : styles.placeholderText}>
                  {preferredTime || 'Select Preferred Time'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.helperText}>Subject to availability at your selected RTO</Text>
            </View>
            
            <View style={styles.noteContainer}>
              <Text style={styles.noteTitle}>Important Note:</Text>
              <Text style={styles.noteText}>
                While we try our best to accommodate your preferred date and time, 
                final slot allocation depends on RTO availability. You will receive 
                a confirmation of your booked slot via SMS and email.
              </Text>
            </View>
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker for Android */}
      {datePickerVisible && Platform.OS === 'android' && (
        <DateTimePicker
          value={preferredDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
      
      {/* Date Picker for iOS */}
      {Platform.OS === 'ios' && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showIOSDatePicker}
          onRequestClose={() => setShowIOSDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Select Preferred Date</Text>
              <DateTimePicker
                value={preferredDate || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                minimumDate={new Date()}
                style={styles.iosDatePicker}
              />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowIOSDatePicker(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Time Slots Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={timeModalVisible}
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Preferred Time</Text>
            <FlatList
              data={timeSlots}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    preferredTime === item && styles.selectedItem
                  ]}
                  onPress={() => {
                    setPreferredTime(item);
                    setTimeModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    preferredTime === item && styles.selectedItemText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTimeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  icon:{
    fontSize:20,
    color:"white",
},
iconstyle:{
    backgroundColor: '#35cad1',
    marginTop:50,
    padding:10,
    borderRadius:100,
    elevation:5,
    alignItems:"center",
    aspectRatio:1/1,
    width:40,
    position:"absolute",
    top:20,
    left:20,
    zIndex:1,
},
  header: {
    padding: 20,
    backgroundColor: '#35cad1',
    alignItems: 'center',
    height: 150
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    top: 60
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
  optionalText: {
    fontWeight: 'normal',
    color: '#666',
    fontSize: 14,
  },
  selectionButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  selectionText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
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
  noteContainer: {
    backgroundColor: '#f0f9fa',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#35cad1',
    marginVertical: 10,
  },
  noteTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#35cad1',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 50,   
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
  // Modal styles
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
    maxHeight: '70%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
  selectedItemText: {
    color: '#35cad1',
    fontWeight: '500',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  closeButtonText: {
    color: '#ff3b30',
    fontSize: 16,
  },
  iosDatePicker: {
    width: '100%',
    backgroundColor: 'white',
    height: 200,
  },
});

export default TestSlotBooking;