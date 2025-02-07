import { enableScreens } from 'react-native-screens';
enableScreens();
import React from 'react'
import{NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/appScreens/Home/Home'
import Onboarding from './src/screens/authentication/OnBoarding/Onboarding'
import signUp from './src/screens/authentication/SignUp/signUp';
import singIn from './src/screens/authentication/SignIn/singIn';

const App = () => {
    const Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{headerShown:false}}>
            <Stack.Screen name='Onboarding' component={Onboarding}/>
            <Stack.Screen name='Register' component={signUp}/>
            <Stack.Screen name='LogIn' component={singIn}/>
            <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App