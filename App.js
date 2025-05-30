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
import login from './src/screens/authentication/login/login';
import Symbolpage from './src/screens/Rto/SymbolPage/Symbolpage';
import Mandatory from './src/screens/Rto/Mandatory/Mandatory';
import Cautionary from './src/screens/Rto/Cautionary/Cautionary';
import Informatory from './src/screens/Rto/Informatory/Informatory';
import RoadSignals from './src/screens/Rto/RoadSignals/RoadSignals';
import DrivingRules from './src/screens/Rto/DrivingRules/DrivingRules';
import TrafficPoliceSignal from './src/screens/Rto/TrafficPoliceSignal/TrafficPoliceSignal';
import MainPage from './src/screens/Rto/RtoRules/MainPage/MainPage';
import TemporaryRegistration from './src/screens/Rto/RtoRules/Temporary/TemporaryRegistration';
import PermanentRegistration from './src/screens/Rto/RtoRules/Permanent/PermanentRegistration';
import RenewalOfRegistration from './src/screens/Rto/RtoRules/Renewal/RenewalOfRegistration';
import DuplicateRc from './src/screens/Rto/RtoRules/DuplicateRC/DuplicateRc';
import NoObjection from './src/screens/Rto/RtoRules/NoObjection/NoObjection';
import AddressChange from './src/screens/Rto/RtoRules/AddressChange/AddressChange';
import Reassignment from './src/screens/Rto/RtoRules/Reassignment/Reassignment';
import OwnershipTransferScreen from './src/screens/Rto/RtoRules/OwnerShip/OwnershipTransferScreen ';
import SchoolFinder from './src/screens/DrivingSchools/SchoolFinder';
import PersonalDetailsScreen from './src/screens/License/PersonalDetails/PersonalDetailsScreen';
import AdditionalInfo from './src/screens/License/AdditionalInfo/AdditionalInfo';
import AddressDetailsScreen from './src/screens/License/AddressDetailsScreen/AddressDetailsScreen';
import LicenseDetailsForm from './src/screens/License/LicenseDetailsForm/LicenseDetailsForm';
import TestSlotBooking from './src/screens/License/TestSlotBooking/TestSlotBooking';
import DocumentUploadScreen from './src/screens/License/DocumentUploadScreen/DocumentUploadScreen';
import VerifyEmail from './src/screens/authentication/VerifiyEmail/VerifyEmail';


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
          animation: "flip"
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
        <Stack.Screen name='DL' component={PersonalDetailsScreen}/>
        <Stack.Screen name='symbol' component={Symbolpage}/>
        <Stack.Screen name="mandatory" component={Mandatory}/>
        <Stack.Screen name='cautionary' component={Cautionary}/>
        <Stack.Screen name='Informatory' component={Informatory}/>
        <Stack.Screen name='RoadSignals' component={RoadSignals}/>
        <Stack.Screen name='DrivingRules' component={DrivingRules}/>
        <Stack.Screen name='TrafficPolice' component={TrafficPoliceSignal}/>
        <Stack.Screen name='rules' component={MainPage}/>
        <Stack.Screen name='temporary' component={TemporaryRegistration}/>
        <Stack.Screen name='permanent' component={PermanentRegistration}/>
        <Stack.Screen name='renewal' component={RenewalOfRegistration}/>
        <Stack.Screen name='Duplicate' component={DuplicateRc}/>
        <Stack.Screen name='noObjection' component={NoObjection}/>
        <Stack.Screen name='Address' component={AddressChange}/>
        <Stack.Screen name='Reassignment' component={Reassignment}/>
        <Stack.Screen name='owner' component={OwnershipTransferScreen}/>
        <Stack.Screen name='FindSchools' component={SchoolFinder} />
        <Stack.Screen name='AdditionalInfo' component={AdditionalInfo} />
        <Stack.Screen name='AddressDetails' component={AddressDetailsScreen} />
        <Stack.Screen name='details' component={LicenseDetailsForm} />
        <Stack.Screen name='TestBooking' component={TestSlotBooking} />
        <Stack.Screen name='UploadDoc' component={DocumentUploadScreen} />
        <Stack.Screen name='VerifyEmail' component={VerifyEmail}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;