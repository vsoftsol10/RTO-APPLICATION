import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons"
import LinearGradient from 'react-native-linear-gradient';
import auth, { firebase } from "@react-native-firebase/auth";
import React, { useEffect, useState } from 'react';
import firestore from "@react-native-firebase/firestore";
import colors from '../../../constents/colors';
import { SignOutUser } from '../../../utilities/Utilities';

const Profile = ({navigation}) => {
    const[userName,setUserName]=useState('');
    const[dob,setDob]=useState('');
    const[mobileNo,setMobileNo]=useState('');
    const[pincode,setPincode]=useState('');
    const[country,setContry]=useState('');
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const currentUser=auth().currentUser;
                if(!currentUser){
                    console.log("No authenticated user");
                    return;
                }
                const userDoc=await firestore ().collection("users").doc(currentUser.uid).get();
                if(userDoc.exists){
                    setUserName(userDoc.data().name);
                    setDob(userDoc.data().dob);
                    setMobileNo(userDoc.data().mobileNo)
                    setPincode(userDoc.data().pincode)
                    setContry(userDoc.data().country)
                }else{
                    console.log("User Not Found")
                }
            }
            catch (error){
                console.error("Error fetching data",error)
            }
        }
        fetchUser()
    },[]);
    const handleEdit=()=>{
        console.log("navigation",navigation)
        navigation.navigate("Edit_Profile")
    }
    const handleLogout=()=>{
        SignOutUser();
        navigation.navigate("Onboarding")
    }
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
                    onPress={() => navigation.navigate("Home")}>
                    <Ionic name="chevron-back"
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <View>

                    <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "700", marginTop: 100 }}>Profile</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.textcontainer}>
                        <Text style={styles.text}>{userName}</Text>
                        <Ionic name="person" style={{fontSize:18,color:"#7A3c6D",paddingHorizontal:15}} />
                    </View>
                    <View style={styles.textcontainer}>
                        <Text style={styles.text}> {mobileNo}</Text>       
                        <Ionic name="call" style={{fontSize:18,color:"#7A3c6D",paddingHorizontal:15}} />             
                    </View>
                    <View style={styles.textcontainer}>
                        <Text style={styles.text}>{dob}</Text>
                        <Ionic name="calendar" style={{fontSize:18,color:"#7A3c6D",paddingHorizontal:15}} />
                    </View>
                    <View style={styles.textcontainer}>
                        <Text style={styles.text}>{pincode}</Text>
                        <Ionic name="location" style={{fontSize:18,color:"#7A3c6D",paddingHorizontal:15}} />
                    </View>
                    <View style={styles.textcontainer}>
                        <Text style={styles.text}>{country}</Text>
                        <Ionic name="flag" style={{fontSize:18,color:"#7A3c6D",paddingHorizontal:15}} />
                    </View>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity activeOpacity={0.8} onPress={handleEdit}>

                    <View style={styles.editContainer}>
                        <Text style={styles.editText}> Edit Profile </Text>
                        <Ionic name="pencil" style={{fontSize:20 , color:colors.white,paddingHorizontal:15} }/>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={handleLogout}>
                        <View style={styles.logoutContainer}>
                            <Text style={styles.logoutText}>
                                Logout
                            </Text>
                            <Ionic name="exit" style={{fontSize:20 , color:colors.white,paddingHorizontal:15} }/>
                        </View>

                    </TouchableOpacity>
                </View>

            </LinearGradient>
        </View>
    )
}
export default Profile;
const styles = StyleSheet.create({
    linearGradient:{
        width:"100%",
        height:"100%",
        padding: 4,

    },
    icon:{
        fontSize:20,
        color:colors.black,
    },
    iconstyle:{
        backgroundColor:colors.white,
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
    container:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:100
    },
    textcontainer:{
        backgroundColor:colors.white,
        padding:20,
        width:"90%",
        marginBottom:10,
        borderRadius:15,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    text:{
        fontSize:16,
        fontWeight:"600",
        letterSpacing:1
    },
    editContainer:{
        backgroundColor:colors.purple,
        width:"90%",
        alignItems:"center",
        justifyContent:"space-between",
        padding:20,
        borderRadius:15,
        flexDirection:"row",
        marginBottom:10

    },
    editText:{
        fontSize:18,
        fontWeight:"600",
        color:colors.white,
        letterSpacing:2,
    },
    logoutContainer:{
        backgroundColor:colors.purple,
        width:365,
        alignItems:"center",
        justifyContent:"space-between",
        padding:20,
        borderRadius:15,
        flexDirection:"row",
    },
    logoutText:{
        color:colors.white,
        fontSize:18,
        fontWeight:"600",
        letterSpacing:2
    }
})