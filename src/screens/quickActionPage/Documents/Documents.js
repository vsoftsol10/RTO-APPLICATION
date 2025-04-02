import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../../constents/colors';
import Ionic from "react-native-vector-icons/Ionicons"


const Documents=({navigation})=> {
    const handleBack=()=>{
        navigation.navigate("Home")
    }
  return (
    <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" backgroundColor={"#35cad1"} />
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}> Documents Required </Text>
        </View>
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.topText}>• Pick any one from Address Proof and Age Proof •</Text>
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
              <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.iconstyle}
                  onPress={() => navigation.navigate("Onboarding")}>
                  <Ionic name="caret-back-outline"
                   style={styles.icon} />
                </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={handleBack} >
                  <Text style={styles.backButtonTxt}>Back to Home</Text>
              </TouchableOpacity>
          </View>
    </View>
  )
}

export default Documents;
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:"white",
        height:"100%"
    },
    headerContainer:{
        backgroundColor:"#35cad1",
        paddingTop:70,
        paddingBottom:20,
        marginBottom:20,
    },
    headerText:{
        textAlign:"center",
        color:colors.white,
        fontSize:28,
        fontWeight:"800",
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
        elevation:5,
        padding:16,
        shadowColor:colors.black,
        shadowOffset:15,
        shadowOpacity:2.5,
        backgroundColor:"white",
        marginBottom:20
    },
    header:{
        textAlign:"center",
        color:"#35cad1",
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
        elevation:5,
        padding:16,
        shadowColor:colors.black,
        shadowOffset:15,
        shadowOpacity:2.5,
        backgroundColor:"white",
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
        backgroundColor:"#35cad1",
        padding:5,
        alignItems:"center",
        borderRadius:5,
        marginBottom:15
    },
    topText:{
        color:"#fff",
        fontSize:16,
        letterSpacing:0.5, 
    },
    icon:{
        fontSize:20,
        color:"white",
      },
      iconstyle:{
        width:40,
      },
      backButton: {
        alignItems: "center",
        padding: 10,
        borderRadius: 10
      },
      backBtnContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#35cad1",
        width: "60%",
        flexDirection:"row",
        marginLeft:"20%",
        borderRadius:10,
        gap:-12,
        marginTop:10
      },
      backButtonTxt: {
        fontSize: 18,
        color: colors.white,
        letterSpacing: 2,
        fontWeight: "600" ,
        paddingLeft:-5
      }

})