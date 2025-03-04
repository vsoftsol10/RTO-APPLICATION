import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ToastAndroid } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constents/colors';
import { CreateAccountWithEmailAndPassWord, SignInAnonymously, SignInWithGoogle } from '../../../utilities/Utilities';
import auth from '@react-native-firebase/auth';
import firestore,{ FieldValue } from '@react-native-firebase/firestore';
import axios from 'axios'; // Add axios for API requests

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

const SignUp = ({ navigation }) => {
    const [userInput, setUserInput] = useState("");
    const [inputType, setInputType] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [passWord, setPassWord] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    
    // Validate input type (email or phone)
    const validateInput = (input) => {
        // Email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Phone regex (simple version)
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        
        if (emailRegex.test(input)) {
            return { type: 'email', value: input };
        } else if (phoneRegex.test(input.replace(/\D/g, ''))) {
            return { type: 'phone', value: input };
        } else {
            return { type: 'invalid', value: input };
        }
    };

    // Format phone number to ensure it has a + prefix
    const formatPhoneNumber = (phoneNumber) => {
        // Remove non-digits except the + at the beginning
        const cleaned = phoneNumber.replace(/[^\d+]/g, '');
        
        // Add + prefix if missing
        if (!cleaned.startsWith('+')) {
            return '+' + cleaned;
        }
        return cleaned;
    };

    // Generate random OTP for email verification
    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    // Store OTP in Firestore for email verification
    const storeOTPForVerification = async (email, otp) => {
        try {
            await firestore().collection('otpVerifications').doc(email).set({
                otp,
                createdAt: firestore.FieldValue.serverTimestamp(),
                verified: false,
                attempts: 0
            });
            return true;
        } catch (error) {
            console.error("Error storing OTP:", error);
            return false;
        }
    };

    // Verify email OTP against Firestore
    const verifyEmailOTP = async (email, otp) => {
        try {
            const otpDoc = await firestore().collection('otpVerifications').doc(email).get();
            
            if (!otpDoc.exists) {
                return { success: false, error: "No OTP request found" };
            }
            
            const otpData = otpDoc.data();
            
            // Check if OTP is expired (10 minutes)
            const createdAt = otpData.createdAt.toDate();
            const now = new Date();
            if ((now - createdAt) > 10 * 60 * 1000) {
                return { success: false, error: "OTP expired" };
            }
            
            // Check if OTP matches
            if (otpData.otp !== otp) {
                // Increment attempts
                await firestore().collection('otpVerifications').doc(email).update({
                    attempts: firestore.FieldValue.increment(1)
                });
                return { success: false, error: "Invalid OTP" };
            }
            
            // Mark as verified
            await firestore().collection('otpVerifications').doc(email).update({
                verified: true
            });
            
            return { success: true };
        } catch (error) {
            console.error("Error verifying email OTP:", error);
            return { success: false, error: "Verification failed" };
        }
    };

    // Send OTP via email using a free email API service
    // Send OTP via email using EmailJS
    const sendEmailOTP = async (email) => {
        // Diagnostic logging for network and API configuration
        console.log('Email OTP Request Details:', {
            email: email,
            timestamp: new Date().toISOString(),
            environment: __DEV__ ? 'Development' : 'Production'
        });
    
        try {
            // Generate a random OTP
            const otp = generateOTP();
            
            // Store OTP in Firestore for later verification
            const stored = await storeOTPForVerification(email, otp);
            
            if (!stored) {
                throw new Error("Failed to store OTP");
            }
            
            // Comprehensive configuration logging
            const emailjsEndpoint = 'https://api.emailjs.com/api/v1.0/email/send';
            const emailjsData = {
                service_id: 'service_k7k3zcj',
                template_id: 'template_a8oemco', 
                user_id: 'tpNU42sxp3WhjZDdz',
                template_params: {
                    to_email: email,
                    otp_code: otp,
                    app_name: 'Urimam'
                }
            };
            
            // Enhanced configuration logging
            console.log('API Request Configuration:', {
                endpoint: emailjsEndpoint,
                serviceId: emailjsData.service_id,
                templateId: emailjsData.template_id,
                templateParams: {
                    ...emailjsData.template_params,
                    otp_code: '[REDACTED]' // Hide actual OTP
                }
            });
    
            // Detailed request configuration
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // Optional: Add additional headers for debugging
                    'X-Debug-Request': 'true'
                },
                // Add timeout to help diagnose network issues
                timeout: 10000 // 10 seconds timeout
            };
            
            try {
                const response = await axios.post(emailjsEndpoint, emailjsData, config);
                
                // Comprehensive response logging
                console.log('API Response Details:', {
                    status: response.status,
                    headers: response.headers,
                    data: response.data
                });
    
                if (response.status === 200) {
                    console.log(`Email OTP sent successfully to ${email}`);
                    
                    // KEEP THIS FOR DEVELOPMENT, REMOVE IN PRODUCTION
                    if (__DEV__) {
                        ToastAndroid.show(`DEV MODE: Your OTP is ${otp}`, ToastAndroid.LONG);
                    }
                    
                    return { success: true, otp };
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            } catch (axiosError) {
                // Detailed error logging for Axios errors
                console.error("Detailed Axios Error:", {
                    message: axiosError.message,
                    code: axiosError.code,
                    status: axiosError.response?.status,
                    data: axiosError.response?.data,
                    headers: axiosError.response?.headers
                });
    
                // Specific error handling for 403 Forbidden
                if (axiosError.response && axiosError.response.status === 403) {
                    console.error("403 Forbidden Error Details:", {
                        url: axiosError.config.url,
                        method: axiosError.config.method,
                        headers: axiosError.config.headers
                    });
                }
    
                throw axiosError;
            }
        } catch (error) {
            // Comprehensive error logging
            console.error("Complete Error Object:", {
                name: error.name,
                message: error.message,
                stack: error.stack,
                code: error.code,
                config: error.config
            });
            
            // FALLBACK FOR DEVELOPMENT - simulate sending
            if (__DEV__) {
                const otp = await firestore().collection('otpVerifications').doc(email).get().then(doc => doc.data().otp);
                ToastAndroid.show(`DEV FALLBACK: Your OTP is ${otp}`, ToastAndroid.LONG);
                return { success: true, otp };
            }
            
            throw error;
        }
    };

    // Send OTP via phone using Firebase Phone Auth
    const sendPhoneOTP = async (phoneNumber) => {
        try {
            // Format phone number (ensure it has a + prefix)
            const formattedPhone = formatPhoneNumber(phoneNumber);
            
            // Use Firebase Phone Auth without explicit recaptcha verifier
            // This will trigger the reCAPTCHA flow automatically
            const phoneConfirmation = await auth().signInWithPhoneNumber(formattedPhone);
            
            return { success: true, confirmation: phoneConfirmation };
        } catch (error) {
            console.error("Error sending phone OTP:", error);
            throw error;
        }
    };

    // Unified OTP sending function
    const sendOTP = async () => {
        if (!userInput) {
            setErrors({ userInput: "Please enter email or phone number" });
            setShowErrors(true);
            return;
        }

        const { type, value } = validateInput(userInput);
        setInputType(type);

        if (type === 'invalid') {
            setErrors({ userInput: "Invalid email or phone number format" });
            setShowErrors(true);
            return;
        }

        setLoading(true);
        try {
            if (type === 'email') {
                // For email - use our custom email OTP function
                const result = await sendEmailOTP(value);
                if (result.success) {
                    ToastAndroid.show("OTP sent to email", ToastAndroid.SHORT);
                }
            } else if (type === 'phone') {
                // For phone - use Firebase phone authentication
                const result = await sendPhoneOTP(value);
                if (result.success) {
                    setConfirmation(result.confirmation);
                    ToastAndroid.show("OTP sent to phone number", ToastAndroid.SHORT);
                }
            }
            
            setOtpSent(true);
            setErrors({});
            setShowErrors(false);
            
        } catch (error) {
            console.error("Failed to send OTP:", error);
            ToastAndroid.show("Failed to send OTP. Please try again.", ToastAndroid.SHORT);
            setErrors({ userInput: "Failed to send OTP. Please try again." });
            setShowErrors(true);
        } finally {
            setLoading(false);
        }
    };

    // Unified OTP verification function
    const verifyOTP = async () => {
        if (!otp || otp.length < 4) {
            setErrors({ otp: "Please enter valid OTP" });
            setShowErrors(true);
            return;
        }

        setLoading(true);
        try {
            if (inputType === 'email') {
                // Verify email OTP against Firestore
                const result = await verifyEmailOTP(userInput, otp);
                
                if (result.success) {
                    setOtpVerified(true);
                    setErrors({});
                    setShowErrors(false);
                    ToastAndroid.show("Email verified successfully", ToastAndroid.SHORT);
                } else {
                    setErrors({ otp: result.error || "Invalid OTP" });
                    setShowErrors(true);
                }
            } else if (inputType === 'phone') {
                // For phone, use Firebase confirmation
                await confirmation.confirm(otp);
                setOtpVerified(true);
                setErrors({});
                setShowErrors(false);
                ToastAndroid.show("Phone number verified successfully", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            setErrors({ otp: "Invalid OTP. Please try again." });
            setShowErrors(true);
        } finally {
            setLoading(false);
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
            setErrors({ general: "Please verify your email or phone first" });
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
        // For phone authentication, the user is already authenticated at this point
        // We just need to update their password
        if (inputType === 'email') {
            CreateAccountWithEmailAndPassWord(userInput, passWord)
                .then(() => {
                    ToastAndroid.show("Account Created", ToastAndroid.SHORT);
                    navigation.navigate("Info");
                })
                .catch(error => {
                    console.log("Sign-up error:", error);
                    if (error.code === "auth/email-already-in-use") {
                        setErrors({ userInput: "Email already in use" });
                    } else {
                        setErrors({ general: "Sign-up failed. Try again." });
                    }
                    setShowErrors(true);
                });
        } else {
            // For phone users, they're already signed in via phone auth
            // We can update their account with a password
            const user = auth().currentUser;
            
            if (user) {
                // Link the phone credential with a password
                const credential = auth.EmailAuthProvider.credential(userInput + '@phone.auth', passWord);
                
                user.linkWithCredential(credential)
                    .then(() => {
                        ToastAndroid.show("Account Created", ToastAndroid.SHORT);
                        navigation.navigate("Info");
                    })
                    .catch(error => {
                        console.log("Account linking error:", error);
                        setErrors({ general: "Account setup failed. Try again." });
                        setShowErrors(true);
                    });
            } else {
                // This shouldn't happen since phone verification already creates a user
                setErrors({ general: "Authentication error. Please try again." });
                setShowErrors(true);
            }
        }
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
                        {/* Email/Phone Input */}
                        <View style={{ width: '100%' }}>
                            <TextInput
                                placeholder='Enter Email or Phone Number'
                                placeholderTextColor={colors.lightText}
                                keyboardType="email-address"
                                value={userInput}
                                onChangeText={setUserInput}
                                style={styles.txtInput}
                                editable={!otpVerified}
                            />
                            {errors.userInput && <Text style={styles.errorText}>{errors.userInput}</Text>}

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
                                    placeholder='Enter OTP'
                                    placeholderTextColor={colors.lightText}
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    value={otp}
                                    onChangeText={setOtp}
                                    style={styles.txtInput}
                                />
                                {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}

                                <TouchableOpacity
                                    style={[styles.verifyButton, loading && styles.disabledButton]}
                                    onPress={verifyOTP}
                                    disabled={loading}
                                >
                                    <Text style={styles.otpButtonText}>
                                        {loading ? "Verifying..." : "Verify OTP"}
                                    </Text>
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
    disabledButton: {
      opacity: 0.7
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