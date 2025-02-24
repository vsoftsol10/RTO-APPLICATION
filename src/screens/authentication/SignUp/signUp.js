import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ToastAndroid } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constents/colors';
import { CreateAccountWithEmailAndPassWord, SignInAnonymously, SignInWithGoogle } from '../../../utilities/Utilities';
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = "oXZ0mwl-VdHI8AylU";
const EMAILJS_SERVICE_ID = "service_xm2so94";
const EMAILJS_TEMPLATE_ID = "template_bff9mt7";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Retry mechanism for failed attempts
const retry = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        return retry(fn, retries - 1, delay);
    }
};

const sendEmailWithOTP = async (email, otp) => {
    try {
        const templateParams = {
            to_email: email,
            otp: otp,
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );

        console.log('Email sent successfully:', response);
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        throw error;
    }
};

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOTP, setGeneratedOTP] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [passWord, setPassWord] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const generateOTP = () => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(otp);
        return otp;
    };

    const sendOTP = async () => {
        if (!email) {
            setErrors({ email: "Please enter email" });
            setShowErrors(true);
            return;
        }

        if (!isValidEmail(email)) {
            setErrors({ email: "Invalid email format" });
            setShowErrors(true);
            return;
        }

        setLoading(true);
        try {
            const otp = generateOTP();
            // Use retry mechanism for sending email
            await retry(async () => await sendEmailWithOTP(email, otp));
            
            ToastAndroid.show("OTP sent to email", ToastAndroid.SHORT);
            setOtpSent(true);
            setErrors({});
            setShowErrors(false);
        } catch (error) {
            console.error("Failed to send OTP:", error);
            ToastAndroid.show("Failed to send OTP. Please try again.", ToastAndroid.SHORT);
            setErrors({ email: "Failed to send OTP. Please try again." });
            setShowErrors(true);
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = () => {
        if (!otp || otp.length !== 6) {
            setErrors({ otp: "Please enter valid 6-digit OTP" });
            setShowErrors(true);
            return;
        }

        if (otp === generatedOTP) {
            setOtpVerified(true);
            setErrors({});
            setShowErrors(false);
            ToastAndroid.show("Email verified successfully", ToastAndroid.SHORT);
        } else {
            setErrors({ otp: "Invalid OTP" });
            setShowErrors(true);
        }
    };

    const getErrors = (passWord, confirmPassword) => {
        const errors = {};
        
        if (!passWord) {
            errors.password = "Please Enter Password";
        } else if (passWord.length < 8) {
            errors.password = "Password Length must be minimum 8";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Please Enter Password";
        } else if (confirmPassword.length < 8) {
            errors.confirmPassword = "Password Length must be minimum 8";
        } else if (passWord !== confirmPassword) {
            errors.confirmPassword = "Password does not Match";
        }
        
        return errors;
    };

    const handleSubmit = () => {
        if (!otpVerified) {
            setErrors({ general: "Please verify your email first" });
            setShowErrors(true);
            return;
        }

        const errors = getErrors(passWord, confirmPassword);

        if (Object.keys(errors).length > 0) {
            setShowErrors(true);
            setErrors(errors);
        } else {
            setErrors({});
            setShowErrors(false);
            handleSignin();
        }
    };

    const handleSignin = () => {
        CreateAccountWithEmailAndPassWord(email, passWord)
            .then(() => {
                ToastAndroid.show("Account Created", ToastAndroid.SHORT);
                navigation.navigate("Info");
            })
            .catch(error => {
                console.log("Sign-up error:", error);
                if (error.code === "auth/email-already-in-use") {
                    setErrors({ email: "Email already in use" });
                } else {
                    setErrors({ general: "Sign-up failed. Try again." });
                }
                setShowErrors(true);
            });
    };

    const LoginWithIcon = ({ iconName, onPress, buttonTitle }) => {
        return (
            <TouchableOpacity activeOpacity={.7} style={styles.touchButton} onPress={onPress}>
                <Ionic name={iconName} style={styles.lastIcon} />
                <Text style={{ color: colors.transparent, fontSize: 14, opacity: 0.6 }}>{buttonTitle}</Text>
            </TouchableOpacity>
        );
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
                    onPress={() => navigation.navigate("Onboarding")}
                >
                    <Ionic name="chevron-back" style={styles.icon} />
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 60 }}>
                    <View style={styles.TextContainer}>
                        <Text style={styles.welText}>Welcome</Text>
                    </View>
                    <View>
                        {/* Email Input */}
                        <View style={{ width: '100%' }}>
                            <TextInput
                                placeholder='Enter Email'
                                placeholderTextColor={colors.lightText}
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.txtInput}
                                editable={!otpVerified}
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                            {!otpVerified && (
                                <TouchableOpacity
                                    style={[styles.otpButton, loading && styles.disabledButton]}
                                    onPress={sendOTP}
                                    disabled={loading}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.otpButtonText}>
                                        {loading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* OTP Verification */}
                        {otpSent && !otpVerified && (
                            <View style={{ width: '100%', marginTop: 20 }}>
                                <TextInput
                                    placeholder='Enter 6-digit OTP'
                                    placeholderTextColor={colors.lightText}
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    value={otp}
                                    onChangeText={setOtp}
                                    style={styles.txtInput}
                                />
                                {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}

                                <TouchableOpacity
                                    style={styles.verifyButton}
                                    onPress={verifyOTP}
                                >
                                    <Text style={styles.otpButtonText}>Verify OTP</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {otpVerified && (
                            <>
                                <View style={{ width: '100%', marginTop: 20 }}>
                                    <View style={{
                                        flexDirection: "row",
                                        borderRadius: 10,
                                        backgroundColor: colors.white,
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <TextInput
                                            placeholder='Enter Password'
                                            placeholderTextColor={colors.lightText}
                                            secureTextEntry={!hidePassword}
                                            value={passWord}
                                            onChangeText={p => setPassWord(p)}
                                            style={styles.txtInput}
                                        />
                                        {passWord.length >= 1 &&
                                            <TouchableOpacity
                                                activeOpacity={0.9}
                                                onPress={() => setHidePassword(!hidePassword)}
                                                style={{ paddingHorizontal: 10, paddingRight: 15 }}
                                            >
                                                <Ionic name={hidePassword ? "eye-sharp" : "eye-off-sharp"} style={{ fontSize: 20, color: colors.black }} />
                                            </TouchableOpacity>}
                                    </View>
                                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                                </View>

                                <View style={{ width: '100%', marginTop: 20 }}>
                                    <View style={{
                                        flexDirection: "row",
                                        borderRadius: 10,
                                        backgroundColor: colors.white,
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <TextInput
                                            placeholder='Confirm Password'
                                            placeholderTextColor={colors.lightText}
                                            secureTextEntry={!hideConfirmPassword}
                                            value={confirmPassword}
                                            onChangeText={p => setConfirmPassword(p)}
                                            style={styles.txtInput}
                                        />
                                        {confirmPassword.length >= 1 &&
                                            <TouchableOpacity
                                                activeOpacity={0.9}
                                                onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                                                style={{ paddingHorizontal: 10, paddingRight: 15 }}
                                            >
                                                <Ionic name={hideConfirmPassword ? "eye-sharp" : "eye-off-sharp"} style={{ fontSize: 20, color: colors.black }} />
                                            </TouchableOpacity>}
                                    </View>
                                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit}>
                                        <Text style={styles.buttontxt}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>

                    <View style={styles.linearContainer}>
                        <LinearGradient
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            colors={['#00000090', '#00000090', '#ffffff00']}
                            style={styles.lngradient}>
                        </LinearGradient>
                        <Text>  Or Continue with  </Text>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            colors={['#00000090', '#00000090', '#ffffff00']}
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
                            buttonTitle="Google" />
                        <LoginWithIcon
                            iconName="person"
                            onPress={() => SignInAnonymously().then(() => {
                                ToastAndroid.show("Signed In Anonymously", ToastAndroid.SHORT);
                                navigation.navigate("Home");
                            }).catch(error => {
                                console.log(error);
                            })}
                            buttonTitle="Anonymous" />
                    </View>

                    <View style={styles.signInContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{ width: "100%", alignItems: "center" }}
                            onPress={() => navigation.navigate("LogIn")}
                        >
                            <Text>Already a member?
                                <Text style={{ fontWeight: "700", color: colors.accent }}>  Sign In </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 60, width: "100%", backgroundColor: colors.transparent }}>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

export default SignUp;

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
    },
    errorText: {
      color: "red",
      fontSize: 14,
      marginTop: 5
  },
  otpButton: {
      backgroundColor: colors.accent,
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
      alignItems: 'center'
  },
  verifyButton: {
      backgroundColor: colors.accent,
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
      alignItems: 'center'
  },
  otpButtonText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '600'
  }
})