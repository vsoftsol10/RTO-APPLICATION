import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  SafeAreaView
} from 'react-native';

// Main License Details Form Component
const LicenseDetailsForm=()=> {
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

  // Submit handler
  const handleSubmit = () => {
    const formData = {
      licenseType,
      vehicleTypes,
      preferredRTO,
      drivingSchool
    };
    
    console.log('Form submitted with data:', formData);
    // Here you would typically send the data to an API
    alert('License details submitted successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>License Details</Text>
        
        {/* License Type Picker */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>License Type</Text>
          <TouchableOpacity 
            style={styles.pickerContainer}
            onPress={() => setLicenseTypeModalVisible(true)}
          >
            <Text style={licenseType ? styles.pickerText : styles.placeholderText}>
              {licenseType || 'Select License Type'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Vehicle Types Multi-select */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Vehicle Type(s)</Text>
          <TouchableOpacity 
            style={styles.pickerContainer}
            onPress={() => setVehicleTypesModalVisible(true)}
          >
            <Text style={vehicleTypes.length > 0 ? styles.pickerText : styles.placeholderText}>
              {vehicleTypes.length > 0 
                ? vehicleTypes.length > 2 
                  ? `${vehicleTypes.length} types selected` 
                  : vehicleTypes.join(', ') 
                : 'Select Vehicle Type(s)'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Preferred RTO Office Picker */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Preferred RTO Office</Text>
          <TouchableOpacity 
            style={styles.pickerContainer}
            onPress={() => setRtoModalVisible(true)}
          >
            <Text style={preferredRTO ? styles.pickerText : styles.placeholderText}>
              {preferredRTO || 'Select RTO Office'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Driving School Picker (Optional) */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Driving School Name <Text style={styles.optionalText}>(Optional)</Text></Text>
          <TouchableOpacity 
            style={styles.pickerContainer}
            onPress={() => setSchoolModalVisible(true)}
          >
            <Text style={drivingSchool ? styles.pickerText : styles.placeholderText}>
              {drivingSchool || 'Select Driving School'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* License Type Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={licenseTypeModalVisible}
        onRequestClose={() => setLicenseTypeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select License Type</Text>
            <FlatList
              data={licenseTypes}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setLicenseType(item);
                    setLicenseTypeModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLicenseTypeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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
        <View style={styles.modalContainer}>
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
                  <Text 
                    style={[
                      styles.modalItemText,
                      vehicleTypes.includes(item) && styles.selectedItemText
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setVehicleTypesModalVisible(false)}
            >
              <Text style={styles.buttonText}>Confirm Selection</Text>
            </TouchableOpacity>
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select RTO Office</Text>
            <FlatList
              data={rtoOffices}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setPreferredRTO(item);
                    setRtoModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setRtoModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Driving School</Text>
            <FlatList
              data={drivingSchools}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setDrivingSchool(item);
                    setSchoolModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSchoolModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 16,
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
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerText: {
    color: '#333',
    fontSize: 16,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
  },
  selectedItemText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
});
export default LicenseDetailsForm;