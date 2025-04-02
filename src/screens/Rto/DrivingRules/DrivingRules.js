import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';


const Images={
    turnLeft:require("../../../../assets/DrivingRules/Driving-Rules1.png"),
    turnRight:require("../../../../assets/DrivingRules/Driving-Rules2.png"),
    stop:require("../../../../assets/DrivingRules/Driving-Rules3.png"),
    slowDown:require("../../../../assets/DrivingRules/Driving-Rules4.png"),
    overTake:require("../../../../assets/DrivingRules/Driving-Rules5.png")
}

const DrivingRules=({navigation})=> {
    const Symbols=[
        {src:Images.turnLeft,label:"I intend to move in to the left or                        turn left."},
        {src:Images.turnRight,label:"I intend to move out of the right or         changing the lane or turn right."},
        {src:Images.stop,label:"I intend to stop."},
        {src:Images.slowDown,label:"I intend to Slow Down."},
        {src:Images.overTake,label:"Indicating the car following you to         overtake."}
    ];
    const renderItem=(item)=>{
        return(
            <View 
                style={styles.symbolItem}
                key={item.label}
            >
                <View style={styles.symbolIconContainer}>
                    {
                        item.src?
                       ( <Image
                            style={styles.symbolImage}
                            source={item.src}
                            resizeMode='contain'
                        />)
                        :
                        (<Text style={styles.fallBack}>{item.label}</Text>)
                    }
                </View>
                <Text style={styles.symbolLabel} numberOfLines={3} ellipsizeMode='tail'>
                    {item.label}
                </Text>
            </View>
        )
    }
  return (
    <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
            <TouchableOpacity 
                style={styles.backButton}
                activeOpacity={0.8}
                onPress={()=>navigation.goBack()}
            >
                <Ionic name="chevron-back"  style={styles.backButtonIcon}/>
            </TouchableOpacity>
            <Text style={styles.headerText}>DrivingRules</Text>
        </View>
        <View style={styles.contentContainer}>
            <ScrollView
                contentContainerStyle={styles.symbolContainer}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
            >
                <View style={styles.symbolGrid}>
                    {Symbols.map(renderItem)}
                </View>
            </ScrollView>
        </View>
    </View>
  )
}

export default DrivingRules;
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    backButton: {
        backgroundColor: "#aeeaed",
        padding: 10,
        borderRadius: 100,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 1
    },
    backButtonIcon: {
        fontSize: 20,
        color: "black"
    },
    headerContainer:{
        backgroundColor:"#35cad1",
        height:"25%"
    },
    headerText: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "700",
        marginTop: 70,
        color: "white",
        letterSpacing: 1.5,
        marginBottom: 20
    },
    contentContainer:{
        marginTop:-80,
        backgroundColor:"#dbf3f3",
        height:"100%",
        borderTopLeftRadius:50,
        marginBottom:30,
        paddingBottom:150
    },
    symbolContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderTopLeftRadius:12,
        paddingTop:30,
        marginLeft:20,
    },
    symbolGrid: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    symbolItem: {
        width: "100%", 
        alignItems: 'center',
        paddingVertical: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 0,
        flexDirection:"column",
        justifyContent:"flex-start",
        gap:15,
        marginBottom:10
    },
    symbolIconContainer: {
        width: 100,
        height: 100,
        justifyContent:"center",
        alignItems:"center",

        marginLeft:0
    },
    symbolImage: {
        width: '100%',
        height: '100%',
        maxWidth: 100,
        maxHeight: 100,
        borderRadius:10,
    },
    symbolLabel: {
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        color: '#333',
        marginTop:-10

    },
    fallbackText: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',

    }
})