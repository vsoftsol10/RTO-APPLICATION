import { View, Text, TouchableOpacity,StyleSheet, ScrollView, TextInput } from 'react-native'
import Ionic from "react-native-vector-icons/Ionicons"
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constents/colors';

const singIn = () => {
  const [email,setEmail]=useState("");
  const [passWord,setPassWord]=useState("");
return (
 <View>
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
      <TouchableOpacity 
      activeOpacity={0.8}
      style={styles.iconstyle}
      onPress={()=>navigation.goBack()}>
        <Ionic name="chevron-back"
          style={styles.icon}
        />
      </TouchableOpacity>
      <ScrollView style={{paddingTop:60}}>
          <View style={styles.TextContainer}>
              <Text style={styles.welText}>Welcome</Text>
          </View>
          <View >
              <View style={{width:'100%'}}>      
                  <TextInput
                   placeholder='Enter an email'
                   placeholderTextColor={colors.lightText}
                   keyboardType="email-address"
                   value={email}
                   onChangeText={e => setEmail(e)}
                   style={styles.txtInput}
                  />
              </View>
              <View style={{width:'100%',marginTop: 20, }}>      
                  <TextInput
                   placeholder='Enter a Password'
                   placeholderTextColor={colors.lightText}
                   keyboardType="visible-password"
                   value={passWord}
                   onChangeText={e => setPassWord(e)}
                   style={styles.txtInput}
                  />
              </View>
              
              <View style={styles.buttonContainer}>
                  <TouchableOpacity activeOpacity={0.8} >
                     <Text style={styles.buttontxt}>Log In</Text> 
                  </TouchableOpacity>
              </View>
              
          </View>
      </ScrollView>
    </LinearGradient>
    </View>
)
}

export default singIn