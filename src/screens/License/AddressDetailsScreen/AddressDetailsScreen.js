import React, { useState } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Ionic from "react-native-vector-icons/Ionicons";


const AddressDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { personalDetails } = route.params || {};
  
  // Form state
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  // Form validation state
  const [errors, setErrors] = useState({});

  // Sample data for pickers
  const districts = [
    'Ariyalur', 
    'Chengalpattu', 
    'Chennai', 
    'Coimbatore', 
    'Cuddalore',
    'Dharmapuri', 
    'Dindigul', 
    'Erode', 
    'Kallakurichi', 
    'Kancheepuram',
    'Kanyakumari', 
    'Karur', 
    'Krishnagiri', 
    'Madurai', 
    'Mayiladuthurai',
    'Nagapattinam', 
    'Namakkal', 
    'Nilgiris', 
    'Perambalur', 
    'Pudukkottai',
    'Ramanathapuram', 
    'Ranipet', 
    'Salem', 
    'Sivaganga', 
    'Tenkasi',
    'Thanjavur', 
    'Theni', 
    'Thoothukudi', 
    'Tiruchirappalli', 
    'Tirunelveli',
    'Tirupathur', 
    'Tiruppur', 
    'Tiruvallur', 
    'Tiruvannamalai', 
    'Tiruvarur',
    'Vellore', 
    'Viluppuram', 
    'Virudhunagar', 
  

  ];
  
  const states = [
    'Andhra Pradesh', 
    'Arunachal Pradesh', 
    'Assam', 
    'Bihar', 
    'Chhattisgarh',
    'Goa', 
    'Gujarat', 
    'Haryana', 
    'Himachal Pradesh', 
    'Jharkhand', 
    'Karnataka', 
    'Kerala', 
    'Madhya Pradesh', 
    'Maharashtra', 
    'Manipur', 
    'Meghalaya', 
    'Mizoram', 
    'Nagaland', 
    'Odisha', 
    'Punjab', 
    'Rajasthan', 
    'Sikkim', 
    'Tamil Nadu', 
    'Telangana', 
    'Tripura', 
    'Uttar Pradesh', 
    'Uttarakhand', 
    'West Bengal'
  ];

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    
    if (!street.trim()) newErrors.street = 'Street/Area is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!district) newErrors.district = 'Please select a district';
    if (!state) newErrors.state = 'Please select a state';
    
    if (!pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Create address details object
      const addressDetails = {
        street,
        city,
        district,
        state,
        pincode
      };
      
      // Combine with personal details and navigate to next screen
      const completeDetails = {
        ...personalDetails,
        address: addressDetails
      };
      
      // Navigate to next screen with combined data
      navigation.navigate('AdditionalInfo', { completeDetails });
      
      // You can also save to redux/context state here
      console.log('Address form submitted:', addressDetails);
    }
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
            onPress={() => navigation.navigate("DL")}>
            <Ionic name="chevron-back"
                style={styles.icon}
            />
        </TouchableOpacity> 
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Apply for License</Text>
            <Text style={styles.subHeaderText}>Address Details</Text>
          </View>
          
          <View style={styles.formContainer}>
            {/* Street/Area */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Street/Area</Text>
              <TextInput
                style={[styles.input, errors.street && styles.inputError]}
                placeholder="Enter your street/area"
                value={street}
                onChangeText={setStreet}
              />
              {errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
            </View>
            
            {/* City */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={[styles.input, errors.city && styles.inputError]}
                placeholder="Enter your city"
                value={city}
                onChangeText={setCity}
              />
              {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
            </View>
            
            {/* District */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>District</Text>
              <View style={[styles.pickerContainer, errors.district && styles.inputError]}>
                <Picker
                  selectedValue={district}
                  onValueChange={(itemValue) => setDistrict(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select District" value="" />
                  {districts.map((item, index) => (
                    <Picker.Item key={index} label={item} value={item} />
                  ))}
                </Picker>
              </View>
              {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}
            </View>
            
            {/* State */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>State</Text>
              <View style={[styles.pickerContainer, errors.state && styles.inputError]}>
                <Picker
                  selectedValue={state}
                  onValueChange={(itemValue) => setState(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select State" value="" />
                  {states.map((item, index) => (
                    <Picker.Item key={index} label={item} value={item} />
                  ))}
                </Picker>
              </View>
              {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
            </View>
            
            {/* Pincode */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={[styles.input, errors.pincode && styles.inputError]}
                placeholder="Enter your 6-digit pincode"
                value={pincode}
                onChangeText={setPincode}
                keyboardType="number-pad"
                maxLength={6}
              />
              {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
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
  }
});

export default AddressDetailsScreen;