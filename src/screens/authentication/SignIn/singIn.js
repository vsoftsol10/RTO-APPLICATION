import { View, Text, TouchableOpacity,StyleSheet, ScrollView, TextInput, ToastAndroid } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons"
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constents/colors';
import { SignInWithEmailandPassword } from '../../../utilities/Utilities';


const signUp = ({navigation}) => {
    const [email,setEmail]=useState("");
    const [passWord,setPassWord]=useState("");

    const [hidePassword,setHidePassword]=useState('');

    const [errors,setErrors]=useState({});
    const [showErrors,setShowErrors]=useState(false);

    const getErrors=(email,passWord)=>{
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
      return errors;  
    }
    const handleSubmit=()=>{
      const errors= getErrors(email,passWord);
      if(Object.keys(errors).length>0){
        setErrors(errors);
        setShowErrors(true);
      }
      else{
        setErrors({});
        setShowErrors(false)
        handleSignin(email,passWord)
      } 
    }

    const handleSignin = (email, password) => {
      setShowErrors(false); // Hide errors before signing in
      
      SignInWithEmailandPassword(email, password)
        .then(() => {
          ToastAndroid.show("Logged In", ToastAndroid.SHORT);
          setErrors({}); // Clear errors on successful login
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.log("Sign-In error:", error); // Debugging
    
          if (error.code === "auth/user-not-found") {
            setErrors({ email: "User not found" });
          } else if (error.code === "auth/wrong-password") {
            setErrors({ password: "Incorrect password" });
          } else {
            setErrors({ general: "Sign-In failed. Try again." });
          }
    
          setShowErrors(true); // Show errors only if sign-in fails
        });
    };
    
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
            <Text style={styles.welText}>Hello Again</Text>
          
            <Text style={styles.wel1Text}>Welcome back you've been missed</Text>
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
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.6} onPress={handleSubmit}>
                  <Text style={styles.buttontxt}>Login</Text> 
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
          <LoginWithIcon iconName="logo-google" buttonTitle="Google"/>
          <LoginWithIcon iconName="person"  buttonTitle="Anonymous"/>
          </View>
          <View style={styles.signInContainer}> 
          <TouchableOpacity activeOpacity={0.8} style={{width:"100%",alignItems:"center"}}
           onPress={()=>navigation.navigate("Register")}
          >
            <Text >Not a member?
            <Text style={{fontWeight:"700" , color:colors.accent}}>  Register Now </Text></Text>
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
    fontWeight:500,marginBottom:15
  },
  wel1Text:{
    fontSize:18,
    textAlign:'center',
    letterSpacing:1,
    color:colors.black,
    fontWeight:400,
    opacity:0.6
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
   elevation:8,
   backgroundColor:colors.accent,
   color:colors.white
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
    justifyContent:"space-around",
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
