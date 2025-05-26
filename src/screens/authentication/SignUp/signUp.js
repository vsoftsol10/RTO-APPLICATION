import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ToastAndroid,
  Image,
  ActivityIndicator,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import {SignInWithGoogle} from '../../../utilities/Utilities';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FONTS from '../../../constents/Fonts';

const SignUp = ({navigation, route}) => {
  // User input states
  const [userInput, setUserInput] = useState('');
  const [inputType, setInputType] = useState('');
  const [passWord, setPassWord] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
  
  // Validation and UI states
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Phone verification states
  const [confirmation, setConfirmation] = useState(null);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  // Email verification states
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Check for deep link verification from route params
  useEffect(() => {
    if (route.params?.verifiedEmail) {
      setUserInput(route.params.verifiedEmail);
      setInputType('email');
      setEmailVerified(true);
      setEmailVerificationSent(false);
      ToastAndroid.show(
        'Email verified successfully! Please create your password.',
        ToastAndroid.LONG,
      );
    }
  }, [route.params]);

  // Validate if input is email or phone
  const validateInput = input => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    
    if (emailRegex.test(input)) {
      return {type: 'email', value: input};
    } else if (phoneRegex.test(formatPhoneNumber(input))) {
      return {type: 'phone', value: formatPhoneNumber(input)};
    } else {
      const formattedPhone = formatPhoneNumber(input);
      if (phoneRegex.test(formattedPhone)) {
        return {type: 'phone', value: formattedPhone};
      }
      return {type: 'invalid', value: input};
    }
  };

  // Format phone number to E.164 format
  const formatPhoneNumber = phoneNumber => {
    if (!phoneNumber) return phoneNumber;
    
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length < 10) return phoneNumber;
    
    if (!phoneNumber.startsWith('+')) {
      if (cleaned.length > 10 && cleaned.startsWith('1')) {
        return '+' + cleaned;
      }
      return '+1' + cleaned; // Default US country code
    }
    
    return phoneNumber;
  };

  // Generate random verification code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle initial submission (email verification or phone OTP)
  const handleInitialSubmission = async () => {
    if (!userInput) {
      setErrors({userInput: 'Please enter email or phone number'});
      setShowErrors(true);
      return;
    }

    const {type, value} = validateInput(userInput);
    setInputType(type);

    if (type === 'invalid') {
      setErrors({
        userInput:
          'Invalid format. For phone numbers, include country code (e.g., +12345678901)',
      });
      setShowErrors(true);
      return;
    }

    setLoading(true);
    try {
      if (type === 'email') {
        await sendEmailVerification(value);
      } else if (type === 'phone') {
        const result = await sendPhoneOTP(value);
        if (result.success) {
          setConfirmation(result.confirmation);
          ToastAndroid.show('OTP sent to your phone', ToastAndroid.SHORT);
          setOtpSent(true);
        }
      }

      setErrors({});
      setShowErrors(false);
    } catch (error) {
      console.error('Submission error:', error);
      ToastAndroid.show(
        error.message || 'Failed to process. Please try again.',
        ToastAndroid.SHORT,
      );
      setErrors({
        userInput: error.message || 'Failed to process. Please try again.',
      });
      setShowErrors(true);
    } finally {
      setLoading(false);
    }
  };

  // Send verification email using backend service
  const sendEmailVerification = async email => {
    setLoading(true);

    try {
      // Check if email already registered
      const methods = await auth().fetchSignInMethodsForEmail(email);

      if (methods && methods.length > 0) {
        throw new Error('Email already registered. Please login instead.');
      }

      // Option 1: Backend-based verification (Replace with your backend URL)
      /*
      const response = await fetch('https://your-backend-api.com/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          type: 'signup_verification'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send verification email');
      }
      */

      // Option 2: Temporary approach for development (Remove in production)
      // Generate and store verification code temporarily
      const code = generateVerificationCode();
      setVerificationCode(code);
      
      // In production, this code would be sent via email through your backend
      console.log(`Verification code for ${email}: ${code}`);
      ToastAndroid.show(
        `Development Mode: Code is ${code}`,
        ToastAndroid.LONG,
      );

      setEmailVerificationSent(true);
      return {success: true};

    } catch (error) {
      console.error('Email verification error:', error);
      
      if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address');
      } else if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email already registered. Please login instead.');
      } else if (error.message && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection.');
      } else {
        throw new Error(error.message || 'Failed to send verification email');
      }
    } finally {
      setLoading(false);
    }
  };

  // Send OTP to phone
  const sendPhoneOTP = async phoneNumber => {
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      if (!formattedPhone.startsWith('+')) {
        throw new Error('Phone number must include country code (+)');
      }

      const phoneConfirmation = await auth().signInWithPhoneNumber(formattedPhone);
      
      return {success: true, confirmation: phoneConfirmation};
    } catch (error) {
      console.error('Phone OTP error:', error);

      let errorMessage = 'Failed to send OTP to your phone number.';

      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Please enter a valid phone number with country code.';
      } else if (error.code === 'auth/quota-exceeded') {
        errorMessage = 'Too many attempts. Please try again later.';
      }

      throw new Error(errorMessage);
    }
  };

  // Verify email code
  const verifyEmailCode = async () => {
    if (!otp || otp.length !== 6) {
      setErrors({otp: 'Please enter a valid 6-digit code'});
      setShowErrors(true);
      return;
    }

    setLoading(true);
    try {
      // Option 1: Backend verification (Replace with your backend)
      /*
      const response = await fetch('https://your-backend-api.com/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInput,
          code: otp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Invalid verification code');
      }
      */

      // Option 2: Temporary verification for development
      if (otp !== verificationCode) {
        throw new Error('Invalid verification code');
      }

      setEmailVerified(true);
      setEmailVerificationSent(false);
      setErrors({});
      setShowErrors(false);
      ToastAndroid.show('Email verified successfully!', ToastAndroid.SHORT);

    } catch (error) {
      console.error('Email verification failed:', error);
      setErrors({otp: error.message || 'Invalid verification code'});
      setShowErrors(true);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP for phone verification
  const verifyOTP = async () => {
    if (!otp || otp.length < 4) {
      setErrors({otp: 'Please enter a valid OTP'});
      setShowErrors(true);
      return;
    }

    setLoading(true);
    try {
      await confirmation.confirm(otp);
      
      setOtpVerified(true);
      setErrors({});
      setShowErrors(false);
      ToastAndroid.show('Phone verified successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.error('OTP verification failed:', error);
      setErrors({otp: 'Invalid OTP. Please try again.'});
      setShowErrors(true);
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email
  const resendEmailVerification = async () => {
    try {
      setLoading(true);
      await sendEmailVerification(userInput);
      ToastAndroid.show('Verification email resent!', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(
        error.message || 'Failed to resend verification email',
        ToastAndroid.SHORT
      );
    } finally {
      setLoading(false);
    }
  };

  // Validate password fields
  const validatePasswords = (password, confirmPassword) => {
    const errors = {};

    if (!password) {
      errors.password = 'Please enter a password';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  // Handle final submission
  const handleSubmit = () => {
    // Verify the user has completed verification
    if (inputType === 'phone' && !otpVerified) {
      setErrors({general: 'Please verify your phone number first'});
      setShowErrors(true);
      return;
    }

    if (inputType === 'email' && !emailVerified) {
      setErrors({general: 'Please verify your email first'});
      setShowErrors(true);
      return;
    }

    // Validate passwords
    const validationErrors = validatePasswords(passWord, confirmPassword);

    if (Object.keys(validationErrors).length > 0) {
      setShowErrors(true);
      setErrors(validationErrors);
    } else {
      setErrors({});
      setShowErrors(false);
      createUserAccount();
    }
  };

  // Create the final user account
  const createUserAccount = async () => {
    setLoading(true);
    
    // Add timeout wrapper for Firebase operations
    const withTimeout = (promise, timeoutMs = 15000) => {
      return Promise.race([
        promise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
        )
      ]);
    };

    try {
      if (inputType === 'email') {
        console.log('Creating email account...');
        
        // Create account with timeout
        const userCredential = await withTimeout(
          auth().createUserWithEmailAndPassword(userInput, passWord),
          10000
        );
        
        console.log('Account created, setting up profile...');
        
        // Get current user immediately after creation
        const currentUser = userCredential.user;
        
        if (!currentUser) {
          throw new Error('Authentication failed. Please try again.');
        }
        
        // Create user profile with timeout
        await withTimeout(
          firestore().collection('users').doc(currentUser.uid).set({
            email: userInput,
            emailVerified: true, // We verified it in our process
            createdAt: firestore.FieldValue.serverTimestamp(),
            userId: currentUser.uid,
          }),
          8000
        );
        
        console.log('Profile created successfully');
        ToastAndroid.show('Account created successfully!', ToastAndroid.LONG);
        navigation.navigate('Info');
        
      } else if (inputType === 'phone') {
        console.log('Setting up phone account...');
        
        const user = auth().currentUser;
        
        if (!user) {
          throw new Error('Authentication error. Please try again.');
        }
        
        // Create user profile with timeout
        await withTimeout(
          firestore().collection('users').doc(user.uid).set({
            phoneNumber: user.phoneNumber,
            createdAt: firestore.FieldValue.serverTimestamp(),
            userId: user.uid,
          }),
          8000
        );
        
        console.log('Phone profile created successfully');
        ToastAndroid.show('Account created successfully!', ToastAndroid.LONG);
        navigation.navigate('Info');
      }
      
    } catch (error) {
      console.error('Account creation error:', error);
      
      // Handle specific error types
      if (error.message === 'Operation timed out') {
        setErrors({general: 'Request timed out. Please check your internet connection and try again.'});
      } else if (error.code === 'auth/email-already-in-use') {
        setErrors({general: 'Email already in use. Please try logging in instead.'});
      } else if (error.code === 'auth/weak-password') {
        setErrors({general: 'Password is too weak. Please choose a stronger password.'});
      } else if (error.code === 'auth/network-request-failed') {
        setErrors({general: 'Network error. Please check your internet connection.'});
      } else if (error.code === 'firestore/permission-denied') {
        setErrors({general: 'Permission denied. Please check your account setup.'});
      } else if (error.code === 'firestore/unavailable') {
        setErrors({general: 'Service temporarily unavailable. Please try again.'});
      } else {
        setErrors({general: `Account creation failed: ${error.message}`});
      }
      
      setShowErrors(true);
    } finally {
      setLoading(false);
    }
  };

  // UI Component
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
        onPress={() => navigation.navigate('login&Register')}>
        <Ionic name="chevron-back" style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.overlay}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <Text style={styles.headerText}>Signup</Text>

          {/* Main Form Content */}
          <View style={styles.formContainer}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionic name="person" style={styles.avatarIcon} />
              </View>
            </View>

            {/* Step 1: Email/Phone Input and Verification */}
            {!emailVerified && inputType !== 'phone' && !otpVerified ? (
              <>
                <View style={styles.inputContainer}>
                  <Ionic name="mail-outline" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Email or Mobile number"
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
                  onPress={handleInitialSubmission}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#FFF" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Continue</Text>
                  )}
                </TouchableOpacity>

                {/* Email verification code input */}
                {emailVerificationSent && inputType === 'email' && (
                  <View style={{marginTop: 15, width: '100%'}}>
                    <Text style={styles.verificationMessage}>
                      Please enter the 6-digit verification code sent to your email
                    </Text>
                    <View style={styles.inputContainer}>
                      <Ionic name="key-outline" style={styles.inputIcon} />
                      <TextInput
                        placeholder="Enter verification code"
                        placeholderTextColor="#333"
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
                      onPress={verifyEmailCode}
                      disabled={loading}>
                      {loading ? (
                        <ActivityIndicator color="#FFF" size="small" />
                      ) : (
                        <Text style={styles.buttonText}>Verify Code</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.resendButton}
                      onPress={resendEmailVerification}
                      disabled={loading}>
                      <Text style={styles.resendButtonText}>
                        {loading ? 'Sending...' : 'Resend Code'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* OTP Input for phone verification */}
                {otpSent && inputType === 'phone' && (
                  <View style={{marginTop: 15, width: '100%'}}>
                    <View style={styles.inputContainer}>
                      <Ionic name="key-outline" style={styles.inputIcon} />
                      <TextInput
                        placeholder="Enter OTP"
                        placeholderTextColor="#333"
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
                      disabled={loading}>
                      {loading ? (
                        <ActivityIndicator color="#FFF" size="small" />
                      ) : (
                        <Text style={styles.buttonText}>Verify OTP</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <>
                {/* Step 2: Password Creation after Verification */}
                {emailVerified && (
                  <View style={styles.verifiedContainer}>
                    <Ionic
                      name="checkmark-circle"
                      style={styles.verifiedIcon}
                    />
                    <Text style={styles.verifiedText}>
                      Email verified: {userInput}
                    </Text>
                  </View>
                )}

                {otpVerified && (
                  <View style={styles.verifiedContainer}>
                    <Ionic
                      name="checkmark-circle"
                      style={styles.verifiedIcon}
                    />
                    <Text style={styles.verifiedText}>
                      Phone verified: {userInput}
                    </Text>
                  </View>
                )}

                <View style={styles.inputContainer}>
                  <Ionic name="lock-closed-outline" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="#333"
                    secureTextEntry={!hidePassword}
                    value={passWord}
                    onChangeText={setPassWord}
                    style={styles.input}
                  />
                  {passWord.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setHidePassword(!hidePassword)}>
                      <Ionic
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        style={styles.eyeIcon}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {showErrors && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <View style={styles.inputContainer}>
                  <Ionic name="lock-closed-outline" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#333"
                    secureTextEntry={!hideConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                  />
                  {confirmPassword.length > 0 && (
                    <TouchableOpacity
                      onPress={() =>
                        setHideConfirmPassword(!hideConfirmPassword)
                      }>
                      <Ionic
                        name={
                          hideConfirmPassword
                            ? 'eye-outline'
                            : 'eye-off-outline'
                        }
                        style={styles.eyeIcon}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {showErrors && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleSubmit}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#FFF" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Create Account</Text>
                  )}
                </TouchableOpacity>

                {showErrors && errors.general && (
                  <Text style={styles.errorText}>{errors.general}</Text>
                )}
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
                      ToastAndroid.show(
                        'Signed In Successfully',
                        ToastAndroid.SHORT,
                      );
                      navigation.navigate('Home');
                    }
                  } catch (error) {
                    console.error('Google Sign-In Error:', error);
                    ToastAndroid.show(
                      'Google Sign-In Failed',
                      ToastAndroid.SHORT,
                    );
                  }
                }}>
                <Image
                  source={require('../../../../assets/google-icon.png')}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginLinkContainer}
              onPress={() => navigation.navigate('LogIn')}>
              <Text style={styles.loginLinkText}>
                Already a member? Login now
              </Text>
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
    opacity: 0.9,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  iconstyle: {
    backgroundColor: 'rgba(27, 25, 25, 0.37)',
    marginTop: 50,
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    aspectRatio: 1 / 1,
    width: 40,
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: FONTS.BOLD,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    marginTop: 100,
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
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
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
    color: '#333',
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
    fontWeight: '400',
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
    width: 30,
    height: 30,
  },
  loginLinkContainer: {
    marginTop: 10,
  },
  loginLinkText: {
    color: '#fff',
    fontSize: 14,
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 188, 212, 0.2)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  verifiedIcon: {
    fontSize: 20,
    color: '#00BCD4',
    marginRight: 10,
  },
  verifiedText: {
    color: '#fff',
    fontSize: 14,
  },
  verificationMessage: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  resendButton: {
    marginTop: 5,
  },
  resendButtonText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default SignUp;