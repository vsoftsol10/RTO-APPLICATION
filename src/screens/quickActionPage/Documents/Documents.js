import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../../constents/colors';

const Documents=({navigation})=> {
    // const handleBack=()=>{
    //     navigation.navigate("Home")
    // }
  return (
    <View>
        <StatusBar barStyle="light-content" backgroundColor={colors.purple} />
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Documents Needed to apply for license</Text>
        </View>
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.topText}>• Select one Address Proof and one Age Proof •</Text>
            </View>
            <View style={styles.addressContainer}>
                <Text style={styles.header}>Address Proof</Text>
                <View style={styles.line}></View>
                <Text style={styles.text}>• Indian PassPort</Text>
                <Text style={styles.text}>• Affidavit by Notary/oath commissioner</Text>
                <Text style={styles.text}>• Voter Id</Text>
                <Text style={styles.text}>• Aadhar Card</Text>
                <Text style={styles.text}>• Ration Card</Text>
                <Text style={styles.text}>• Arms License issued by Government</Text>
            </View>

            <View style={styles.ageContainer}>
                <Text style={styles.header}>Age Proof</Text>
                <View style={styles.line}></View>
                <Text style={styles.text}>• SSLC Certificate</Text>
                <Text style={styles.text}>• School/Education/Transfer Certificate</Text>
                <Text style={styles.text}>• Indian PassPort</Text>
                <Text style={styles.text}>• Birth Certificate issued by Municipality</Text>
                <Text style={styles.text}>• Affidavit by Notary/oath commissioner</Text>
                <Text style={styles.text}>• Photo ID card issued by Central/State Government</Text>
            </View>
        </View>
          <View style={styles.backBtnContainer}>
              <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={handleBack} >
                  <Text style={styles.backButtonTxt}>Back to Home</Text>
              </TouchableOpacity>
          </View>
    </View>
  )
}

export default Documents;
const styles = StyleSheet.create({
    headerContainer:{
        backgroundColor:colors.purple,
        paddingTop:70,
        paddingBottom:20,
        marginBottom:20,
        alignItems:"center"

    },
    headerText:{
        color:colors.white,
        fontSize:20,
        fontWeight:"600",
        letterSpacing:0.2,
        top:10,
        paddingBottom:10
    },
    container:{
        elevation:3,
        padding:16,
        shadowColor:colors.black,
        shadowOffset:10,
        shadowOpacity:1.5,
    },
    addressContainer:{
        elevation:3,
        padding:16,
        shadowColor:colors.black,
        shadowOffset:10,
        shadowOpacity:1.5,
        backgroundColor:colors.border,
        marginBottom:20
    },
    header:{
        textAlign:"center",
        color:colors.purple,
        fontSize:22,
        fontWeight:"600",
        padding:8,
    },
    text:{
        fontSize:15,
        color:colors.black,
        padding:3.5,
        fontWeight:"500",
        letterSpacing:1,
    },
    ageContainer:{
        backgroundColor:colors.border,
        padding:16,
        elevation:3,
    },
    line:{
        width:"50%",
        backgroundColor:colors.white,
        height:2.5,
        alignItems:"center",
        marginHorizontal:"25%",
        marginBottom:20
    },
    topContainer:{
        backgroundColor:"#BF6BA8",
        padding:5,
        alignItems:"center",
        borderRadius:5,
        marginBottom:15
    },
    topText:{
        color:"#22243",
        fontSize:16,
        letterSpacing:0.5, 
    },
    backButton:{
        alignItems:"center",
        backgroundColor:colors.purple,
        width:"50%",
        padding:10,
        borderRadius:10
    
      },
      backBtnContainer:{
        alignItems:"center",
        justifyContent:"center"
      },
      backButtonTxt:{
        fontSize:18,
        color:colors.white,
        letterSpacing:2,
        fontWeight:"600"
      }

})