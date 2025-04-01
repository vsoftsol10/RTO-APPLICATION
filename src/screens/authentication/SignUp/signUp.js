import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ToastAndroid, Image } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";
import React, { useState } from 'react';
import { CreateAccountWithEmailAndPassWord, SignInAnonymously, SignInWithGoogle } from '../../../utilities/Utilities';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import FONTS from '../../../constents/Fonts';

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

    // Send OTP via email using EmailJS
    const sendEmailOTP = async (email) => {
        console.log('Email OTP Request Details:', {
            email: email,
            timestamp: new Date().toISOString(),
            environment: __DEV__ ? 'Development' : 'Production'
        });
    
        try {
            const otp = generateOTP();
            const stored = await storeOTPForVerification(email, otp);
            
            if (!stored) {
                throw new Error("Failed to store OTP");
            }
            
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
            
            console.log('API Request Configuration:', {
                endpoint: emailjsEndpoint,
                serviceId: emailjsData.service_id,
                templateId: emailjsData.template_id,
                templateParams: {
                    ...emailjsData.template_params,
                    otp_code: '[REDACTED]'
                }
            });
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Debug-Request': 'true'
                },
                timeout: 10000
            };
            
            try {
                const response = await axios.post(emailjsEndpoint, emailjsData, config);
                
                console.log('API Response Details:', {
                    status: response.status,
                    headers: response.headers,
                    data: response.data
                });
    
                if (response.status === 200) {
                    console.log(`Email OTP sent successfully to ${email}`);
                    
                    if (__DEV__) {
                        ToastAndroid.show(`DEV MODE: Your OTP is ${otp}`, ToastAndroid.LONG);
                    }
                    
                    return { success: true, otp };
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            } catch (axiosError) {
                console.error("Detailed Axios Error:", {
                    message: axiosError.message,
                    code: axiosError.code,
                    status: axiosError.response?.status,
                    data: axiosError.response?.data,
                    headers: axiosError.response?.headers
                });
    
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
            console.error("Complete Error Object:", {
                name: error.name,
                message: error.message,
                stack: error.stack,
                code: error.code,
                config: error.config
            });
            
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
            const formattedPhone = formatPhoneNumber(phoneNumber);
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
            const user = auth().currentUser;
            
            if (user) {
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
                setErrors({ general: "Authentication error. Please try again." });
                setShowErrors(true);
            }
        }
    };

    // Based on the design in the image
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/Sign-up.png')}
                style={styles.backgroundImage}
                blurRadius={2}
            />
            <TouchableOpacity
                 activeOpacity={0.8}
                 style={styles.iconstyle}
                 onPress={() => navigation.navigate("login&Register")}>
                 <Ionic name="chevron-back"
                     style={styles.icon}
                 />
            </TouchableOpacity>
            <View style={styles.overlay}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.headerText}>Signup</Text>
                    
                    
                    
                    {/* Main Form Content */}
                    <View style={styles.formContainer}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Ionic name="person" style={styles.avatarIcon} />
                        </View>
                    </View>
                        {!otpVerified ? (
                            <>
                                <View style={styles.inputContainer}>
                                    <Ionic name="mail-outline" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder='Email or Mobile number'
                                        placeholderTextColor="#333"
                                        value={userInput}
                                        onChangeText={setUserInput}
                                        style={styles.input}
                                        keyboardType="email-address"
                                    />
                                </View>
                                {showErrors && errors.userInput && (
                                    <Text style={styles.errorText}>{errors.userInput}</Text>
                                )}

                                <TouchableOpacity 
                                    style={styles.continueButton}
                                    onPress={sendOTP}
                                    disabled={loading}
                                >
                                    <Text style={styles.buttonText}>
                                        {loading ? "Please wait..." : "Continue"}
                                    </Text>
                                </TouchableOpacity>

                                {otpSent && (
                                    <View style={{marginTop: 15, width: '100%'}}>
                                        <View style={styles.inputContainer}>
                                            <Ionic name="key-outline" style={styles.inputIcon} />
                                            <TextInput
                                                placeholder='Enter OTP'
                                                placeholderTextColor="#fff"
                                                keyboardType="number-pad"
                                                maxLength={6}
                                                value={otp}
                                                onChangeText={setOtp}
                                                style={styles.input}
                                            />
                                        </View>
                                        {showErrors && errors.otp && (
                                            <Text style={styles.errorText}>{errors.otp}</Text>
                                        )}
                                        
                                        <TouchableOpacity 
                                            style={styles.continueButton}
                                            onPress={verifyOTP}
                                            disabled={loading}
                                        >
                                            <Text style={styles.buttonText}>
                                                {loading ? "Verifying..." : "Verify OTP"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </>
                        ) : (
                            <>
                                <View style={styles.inputContainer}>
                                    <Ionic name="lock-closed-outline" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder='Enter Password'
                                        placeholderTextColor="#fff"
                                        secureTextEntry={!hidePassword}
                                        value={passWord}
                                        onChangeText={setPassWord}
                                        style={styles.input}
                                    />
                                    {passWord.length > 0 && (
                                        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                                            <Ionic name={hidePassword ? "eye-outline" : "eye-off-outline"} style={styles.eyeIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {showErrors && errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}

                                <View style={styles.inputContainer}>
                                    <Ionic name="lock-closed-outline" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder='Confirm Password'
                                        placeholderTextColor="#fff"
                                        secureTextEntry={!hideConfirmPassword}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        style={styles.input}
                                    />
                                    {confirmPassword.length > 0 && (
                                        <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                                            <Ionic name={hideConfirmPassword ? "eye-outline" : "eye-off-outline"} style={styles.eyeIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {showErrors && errors.confirmPassword && (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                )}

                                <TouchableOpacity 
                                    style={styles.continueButton}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        <Text style={styles.orContinueText}>( or continue with )</Text>
                        
                        <View style={styles.socialButtonsContainer}>
                            <TouchableOpacity 
                                style={styles.socialButton}
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
                            >
                                <Image 
                                source={require("../../../../assets/google-icon.png")}
                                style={styles.socialIcon}
                                />
                            </TouchableOpacity>
                            
                            
                        </View>
                        
                        <TouchableOpacity 
                            style={styles.loginLinkContainer}
                            onPress={() => navigation.navigate("LogIn")}
                        >
                            <Text style={styles.loginLinkText}>Already a member ? Login now</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity:0.9
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.54)',
    },
    icon:{
        fontSize:20,
        color:"white",
    },
    iconstyle:{
        backgroundColor: 'rgba(27, 25, 25, 0.37)',
        marginTop:50,
        padding:10,
        borderRadius:100,
        // elevation:5,
        alignItems:"center",
        aspectRatio:1/1,
        width:40,
        position:"absolute",
        top:20,
        left:20,
        zIndex:1,
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    headerText: {
        fontFamily:FONTS.BOLD,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
        marginTop:100
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: '#00BCD4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarIcon: {
        fontSize: 27,
        color: '#fff',
    },
    formContainer: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: 'rgba(184, 184, 184, 0.7)',
        borderRadius:20,
        padding: 20,
        alignItems: 'center',
        justifyContent:"center",
        marginTop:70
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    inputIcon: {
        fontSize: 20,
        color: '#333',
        marginRight: 10,
    },
    eyeIcon: {
        fontSize: 20,
        color: '#fff',
    },
    input: {
        flex: 1,
        height: 45,
        color: '#333',
        fontSize: 14,
    },
    continueButton: {
        width: '100%',
        backgroundColor: '#00BCD4',
        borderRadius: 8,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: '#D63031',
        fontSize: 13.5,
        fontWeight:"400",
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    orContinueText: {
        color: '#fff',
        marginVertical: 15,
        fontSize: 14,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 15,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    socialIcon: {
        width:30,
        height:30,
    },
    loginLinkContainer: {
        marginTop: 10,
    },
    loginLinkText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default SignUp;