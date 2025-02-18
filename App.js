import { enableScreens } from 'react-native-screens';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

// Import screens
import Home from './src/screens/appScreens/Home/Home';
import Onboarding from './src/screens/authentication/OnBoarding/Onboarding'
console.log("Onbording Screen",Onboarding);
import SignUp from './src/screens/authentication/SignUp/SignUp';
import SignIn from './src/screens/authentication/SignIn/SignIn';
import InfoScreen from './src/screens/authentication/Information/InfoScreen';

enableScreens();
const Stack = createNativeStackNavigator();
const LoadingScreen = () => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,animation:"slide_from_bottom"
        }}
      >
        {!user ? (
          // User is not signed in
          <Stack.Group>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="LogIn" component={SignIn} />
            <Stack.Screen name="Register" component={SignUp} />
          </Stack.Group>
        ) : (
          // User is signed in
          user.metadata.creationTime === user.metadata.lastSignInTime ? (
            // First time user - show info screen
            <Stack.Group>
              <Stack.Screen name="Info" component={InfoScreen} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Group>
          ) : (
            // Returning user - show home
            <Stack.Group>
              <Stack.Screen name="Home" component={Home} />
            </Stack.Group>
          )
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;