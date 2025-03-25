import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constents/colors';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";


const  EditProfile=({navigation})=> {
    const [name,setName]=useState("");
    const [mobileNo,setMobileNo]=useState("");
    const [dob,setDob]=useState("");
    const [pincode,setPincode]=useState("");
    const [country,setCountry]=useState("");
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
    fetchUser()
    },[])
    const fetchUser= async()=>{
        try{
            setLoading(true);
            const currentUser=auth().currentUser;

            if(currentUser){
                const userDoc=await firestore().collection('users').doc(currentUser.uid).get();

                if(userDoc.exists){
                    const userData=userDoc.data();

                    setName(userData.name || "");
                    setMobileNo(userData.mobileNo || "");
                    setDob(userData.dob || "");
                    setPincode(userData.pincode || "");
                    setCountry(userData.country || "");
                }
            }
        }catch (error){
            console.error("Error fetching user data:",error);
            Alert.alert("Error", "Failed to load profile data")
        }finally{
            setLoading(false);
        }
    }

    const handleBack=()=>{
        navigation.navigate("Profile")
    }

    const handleSubmit= async ()=>{
        try{
            setLoading(true);
            const currentUser=auth().currentUser;

            if(currentUser){
                await firestore()
                .collection('users')
                .doc(currentUser.uid)
                .update({
                    name,
                    mobileNo,
                    dob,
                    pincode,
                    country,
                    updatedAt:firestore.FieldValue.serverTimestamp()
                })
            }
            Alert.alert("Success","Profile updated Successfully!");
            navigation.navigate("Profile")
        }
        catch(error){
            console.log("Error updating user data :",error);
            Alert.alert("Error","Failed to update profile data")
        }finally{
            setLoading(false);
        }
    }
  return (
    <View style={styles.mainContainer}>
        {/* <LinearGradient
                colors={[
                    colors.bgLineGradeOne,
                    colors.bgLineGradeTwo,
                    colors.bgLineGradeThree,
                    colors.bgLineGradeFour,
                    colors.bgLineGradeFive,
                    colors.bgLineGradeSix,
                ]}
                style={styles.linearGradient}
            > */}
            <ImageBackground
                source={require('../../../../assets/Edit-page.png')} 
                style={styles.backgroundImage} 
                resizeMode="cover"
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.iconcontainer}
                    onPress={handleBack}
                >
                    <Ionic name="chevron-back" style={styles.icon}/>
                </TouchableOpacity>

                <Text style={styles.title}>Edit Profile</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.textContainer}>

                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={colors.lightText}
                        value={name}
                        onChangeText={txt=>setName(txt)}
                        style={styles.textInput}
                    />
                    <Ionic name="person" style={{fontSize:16,color:"#35cad1",paddingHorizontal:20}}/>
                    </View>

                    <View style={styles.textContainer}>

                    <TextInput
                        placeholder='Mobile No.'
                        placeholderTextColor={colors.lightText}
                        value={mobileNo}
                        onChangeText={mob=>setMobileNo(mob)}
                        style={styles.textInput}
                    />
                    <Ionic name="call" style={{fontSize:16,color:"#35cad1",paddingHorizontal:20}}/>
                    </View>

                    <View style={styles.textContainer}>

                    <TextInput
                        placeholder='Date Of Birth'
                        placeholderTextColor={colors.lightText}
                        value={dob}
                        onChangeText={date=>setDob(date)}
                        style={styles.textInput}
                    />
                    <Ionic name="calendar" style={{fontSize:16,color:"#35cad1",paddingHorizontal:20}}/>
                    </View>

                    <View style={styles.textContainer}>

                    <TextInput
                        placeholder='Pincode'
                        placeholderTextColor={colors.lightText}
                        value={pincode}
                        onChangeText={pin=>setPincode(pin)}
                        style={styles.textInput}
                    />
                    <Ionic name="location" style={{fontSize:16,color:"#35cad1",paddingHorizontal:20}}/>
                    </View>

                    <View style={styles.textContainer}>

                    <TextInput
                        placeholder='Country' 
                        placeholderTextColor={colors.lightText}
                        value={country}
                        onChangeText={cntry=>setCountry(cntry)}
                        style={styles.textInput}
                    />
                    <Ionic name="flag" style={{fontSize:16,color:"#35cad1",paddingHorizontal:20}}/>
                    </View>  
                </View>
                <View style={styles.btnContainer}>
                        <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit}>
                            <Text style={styles.btnTxt}>Submit</Text>
                        </TouchableOpacity>
                    </View>
            {/* </LinearGradient> */}
    </View>
  )
}
export default EditProfile;
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:"white",
        height:"100%"
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    title:{
        fontSize:32,
        fontWeight:"600",
        marginTop:100,
        textAlign:"center",
        letterSpacing:1,
        color:"#35cad1"
    },
    icon:{
        fontSize:20,
        color:"white" 
    },
    iconcontainer:{
        backgroundColor:"#aeeaed",
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
        marginTop:50,
        alignItems:"center",
        justifyContent:"center",
    },
    textContainer:{
        backgroundColor:colors.white,
        padding:8,
        width:"90%",
        marginBottom:20,
        borderRadius:15,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    textInput:{
        fontSize:16,
        fontWeight:"600",
        letterSpacing:1
    },
    btnContainer:{
        backgroundColor:"#35cad1",
        width:"90%",
        alignItems:"center",
        justifyContent:"center",
        padding:16,
        borderRadius:15,
        flexDirection:"row",
        marginTop:40,
        marginLeft:"5%"
    },
    btnTxt:{
        color:"white",
        fontSize:22,
        fontWeight:"700",
        letterSpacing:2,
    },
})