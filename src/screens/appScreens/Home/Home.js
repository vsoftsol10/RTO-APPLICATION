import { View, Text ,TouchableOpacity, StyleSheet, StatusBar} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../../constents/colors'
import { SignOutUser } from '../../../utilities/Utilities'


const Home = () => {
  const handleSignOut=()=>{
    try{
      SignOutUser();
      console.log("signed out");
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <View>
      <StatusBar backgroundColor={colors.bgLineGradeOne} barStyle={"dark-content"}/>
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
         <Text style={{fontSize:20,color:colors.black}}>
            Welcome
        </Text>
        <Text style={styles.userText}>
            User
        </Text>
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={()=>handleSignOut()}
        style={styles.signoutText}>
          <Text style={{color:colors.white}}>
            Sign Out
          </Text>   
        </TouchableOpacity>

      </LinearGradient>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
    justifyContent:"center",
    alignItems:"center"
  },
  userText:{
    fontSize:40,
    color:colors.black,
    letterSpacing:2,
    fontWeight:"700",
    marginTop:10,
    marginBottom:20
  },
  signoutText:{
    color:colors.black,
    fontWeight:"400",
    marginTop:10,
    backgroundColor:colors.warning,
    paddingHorizontal:18,
    paddingVertical:10,
    borderRadius:10
  }
})