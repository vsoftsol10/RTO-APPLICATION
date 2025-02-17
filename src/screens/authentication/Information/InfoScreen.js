import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Ionic from "react-native-vector-icons/Ionicons";
import colors from '../../../constents/colors';
import DatePicker from 'react-native-date-picker';


const InfoScreen=({navigation})=> {
const[name,setName]=useState("");
const[mobileNo,setMobileNo]=useState('');
const[pincode,setPincode]=useState('');
const[country,setCountry]=useState("India");
const [date, setDate] = useState(new Date());
const [dob, setDob] = useState('');
const [open, setOpen] = useState(false);
const [errors,setErrors]=useState({});
const [showErrors,setShowErrors]=useState(false);
const getErrors=(name,mobileNo,date,pincode)=>{
  const errors={}
  if(!name){
    errors.name="Please Enter Your Name";
  }
  if(!mobileNo){
    errors.mobileNo="Please Enter Your Mobile No."
  }
  if(!date){
    errors.date="This field is Mandatory"
  }
  if(!pincode){
    errors.pincode="This field is Mandatory"
  }
  return errors;
  
} 
const handleSubmit=()=>{
  const errors= getErrors(name,mobileNo,date,pincode);
      if(Object.keys(errors).length>0){
        setErrors(errors);
        setShowErrors(true);
      }
      else{
        setErrors({});
        setShowErrors(false)
        navigation.navigate("Home");
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

  return (
    <View>
        <LinearGradient
        colors={[
          colors.bgLineGradeOne,
          colors.bgLineGradeTwo,
          colors.bgLineGradeThree,
          colors.bgLineGradeFour,
          colors.bgLineGradeFive,
          colors.bgLineGradeSix,
        ]}
        style={styles.linearGradient}
      >
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconstyle}
            onPress={()=>navigation.goBack()}>
            <Ionic name="chevron-back"
            style={styles.icon}/>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop:60}}> 
          <View style={styles.TextContainer}>
            <Text style={styles.welText}>Enter Your Details</Text>
          </View>
          <View style={styles.formContainer}>
            {/* Name Input */}
            <View style={{width:'100%',marginTop:0}}> 
              <View 
              style={{flexDirection:"row",
                borderRadius:10,
                backgroundColor:colors.white,
                alignItems:"center",
                justifyContent:"space-between"}}>
                    <TextInput
                     placeholder='Name'
                     placeholderTextColor={colors.lightText}
                     value={name}
                     onChangeText={txt => setName(txt)}
                     style={styles.txtInput}
                    />
                <Ionic name="person" style={{fontSize:18,color:"#7A3c6D",paddingHorizontal:15}}/>
                </View>    
                {errors.name && <Text style={{ color: "red", fontSize: 14 }}>{errors.name}</Text>} 
                </View>
            {/* Mobile Input */}
            <View style={{width:'100%',marginTop:20}}>    
              <View
                style={{flexDirection:"row",
                        borderRadius:10,
                        backgroundColor:colors.white,
                        alignItems:"center",
                        justifyContent:"space-between"}}>
                    <TextInput
                     placeholder='Mobile No.'
                     placeholderTextColor={colors.lightText}
                     value={mobileNo}
                     keyboardType='numeric'
                     onChangeText={txt => setMobileNo(txt)}
                     style={styles.txtInput}
                    />
                <Ionic name="call" style={{fontSize:18,color:"#7A3c6D" ,paddingHorizontal:15}}/>
                </View>  
                {errors.mobileNo && <Text style={{ color: "red", fontSize: 14 }}>{errors.mobileNo}</Text>}
                </View>
            {/*DOB Input */}
            <View style={{width:'100%',marginTop:20}}>  
              <View 
              style={{flexDirection:"row",
                      borderRadius:10,
                      backgroundColor:colors.white,
                      alignItems:"center",
                      justifyContent:"space-between"}}>
                 <TextInput
                     placeholder='Date of Birth'
                     placeholderTextColor={colors.lightText}
                     value={dob}
                     onChangeText={date => setDob(date)}
                     style={styles.txtInput}
                    />
                  <TouchableOpacity activeOpacity={0.8} onPress={handleCalendarClick}>
                    <Ionic name="calendar" style={{fontSize:18,color:colors.purple,paddingHorizontal:15}}/>
                  </TouchableOpacity>
                </View>    
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
                {errors.date && <Text style={{ color: "red", fontSize: 14 }}>{errors.date}</Text>}
            </View>
            {/*Pincode Input */}
            <View style={{width:'100%',marginTop:20}}>     
              <View
              style={{flexDirection:"row",
                borderRadius:10,
                backgroundColor:colors.white,
                alignItems:"center",
                justifyContent:"space-between"}}>
                 <TextInput
                     placeholder='Pincode'
                     placeholderTextColor={colors.lightText}
                     value={pincode}
                     onChangeText={number => setPincode(number)}
                     style={styles.txtInput}
                    />
                <Ionic name="location" style={{fontSize:18,color:"#7A3c6D",paddingHorizontal:15}}/>
                </View> 
                {errors.pincode && <Text style={{ color: "red", fontSize: 14 }}>{errors.pincode}</Text>}
            </View>
            {/*Country Input */}
            
            <View style={{width:'100%',marginTop:20}}>  
              <View
              style={{flexDirection:"row",
                borderRadius:10,
                backgroundColor:colors.white,
                alignItems:"center",
                justifyContent:"space-between"}}>
                 <TextInput
                     placeholder='Country'
                     placeholderTextColor={colors.lightText}
                     value={country}
                     onChangeText={txt => setCountry(txt)}
                     style={styles.txtInput}
                    />
                  <Ionic name="flag" style={{fontSize:18,color:"#7A3c6D",paddingHorizontal:15}} />
                </View>    
            </View>
            {/* Submit Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>handleSubmit()} >
                  <Text style={styles.buttontxt}>Submit</Text>
                </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      
    </View>
  )
}
export default InfoScreen;
const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16
},
  icon:{
    fontSize:20,
    color:colors.black
  },
  iconstyle:{
    backgroundColor:colors.white,
    width:40,
    aspectRatio:1/1,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100,
    elevation:3,
    position:'absolute',
    top:20,
    left:20,
    zIndex:1
  },
  TextContainer:{
    marginTop:60,
    marginVertical:20,
    marginBottom:80,
  },
  welText:{
    fontSize:30,
    textAlign:'center',
    letterSpacing:2,
    color:colors.black,
    fontWeight:500
  },
  txtInput:{
    paddingVertical:10,
    paddingHorizontal:20,
    fontSize:14,
    color:colors.black,
    fontWeight:"600",
    letterSpacing:0.5,
    borderRadius:10,
    backgroundColor:colors.white,
    padding:4,
    
  },
  buttonContainer:{
    justifyContent:'center',
    alignItems:"center",
    marginTop:40,
    backgroundColor:"#7A3c6D",
    paddingVertical:12,
    paddingHorizontal:10,
    borderRadius:10,
    marginHorizontal:100,
    elevation:8
   },
   buttontxt:{
     fontSize:16,
     color:colors.white,
     letterSpacing:1,
   },
})