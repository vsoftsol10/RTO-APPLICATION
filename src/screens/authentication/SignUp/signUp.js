import { View, Text, TouchableOpacity,StyleSheet, ScrollView, TextInput } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons"
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constents/colors';


const signUp = ({navigation}) => {
    const [email,setEmail]=useState("");
    const [passWord,setPassWord]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
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
            style={styles.icon}
          />
        </TouchableOpacity>
        <ScrollView style={{paddingTop:60}}>
            <View style={styles.TextContainer}>
                <Text style={styles.welText}>Welcome</Text>
            </View>
            <View >
                <View style={{width:'100%'}}>      
                    <TextInput
                     placeholder='Enter an email'
                     placeholderTextColor={colors.lightText}
                     keyboardType="email-address"
                     value={email}
                     onChangeText={e => setEmail(e)}
                     style={styles.txtInput}
                    />
                </View>
                <View style={{width:'100%',marginTop: 20, }}>      
                    <TextInput
                     placeholder='Enter a Password'
                     placeholderTextColor={colors.lightText}
                     keyboardType="visible-password"
                     value={passWord}
                     onChangeText={e => setPassWord(e)}
                     style={styles.txtInput}
                    />
                </View>
                <View style={{width:'100%',marginTop: 20, }}>      
                    <TextInput
                     placeholder='Confirm Password'
                     placeholderTextColor={colors.lightText}
                     keyboardType="visible-password"
                     value={confirmPassword}
                     onChangeText={e => setConfirmPassword(e)}
                     style={styles.txtInput}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.8} >
                       <Text style={styles.buttontxt}>Register</Text> 
                    </TouchableOpacity>
                </View>
                
            </View>
        </ScrollView>
      </LinearGradient>
      </View>
  )
}

export default signUp

const styles=StyleSheet.create({
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
      borderRadius:10,
      backgroundColor:colors.white,
      padding:4
    },
    buttonContainer:{
     justifyContent:'center',
     alignItems:"center",
     marginTop:20,
     backgroundColor:colors.white,
     paddingVertical:12,
     paddingHorizontal:16,
     borderRadius:10,
     marginHorizontal:100,
     elevation:8
    },
    buttontxt:{
      fontSize:16,
      color:colors.black,
      letterSpacing:1,
    },
    lngradient:{
      flex:1,
      padding:1.4,
      borderRadius:100
    },
    linearContainer:{
      flexDirection:"row",
      alignItems:'center',
      justifyContent:"center",
      marginVertical:30
    },
    linearText:{
      fontSize:14,
      opacity:0.4,
      color:colors.lightText,
      marginHorizontal:18
    },
    login:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-evenly",
      marginTop:20,
      marginBottom:40

    },
    touchButton:{
      width:'40%',
      paddingVertical:12,
      paddingHorizontal:24,
      backgroundColor:colors.transparent,
      borderWidth:2,
      borderColor:colors.white,
      borderRadius:10,
      alignItems:'center',
      justifyContent:"center"

    },
    lastIcon:{
      fontSize:26,
      color:colors.black,
      marginBottom:5

    },
    signInContainer:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center"
    }
})