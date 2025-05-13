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
  FlatList,
} from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";

const LicenseDetailsForm = ({ navigation }) => {
  
  // State variables
  const [licenseType, setLicenseType] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [preferredRTO, setPreferredRTO] = useState('');
  const [drivingSchool, setDrivingSchool] = useState('');
  
  // Modals visibility state
  const [licenseTypeModalVisible, setLicenseTypeModalVisible] = useState(false);
  const [vehicleTypesModalVisible, setVehicleTypesModalVisible] = useState(false);
  const [rtoModalVisible, setRtoModalVisible] = useState(false);
  const [schoolModalVisible, setSchoolModalVisible] = useState(false);
  
  // Form validation state
  const [errors, setErrors] = useState({});

  // Sample data (would come from API/Firebase in real app)
  const licenseTypes = ['Learner', 'Permanent'];
  const vehicleTypeOptions = ['LMV (Light Motor Vehicle)', 'MCWG (Motorcycle with Gear)', 'MCWOG (Motorcycle without Gear)', 'HMV (Heavy Motor Vehicle)', 'Transport'];
  const rtoOffices = ['RTO Office 1 - Central', 'RTO Office 2 - North', 'RTO Office 3 - South', 'RTO Office 4 - East', 'RTO Office 5 - West'];
  const drivingSchools = ['Premier Driving School', 'Safe Drive Academy', 'Expert Drivers', 'City Driving School', 'Highway Motors Training'];

  // Handler for vehicle type selection (allows multiple selections)
  const toggleVehicleType = (item) => {
    if (vehicleTypes.includes(item)) {
      setVehicleTypes(vehicleTypes.filter(type => type !== item));
    } else {
      setVehicleTypes([...vehicleTypes, item]);
    }
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    
    if (!licenseType) newErrors.licenseType = 'Please select a license type';
    if (vehicleTypes.length === 0) newErrors.vehicleTypes = 'Please select at least one vehicle type';
    if (!preferredRTO) newErrors.preferredRTO = 'Please select an RTO office';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler with navigation logic
  const handleSubmit = () => {
    if (validateForm()) {
      const licenseDetails = {
        licenseType,
        vehicleTypes,
        preferredRTO,
        drivingSchool
      };
      
      // Navigation logic based on license type
      if (licenseType === 'Permanent') {
        // Navigate to test slot booking for Permanent licenses
        navigation.navigate('TestBooking', { licenseDetails });
      } else {
        // For Learner licenses or if no type is selected (which shouldn't happen due to validation)
        // Navigate to a different screen or show completion message
        console.log('Form submitted with data:', licenseDetails);
        alert('License details submitted successfully!');
        
        // You might want to navigate to a different screen here
        // navigation.navigate('LearnerLicenseCompletion', { licenseDetails });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconstyle}
            onPress={() => navigation.navigate("AdditionalInfo")}>
            <Ionic name="chevron-back"
                style={styles.icon}
            />
        </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.headerText}>Apply for License</Text>
            <Text style={styles.subHeaderText}>License Details</Text>
          </View>
          
          <View style={styles.formContainer}>
            {/* License Type */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>License Type</Text>
              <TouchableOpacity 
                style={[styles.selectionButton, errors.licenseType && styles.inputError]}
                onPress={() => setLicenseTypeModalVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={licenseType ? styles.selectionText : styles.placeholderText}>
                  {licenseType || 'Select License Type'}
                </Text>
              </TouchableOpacity>
              {errors.licenseType && <Text style={styles.errorText}>{errors.licenseType}</Text>}
            </View>
            
            {/* Vehicle Types */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Vehicle Type(s)</Text>
              <TouchableOpacity 
                style={[styles.selectionButton, errors.vehicleTypes && styles.inputError]}
                onPress={() => setVehicleTypesModalVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={vehicleTypes.length > 0 ? styles.selectionText : styles.placeholderText}>
                  {vehicleTypes.length > 0 
                    ? vehicleTypes.length > 2 
                      ? `${vehicleTypes.length} types selected` 
                      : vehicleTypes.join(', ') 
                    : 'Select Vehicle Type(s)'}
                </Text>
              </TouchableOpacity>
              {errors.vehicleTypes && <Text style={styles.errorText}>{errors.vehicleTypes}</Text>}
            </View>
            
            {/* Preferred RTO Office */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Preferred RTO Office</Text>
              <TouchableOpacity 
                style={[styles.selectionButton, errors.preferredRTO && styles.inputError]}
                onPress={() => setRtoModalVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={preferredRTO ? styles.selectionText : styles.placeholderText}>
                  {preferredRTO || 'Select RTO Office'}
                </Text>
              </TouchableOpacity>
              {errors.preferredRTO && <Text style={styles.errorText}>{errors.preferredRTO}</Text>}
            </View>
            
            {/* Driving School */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Driving School Name <Text style={styles.optionalText}>(Optional)</Text></Text>
              <TouchableOpacity 
                style={styles.selectionButton}
                onPress={() => setSchoolModalVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={drivingSchool ? styles.selectionText : styles.placeholderText}>
                  {drivingSchool || 'Select Driving School'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.helperText}>For training and guidance</Text>
            </View>
            
            {/* Info for Permanent License */}
            {licenseType === 'Permanent' && (
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  You've selected a Permanent License. In the next step, you'll be able to book your test slot.
                </Text>
              </View>
            )}
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.buttonText}>
              {licenseType === 'Permanent' ? 'Next: Book Test Slot' : 'Next'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* License Type Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={licenseTypeModalVisible}
        onRequestClose={() => setLicenseTypeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select License Type</Text>
            <FlatList
              data={licenseTypes}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    licenseType === item && styles.selectedItem
                  ]}
                  onPress={() => {
                    setLicenseType(item);
                    setLicenseTypeModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    licenseType === item && styles.selectedItemText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLicenseTypeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Vehicle Types Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={vehicleTypesModalVisible}
        onRequestClose={() => setVehicleTypesModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Vehicle Type(s)</Text>
            <FlatList
              data={vehicleTypeOptions}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    vehicleTypes.includes(item) && styles.selectedItem
                  ]}
                  onPress={() => toggleVehicleType(item)}
                >
                  <Text style={[
                    styles.modalItemText,
                    vehicleTypes.includes(item) && styles.selectedItemText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setVehicleTypesModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setVehicleTypesModalVisible(false)}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* RTO Office Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={rtoModalVisible}
        onRequestClose={() => setRtoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select RTO Office</Text>
            <FlatList
              data={rtoOffices}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    preferredRTO === item && styles.selectedItem
                  ]}
                  onPress={() => {
                    setPreferredRTO(item);
                    setRtoModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    preferredRTO === item && styles.selectedItemText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setRtoModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Driving School Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={schoolModalVisible}
        onRequestClose={() => setSchoolModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Driving School</Text>
            <FlatList
              data={drivingSchools}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    drivingSchool === item && styles.selectedItem
                  ]}
                  onPress={() => {
                    setDrivingSchool(item);
                    setSchoolModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    drivingSchool === item && styles.selectedItemText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSchoolModalVisible(false)}
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
  infoContainer: {
    backgroundColor: '#f0f9fa',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#35cad1',
    marginVertical: 10,
  },
  infoText: {
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
    justifyContent: 'space-between',
    padding: 16,
  },
  confirmButton: {
    backgroundColor: '#35cad1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
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
  }
});

export default LicenseDetailsForm;