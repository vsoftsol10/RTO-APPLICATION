import { enableScreens } from 'react-native-screens';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Import screens
import Home from './src/screens/appScreens/Home/Home';
import Onboarding from './src/screens/authentication/OnBoarding/Onboarding';
import SignUp from './src/screens/authentication/SignUp/SignUp';
import SignIn from './src/screens/authentication/SignIn/SignIn';
import InfoScreen from './src/screens/authentication/Information/InfoScreen';
import SplashScreen from './src/component/SplashScreen/SplashScreen';
import Profile from './src/screens/appScreens/Profile/Profile';
import EditProfile from './src/screens/appScreens/EditProfile/EditProfile';
import Eligibility from './src/screens/quickActionPage/Eligibility/Eligibility';
import Documents from './src/screens/quickActionPage/Documents/Documents';
import DrivngLicense from './src/screens/quickActionPage/Driving License/DrivngLicense';
import DrivingTips from './src/screens/quickActionPage/DrivingTips/DrivingTips';
import FeeDetailsScreen from './src/screens/quickActionPage/FeeData/FeeDetailsScreen';
import DrivingLicense from './src/screens/License/LicenseDetails/LicenseDetails';
import login from './src/screens/authentication/login/login';
import Symbolpage from './src/screens/Rto/SymbolPage/Symbolpage';

enableScreens();
const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [hasUserInfo, setHasUserInfo] = useState(false);
  const [onboardingSeen, setOnboardingSeen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  // Check if user info exists in Firestore
  const checkUserInfo = async (userId) => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      setHasUserInfo(userDoc.exists);
    } catch (error) {
      console.error("Error checking user info:", error);
      setHasUserInfo(false);
    }
  };

  // Handle authentication state changes
  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (user) {
      await checkUserInfo(user.uid);
    }
  };

  // Check if onboarding has been seen
  const checkOnboarding = async () => {
    try {
      const seen = await AsyncStorage.getItem('onboardingSeen');
      setOnboardingSeen(seen === 'true');
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setOnboardingSeen(false);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        await checkOnboarding();
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        setIsLoading(false);
        return subscriber;
      } catch (error) {
        console.error("Error initializing app:", error);
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Determine which screens to show
  const getInitialRouteName = () => {
   
    // Always return "Onboarding" since it should appear first
    return "Onboarding";
  };
  if (showSplash) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={{
          headerShown: false,
          animation: "slide_from_bottom"
        }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Register" component={SignUp} />
        <Stack.Screen name="LogIn" component={SignIn} />
        <Stack.Screen name="login&Register" component={login}/>
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Edit_Profile" component={EditProfile}/>
        <Stack.Screen name="eligibility" component={Eligibility} />
        <Stack.Screen name="doc" component={Documents}/>
        <Stack.Screen name="license" component={DrivngLicense}/>
        <Stack.Screen name="Tips" component={DrivingTips}/>
        <Stack.Screen name="Fee" component={FeeDetailsScreen}/>
        <Stack.Screen name='DL' component={DrivingLicense}/>
        <Stack.Screen name='symbol' component={Symbolpage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;