import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';

const Images={
    FrontAndBehind:require("../../../../assets/TrafficPoliceSignal/Traffic_Hand_Signal_01.png"),
    ApproachFromleft:require("../../../../assets/TrafficPoliceSignal/Traffic_Hand_Signal_01.png"),
    BeckonFromRight:require("../../../../assets/TrafficPoliceSignal/Traffic_Hand_Signal_01.png"),
    BeckonFromleft:require("../../../../assets/TrafficPoliceSignal/Traffic_Hand_Signal_01.png"),
    WaitingToTurnRight:require("../../../../assets/TrafficPoliceSignal/Traffic_Hand_Signal_01.png"),
    FromFront:require("../../../../assets/TrafficPoliceSignal/Traffic_Hand_Signal_01.png"),
    FromBehind:require("../../../../assets/TrafficPoliceSignal/Traffic_Hand_Signal_01.png"),
    LeftToTurnRight:require("../../../../assets/TrafficPoliceSignal/Traffic_Hand_Signal_01.png"),
    ClosingAllVechile:require("../../../../assets/TrafficPoliceSignal/Traffic_Hand_Signal_01.png"),

}
const TrafficPoliceSignal=({navigation})=> {
    const Symbols=[
        {src:Images.FrontAndBehind,label:"To stop vehicle apporaching           simultaneously from front and                       behind."},
        {src:Images.ApproachFromleft,label:"To allow vehicles coming from                       right and turning right by stopping traffic approaching from the left."},
        {src:Images.BeckonFromRight,label:"To beckon the vehicles approaching                       from right."},
        {src:Images.BeckonFromleft,label:"To beckon the vehicles approaching                         from left."},
        {src:Images.WaitingToTurnRight,label:"To stop vehicles approaching from                         left and waiting to turn right."},
        {src:Images.FromFront,label:"To stop vehicles coming from front."},
        {src:Images.FromBehind,label:"To stop vehicles coming from                       behind."},
        {src:Images.LeftToTurnRight,label:"To stop vehicles approaching from                        right to allow vehicles from the left                       to turn right."},
        {src:Images.ClosingAllVechile,label:"Warning signal closing all vehicles."}
    ];
    const renderItem=(item)=>{
        return(
        <View
            style={styles.symbolItem}
            key={item.label} 
        >
            <View style={styles.symbolIconContainer}>
                {item.src?
                    (<Image 
                        source={item.src}
                        style={styles.symbolImage}
                        resizeMode='contain'
                        /> 
                    ):(
                        <Text style={styles.fallBack}>{item.label}</Text>
                    )   
                }
            </View>
            <Text style={styles.symbolLabel} numberOfLines={4} ellipsizeMode="tail">
                {item.label}
            </Text>

        </View>

        )
    }
  return (
    <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.backButton}
                onPress={()=>navigation.goBack()}
            >
                <Ionic name="chevron-back" style={styles.backButtonIcon}/>
            </TouchableOpacity>
            <Text style={styles.headerText}>TrafficPoliceSignal</Text>
        </View>
        <View style={styles.contentContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                removeClippedSubviews={true}
                contentContainerStyle={styles.symbolConatiner}
            >
                <View style={styles.symbolGrid}>
                    {Symbols.map(renderItem)}
                </View>
            </ScrollView>
        </View>
    </View>
  )
}

export default TrafficPoliceSignal;
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"#FFFFFF"
    },
    backButton:{
        backgroundColor:"#aeeaed",
        padding:10,
        borderRadius:100,
        elevation:5,
        alignItems:"center",
        justifyContent:"center",
        width:40,
        height:40,
        position:"absolute",
        top:50,
        left:20,
        zIndex:1
    },
    backButtonIcon:{
        fontSize:20,
        color:"#000000"
    },
    headerContainer:{
        backgroundColor:"#35cad1",
        height:"25%"
    },
    headerText:{
        textAlign:"center",
        fontSize:28,
        fontWeight:"700",
        marginTop:70,
        color:"#FFFFFF",
        letterSpacing:1.5,
        marginBottom:20,
    },
    contentContainer:{
        marginTop:-80,
        backgroundColor:"#dbf3f3",
        height:"100%",
        borderTopLeftRadius:50,
        marginBottom:30,
        paddingBottom:150
    },
    symbolConatiner:{
        paddingHorizontal:20,
        paddingBottom:20,
        borderTopLeftRadius:12,
        paddingTop:30,
        marginLeft:20,
    },
    symbolGrid:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-between"
    },
    symbolItem:{
        width:"100%",
        alignItems:"center",
        marginVertical:10,
        padding:10,
        backgroundColor:"#fff",
        borderRadius:8,
        flexDirection:"row",
        justifyContent:"flex-start",
        gap:15,
    },
    symbolIconContainer:{
        width:60,
        height:60,
        justifyContent:"flex-start",
        alignItems:"center",
        marginVertical:10,
        marginLeft:0,
    },
    symbolImage:{
        width:"100%",
        height:"100%",
        maxWidth:100,
        maxHeight:100,
        borderRadius:10
    },
    symbolLabel:{
        fontSize:16,
        fontWeight:"800",
        textAlign:"flex-start",
        color:"#333",
    },
    fallBack:{
        fontSize:12,
        color:"#888",
        textAlign:"center"
    }
})