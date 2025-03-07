import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constents/colors';

const  EditProfile=({navigation})=> {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [mobileNo,setMobileNo]=useState("");
    const [dob,setDob]=useState("");
    const [pincode,setPincode]=useState("");
    const [country,setCountry]=useState("");
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
                    style={styles.iconcontainer}
                    // onPress={navigation.navigate("Profile")}
                >
                    <Ionic name="chevron-back" style={styles.icon}/>
                </TouchableOpacity>

                <Text style={styles.title}>Edit Profile</Text>
                <View style={styles.inputContainer}>
                    <View>

                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={colors.lightText}
                        value={name}
                        onChange={txt=>setName(name)}
                        style={styles.textInput}
                    />
                    </View>
                    
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={colors.lightText}
                        value={name}
                        onChange={txt=>setName(name)}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={colors.lightText}
                        value={name}
                        onChange={txt=>setName(name)}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={colors.lightText}
                        value={name}
                        onChange={txt=>setName(name)}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={colors.lightText}
                        value={name}
                        onChange={txt=>setName(name)}
                        style={styles.textInput}
                    />
                </View>
            </LinearGradient>
    </View>
  )
}
export default EditProfile;
const styles = StyleSheet.create({
    linearGradient:{
        width:"100%",
        height:"100%",

    },
    title:{
        fontSize:24,
        fontWeight:"600",
        marginTop:100,
        textAlign:"center",
        letterSpacing:1
    },
    icon:{
        fontSize:20,
        color:colors.black 
    },
    iconcontainer:{
        backgroundColor:colors.white,
        aspectRatio:1/1,
        borderRadius:"50%",
        elevation:3, 
        width:40,
        marginTop:50,
        position:"absolute",
        zIndex:1,
        top:20,
        left:10,
        alignItems:"center",
        justifyContent:"center"

    },
    inputContainer:{
        backgroundColor:colors.white,
        alignItems:"center",
        justifyContent:"center",

    },
    textInput:{
        alignItems:"center",
        marginBottom:20
    },
})