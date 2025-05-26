import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionic from "react-native-vector-icons/Ionicons";
import colors from '../../../constents/colors';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore'
import auth from "@react-native-firebase/auth"

const InfoScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState("India");
  const [date, setDate] = useState(new Date());
  const [dob, setDob] = useState('');
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const getErrors = (name, mobileNo, date, pincode) => {
    const errors = {}
    if (!name) {
      errors.name = "Name is Required";
    } else if (name.length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    if (!mobileNo) {
      errors.mobileNo = "Mobile Number is required";
    }
    else if (!/^\d{10}$/.test(mobileNo)) {
      errors.mobileNo = "Enter Valid 10-digit mobile number"
    }
    if (!date) {
      errors.date = "Date of Birth is required";
    }
    if (!pincode) {
      errors.pincode = "Pincode is required";
    }
    else if (!/^\d{6}$/.test(pincode)) {
      errors.pincode = "Enter valid 6-digit pincode"
    }
    return errors;
  }

  const handleSubmit = async () => {
    const errors = getErrors(name, mobileNo, date, pincode);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setShowErrors(true);
      return;
    }
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'No authenticated user found');
        return;
      }
      await firestore().collection('users').doc(currentUser.uid).set({
        name,
        mobileNo,
        dob,
        pincode,
        country,
        userId: currentUser.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp()
      });
      setErrors({});
      setShowErrors(false);
      Alert.alert(
        "Success",
        "Your information has been saved successfully!",
        [
          {
            text: 'OK',
            onPress: () => {
              console.log("OK button pressed");
              console.log(navigation); // Debugging
              setTimeout(() => navigation.navigate("Home"), 100);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
  
  const handleCalendarClick = () => {
    setOpen(true);
  };

  const handleConfirm = (selectedDate) => {
    setOpen(false);
    setDate(selectedDate);
    // Format the date as MM/DD/YYYY
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    setDob(formattedDate);
  };
  
  const handleBack = () => {
    try {
      navigation.navigate("Register");
    } catch (error) {
      console.log("Navigation error:", error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* <ImageBackground
        source={require('../../../../assets/Edit-page.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      /> */}
      
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.iconcontainer}
        onPress={handleBack}
      >
        <Ionic name="chevron-back" style={styles.icon} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Enter Your Details</Text>
        
        <View style={styles.inputContainer}>
          {/* Name Input */}
          <View style={styles.textContainer}>
            <TextInput
              placeholder='Name'
              placeholderTextColor={colors.lightText}
              value={name}
              onChangeText={txt => setName(txt)}
              style={styles.textInput}
            />
            <Ionic name="person" style={{ fontSize: 16, color: "#35cad1", paddingHorizontal: 20 }} />
          </View>
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          {/* Mobile Input */}
          <View style={styles.textContainer}>
            <TextInput
              placeholder='Mobile No.'
              placeholderTextColor={colors.lightText}
              value={mobileNo}
              keyboardType='numeric'
              onChangeText={txt => setMobileNo(txt)}
              style={styles.textInput}
            />
            <Ionic name="call" style={{ fontSize: 16, color: "#35cad1", paddingHorizontal: 20 }} />
          </View>
          {errors.mobileNo && <Text style={styles.errorText}>{errors.mobileNo}</Text>}

          {/* DOB Input */}
          <View style={styles.textContainer}>
            <TextInput
              placeholder='Date of Birth'
              placeholderTextColor={colors.lightText}
              value={dob}
              onChangeText={date => setDob(date)}
              style={styles.textInput}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={handleCalendarClick}>
              <Ionic name="calendar" style={{ fontSize: 16, color: "#35cad1", paddingHorizontal: 20 }} />
            </TouchableOpacity>
          </View>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={handleConfirm}
            onCancel={() => setOpen(false)}
            maximumDate={new Date()} // Prevents future dates
            minimumDate={new Date(1900, 0, 1)} // Reasonable minimum date
          />

          {/* Pincode Input */}
          <View style={styles.textContainer}>
            <TextInput
              placeholder='Pincode'
              placeholderTextColor={colors.lightText}
              value={pincode}
              onChangeText={number => setPincode(number)}
              style={styles.textInput}
            />
            <Ionic name="location" style={{ fontSize: 16, color: "#35cad1", paddingHorizontal: 20 }} />
          </View>
          {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

          {/* Country Input */}
          <View style={styles.textContainer}>
            <TextInput
              placeholder='Country'
              placeholderTextColor={colors.lightText}
              value={country}
              onChangeText={txt => setCountry(txt)}
              style={styles.textInput}
            />
            <Ionic name="flag" style={{ fontSize: 16, color: "#35cad1", paddingHorizontal: 20 }} />
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleSubmit()}>
            <Text style={styles.btnTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default InfoScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    height: "110%"
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginTop: 120,
    textAlign: "center",
    letterSpacing: 1,
    color: "#35cad1"
  },
  icon: {
    fontSize: 20,
    color: "white"
  },
  iconcontainer: {
    backgroundColor: "#aeeaed",
    aspectRatio: 1/1,
    borderRadius: 50,
    elevation: 3,
    width: 40,
    marginTop: 50,
    position: "absolute",
    zIndex: 1,
    top: 20,
    left: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: colors.white,
    padding: 8,
    width: "90%",
    marginBottom: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  textInput: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 15,
    width: "90%",
    paddingLeft: 10
  },
  btnContainer: {
    backgroundColor: "#35cad1",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 15,
    flexDirection: "row",
    marginTop: 40,
    marginLeft: "5%",
    marginBottom: 30
  },
  btnTxt: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 2,
  },
})