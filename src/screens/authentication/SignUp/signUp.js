import { View, Text, TouchableOpacity,StyleSheet, ScrollView, TextInput, ToastAndroid } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons"
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constents/colors';
import { CreateAccountWithEmailAndPassWord, SignInAnonymously, SignInWithGoogle } from '../../../utilities/Utilities';
import { signInAnonymously } from '@react-native-firebase/auth';

const signUp = ({navigation}) => {
    const [email,setEmail]=useState("");
    const [passWord,setPassWord]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const [hidePassword,setHidePassword]=useState(false);
    const [hideConfirmPassword,setHideConfirmPassword]=useState(false);

    const [errors,setErrors]=useState({});
    const [showErrors,setShowErrors]=useState(false);

    const getErrors=(email,passWord,confirmPassword)=>{
      const errors={}
      if(!email){
        errors.email="Please Enter Email"
      }
      else if(!email.includes("@")||!email.includes(".com")){
        errors.email="Enter a Valid Email"
      }

      if(!passWord){
        errors.password="Please Enter Password "
      }
      else if(passWord.length<8){
        errors.password="Password Length must be minimum 8"
      }

      if(!confirmPassword){
        errors.confirmPassword="Please Enter Password "
      }
      else if(confirmPassword.length<8 ){
        errors.confirmPassword="Password Length must be minimum 8"
      }
      else if( passWord !==confirmPassword){
        errors.confirmPassword="Passwrod does not Match"
      }
      
        return errors;
      
    }
    const handlesubmit = () => {
      const errors=getErrors(email,passWord,confirmPassword);

      if(Object.keys(errors).length>0){
        setShowErrors(true);
        setErrors(showErrors&&errors)
        console.log(errors);
      }
      else{
        setErrors({})
        setShowErrors(false)
        handleSignin(email,passWord)
      }
    };

    const handleSignin= (email,password)=>{
      CreateAccountWithEmailAndPassWord(email,password)
      .then(()=>{
        ToastAndroid.show("Account Created",ToastAndroid.SHORT);
        navigation.navigate("InfoScreen");
      })
      .catch(error=>{
        console.log("Sign-up error:", error); // Debugging
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "Email already in use" });
      } else if (error.code === "auth/invalid-email") {
        setErrors({ password: "Email is Invalid" });
      } else {
        setErrors({ general: "Sign-up failed. Try again." });
      }
      setEmail({})
      setShowErrors(false)
    });
  }
    const LoginWithIcon=({iconName,onPress,buttonTitle})=>{
      return(
        <TouchableOpacity activeOpacity={.7} style={styles.touchButton} onPress={onPress}>
          <Ionic name={iconName} style={styles.lastIcon}/>
          <Text style={{color:colors.transparent,fontSize:14,opacity:0.6}}>{buttonTitle}</Text>
        </TouchableOpacity>
        
      )
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
            style={styles.icon}
          />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop:60}}>
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
                {errors.email && <Text style={{ color: "red", fontSize: 14 }}>{errors.email}</Text>}

                <View style={{width:'100%',marginTop: 20, }}>      
                <View 
                style={{ 
                 flexDirection:"row",
                 borderRadius:10,
                 backgroundColor:colors.white,
                 alignItems:"center",
                 justifyContent:"space-between"
                  }}>
                <TextInput
                  placeholder='Enter Password'
                  placeholderTextColor={colors.lightText}
                  secureTextEntry={hidePassword?false:true}
                  value={passWord}
                  onChangeText={p => setPassWord(p)}
                  style={styles.txtInput}
                />
               {passWord.length>=1 && 
                  <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={()=>setHidePassword(!hidePassword)}
                    style={{paddingHorizontal:10,paddingRight:15}}
                  >
                    <Ionic name={hidePassword? "eye-sharp": "eye-off-sharp"} style={{fontSize:20,color:colors.black}}/>
                  </TouchableOpacity>}

                </View>
                {errors.password && <Text style={{ color: "red", fontSize: 14 }}>{errors.password}</Text>}
                </View>
                
                <View style={{width:'100%',marginTop: 20, }}>      
                <View 
                style={{ 
                 flexDirection:"row",
                 borderRadius:10,
                 backgroundColor:colors.white,
                 alignItems:"center",
                 justifyContent:"space-between"
                  }}>
                <TextInput
                  placeholder='Confirm Password'
                  placeholderTextColor={colors.lightText}
                  secureTextEntry={hideConfirmPassword?false:true}
                  value={confirmPassword}
                  onChangeText={p => setConfirmPassword(p)}
                  style={styles.txtInput}
                />
               {confirmPassword.length>=1 && 
                  <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={()=>setHideConfirmPassword(!hideConfirmPassword)}
                    style={{paddingHorizontal:10,paddingRight:15}}
                  >
                    <Ionic name={hideConfirmPassword? "eye-sharp": "eye-off-sharp"} style={{fontSize:20,color:colors.black}}/>
                  </TouchableOpacity>} 

                </View>
                {errors.confirmPassword && <Text style={{ color: "red", fontSize: 14 }}>{errors.confirmPassword}</Text>}
                </View>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.8} onPress={handlesubmit}>
                       <Text style={styles.buttontxt}>Register</Text> 
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.linearContainer}>
            <LinearGradient 
            start={{x:1,y:0}}
            end={{x:0.5,y:1}}
            colors={['#00000090','#00000090','#ffffff00']}
            style={styles.lngradient}>
            </LinearGradient>
            <Text>  Or Continue with  </Text>
            <LinearGradient 
            start={{x:0,y:0}}
            colors={['#00000090','#00000090','#ffffff00']}
            style={styles.lngradient}>
            </LinearGradient>

          </View>
          <View style={styles.login}>
          <LoginWithIcon 
              iconName="logo-google" 
              onPress={async () => {
                try {
                  const userCredential = await SignInWithGoogle();
                  if (userCredential) {
                    ToastAndroid.show("Signed In Successfully", ToastAndroid.SHORT);
                    navigation.navigate("Home");
                  }
                } catch (error) {
                  console.error("Google Sign-In Error:", error);
                  ToastAndroid.show("Google Sign-In Failed", ToastAndroid.SHORT);
                }
              }}  
              buttonTitle="Google"/>
          <LoginWithIcon iconName="person" onPress={()=>SignInAnonymously().then(()=>{
            ToastAndroid.show("Signed In Anonymously",ToastAndroid.SHORT)
            navigation.navigate("Home")
          }).catch(error=>{
              console.log(error);
          })} buttonTitle="Anonymous"/>
          </View>
          <View style={styles.signInContainer}> 
          <TouchableOpacity activeOpacity={0.8} style={{width:"100%",alignItems:"center"}}
           onPress={()=>navigation.navigate("LogIn")}

          >
            <Text >Already a member?
            <Text style={{fontWeight:"700" , color:colors.accent}}>  Sign In </Text></Text>
          </TouchableOpacity>
          </View>
          <View style={{height:60,width:"100%",backgroundColor:colors.transparent}}>

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
     backgroundColor:"#7A3c6D",
     paddingVertical:12,
     paddingHorizontal:16,
     borderRadius:10,
     marginHorizontal:100,
     elevation:8
    },
    buttontxt:{
      fontSize:16,
      color:colors.white,
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