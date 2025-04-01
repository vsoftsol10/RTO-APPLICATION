import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons"


const LoginScreen = ({navigation}) => {
    const handleLogin=()=>{
        navigation.navigate("LogIn")
    }
    const handleSingUp=()=>{
        navigation.navigate("Register")
    }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/login_page.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconstyle}
            onPress={() => navigation.navigate("Onboarding")}>
            <Ionic name="chevron-back"
                style={styles.icon}
            />
        </TouchableOpacity>
        <View style={styles.overlay}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>
                Log in to continue your journey!
                
              </Text>
              <Text style={styles.headerText}>
                Sign up to explore new possibilities!
              </Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>Login </Text>
                
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.signupButton}
                onPress={handleSingUp}
                activeOpacity={0.8}
              >
                <Text style={styles.signupButtonText}>Signup </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
    textShadowOffset:3,
    textShadowRadius:4,
    textShadowColor: '#26C6DA',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 50,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#26C6DA',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '80%',
    alignItems: 'center',
    elevation: 2,
  },
  signupButtonText: {
    color: '#1e9faf',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;