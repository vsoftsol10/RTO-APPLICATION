import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../../../constents/colors';

const DrivingLicense = ({navigation}) => {
    const handleBack = () => {
        navigation.navigate("Home")
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor={colors.purple} />
            
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Steps to Get Driving License</Text>
            </View>
            
            {/* Steps Section */}
            <View style={styles.container}>
                <View style={styles.stepsContainer}>
                    {[
                        "Authentication with E-KYC",
                        "Personal Details",
                        "Address Details",
                        "Book Slot with Date",
                        "Document Submission",
                    ].map((step, index) => (
                        <View key={index} style={styles.stepContainer}>
                            <View style={styles.stepNumberContainer}>
                                <Text style={styles.stepNumber}>{index + 1}</Text>
                            </View>
                            <Text style={styles.stepText}>{step}</Text>
                        </View>
                    ))}
                </View>
            </View>
            
            <View style={styles.backBtnContainer}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    activeOpacity={0.7} 
                    onPress={handleBack}
                >
                    <Text style={styles.backButtonTxt}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DrivingLicense;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerContainer: {
        backgroundColor: colors.purple,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: "center",
        paddingTop: 70,
        elevation: 8,
        shadowColor: colors.darkGrey,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    header: {
        color: colors.white,
        fontSize: 24,
        fontWeight: "700",
        letterSpacing: 1.2,
    },
    container: {
        padding: 20,
        flex: 1,
    },
    stepsContainer: {
        gap: 16,
    },
    stepContainer: {
        backgroundColor: colors.border,
        padding: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: colors.darkGrey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flexDirection: "row",
        alignItems: "center",
    },
    stepNumberContainer: {
        backgroundColor: colors.purple,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    stepNumber: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "700",
    },
    stepText: {
        fontSize: 17,
        fontWeight: "500",
        color: colors.darkGrey,
        flex: 1,
    },
    backBtnContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 30,
        marginTop:50,
    },
    backButton: {
        alignItems: "center",
        backgroundColor: colors.purple,
        width: "50%",
        padding: 14,
        borderRadius: 10,
        elevation: 4,
        shadowColor: colors.purple,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:0.25,
        shadowRadius: 3,

    },
    backButtonTxt: {
        fontSize: 18,
        color: "#ffffff",
        letterSpacing: 2,
        fontWeight: "600",

    }
});