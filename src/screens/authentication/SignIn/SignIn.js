import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ToastAndroid } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons"
import React, { useState } from 'react'
import { SignInWithEmailandPassword } from '../../../utilities/Utilities'
import FONTS from '../../../constents/Fonts'

const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);

    const getErrors = (email, password) => {
        const errors = {}
        if (!email) {
            errors.email = "Please Enter Email"
        }
        else if (!email.includes("@") || !email.includes(".com")) {
            errors.email = "Enter a Valid Email"
        }

        if (!password) {
            errors.password = "Please Enter Password"
        }
        else if (password.length < 8) {
            errors.password = "Password Length must be minimum 8"
        }
        return errors;
    }

    const handleSubmit = () => {
        const errors = getErrors(email, password);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setShowErrors(true);
        }
        else {
            setErrors({});
            setShowErrors(false)
            handleSignin(email, password)
        }
    }

    const handleSignin = (email, password) => {
        setShowErrors(false);
        
        SignInWithEmailandPassword(email, password)
            .then(() => {
                // ToastAndroid replaced with a more cross-platform approach
                console.log("Logged In");
                setErrors({});
                ToastAndroid.show("Logged In",ToastAndroid.SHORT)
                navigation.navigate("Home");
            })
            .catch((error) => {
                console.log("Sign-In error:", error);
        
                if (error.code === "auth/user-not-found") {
                    setErrors({ email: "User not found" });
                } else if (error.code === "auth/wrong-password") {
                    setErrors({ password: "Incorrect password" });
                }else if(error.code === "auth/invalid-credential"){
                    setErrors({email:"Invalid User"})
                }
                 else  {
                    setErrors({ general: "Sign-In failed. Try again." });
                }
        
                setShowErrors(true);
            });
    };

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <Image 
                source={require('../../../../assets/login.jpeg')} 
                style={styles.backgroundImage} 
                resizeMode="cover"
            />
            
            {/* Content Container */}
         <View style={styles.overlay}>
                <View style={styles.contentContainer}>
                {/* Login Title */}
                <Text style={styles.loginTitle}>Login</Text>
                
                {/* Login Form */}
                <View style={styles.formContainer}>
                    {/* Profile Icon */}
                    <View style={styles.profileIconContainer}>
                        <Ionic name="person-circle" style={styles.profileIcon} />
                    </View>
                    
                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <Ionic name="person-outline" style={styles.inputIcon} />
                            <TextInput
                                placeholder='Email Id'
                                placeholderTextColor="#333"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={e => setEmail(e)}
                                style={styles.input}
                            />
                    </View>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    
                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <Ionic name="lock-closed-outline" style={styles.inputIcon} />
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor="#333"
                            secureTextEntry={!hidePassword}
                            value={password}
                            onChangeText={p => setPassword(p)}
                            style={styles.input}
                        />
                        {password.length >= 1 && 
                            <TouchableOpacity 
                                activeOpacity={0.9}
                                onPress={() => setHidePassword(!hidePassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionic name={hidePassword ? "eye-outline" : "eye-off-outline"} style={styles.inputIcon} />
                            </TouchableOpacity>
                        }
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    
                    {/* Remember/Forgot Section */}
                    {/* <View style={styles.rememberForgotContainer}>
                        <TouchableOpacity 
                            style={styles.rememberContainer}
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View style={styles.checkbox}>
                                {rememberMe && <Ionic name="checkmark" style={styles.checkIcon} />}
                            </View>
                            <Text style={styles.rememberText}>Remember Me</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <Text style={styles.forgotText}>Forgot Me ?</Text>
                        </TouchableOpacity>
                    </View> */}
                    
                    {/* Login Button */}
                    <TouchableOpacity 
                        style={styles.loginButton}
                        activeOpacity={0.8}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    
                    {/* Signup Link */}
                    <TouchableOpacity 
                        style={styles.signupContainer}
                        onPress={() => navigation.navigate("Register")}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.notMemberText}>Not a member ? Signup Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
         </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(27, 27, 27, 0.46)',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loginTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 100,
        fontFamily:FONTS.BOLD,
        marginTop:-80,
        textShadowOffset:3,
        textShadowRadius:6,
        textShadowColor: '#777E8B',
        
    },
    formContainer: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: 'rgba(184, 184, 184, 0.7)',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        // marginTop:30
    },
    profileIconContainer: {
        width: 55,
        height: 55,
        borderRadius: 35,
        backgroundColor: '#40C4D3',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    profileIcon: {
        fontSize: 40,
        color: 'white',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    inputIcon: {
        fontSize: 20,
        color: '#333',
        marginRight: 10,
        fontWeight:"600"
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#333',
        fontSize: 16,
    },
    eyeIcon: {
        padding: 8,
    },
    errorText: {
        color: "#FF5555",
        fontSize: 14,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    // rememberForgotContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     width: '100%',
    //     marginVertical: 15,
    // },
    // rememberContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // checkbox: {
    //     width: 18,
    //     height: 18,
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     marginRight: 8,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'white',
    // },
    // checkIcon: {
    //     color: '#40C4D3',
    //     fontSize: 14,
    // },
    // rememberText: {
    //     color: 'white',
    //     fontSize: 14,
    // },
    // forgotText: {
    //     color: 'white',
    //     fontSize: 14,
    // },
    loginButton: {
        backgroundColor: '#40C4D3',
        width: '100%',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        marginTop: 25,
    },
    notMemberText: {
        color: 'white',
        fontSize: 14,
    }
});