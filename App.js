import { enableScreens } from 'react-native-screens';
enableScreens();
import React, { useState,useEffect } from 'react'
import{NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/appScreens/Home/Home'
import Onboarding from './src/screens/authentication/OnBoarding/Onboarding'
import SignUp from './src/screens/authentication/SignUp/SignUp';
import SingIn from './src/screens/authentication/SignIn/SingIn';
import auth from '@react-native-firebase/auth';


const App = () => {
  const Stack=createNativeStackNavigator()

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  // Handle user state changes
  const onAuthStateChanged = (user) =>{
    setUser(user);
    if (initializing) setInitializing(false);
  }

  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{headerShown:false ,animation:"slide_from_bottom"}}
        >
          {user?
            (<Stack.Screen name='Home' component={Home}/>)
            :
            (<>
            <Stack.Screen name='Onboarding' component={Onboarding}/>
            <Stack.Screen name='Register' component={SignUp}/>
            <Stack.Screen name='LogIn' component={SingIn}/>
            </>)}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App