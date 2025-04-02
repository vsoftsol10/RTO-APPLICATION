import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import Ionic from 'react-native-vector-icons/Ionicons';

const images = {
    telephone: require("../../../../assets/Informatory/phone.jpg"),
    petrol: require("../../../../assets/Informatory/petrol.jpg"),
    hospital: require("../../../../assets/Informatory/Hospital.jpeg"),
    Eatingplace: require("../../../../assets/Informatory/EatingPlace.jpg"),
    LightRefreshment: require("../../../../assets/Informatory/Refreshment.png"),
    NoThroughRoad: require("../../../../assets/Informatory/NoThrougRoad.jpg"),
    NoThroughSideRoad: require("../../../../assets/Informatory/NoThroughSideRoad.jpg"),
    FirstAidPost: require("../../../../assets/Informatory/firstAid.webp"),
    ParkThisSide: require("../../../../assets/Informatory/ParkingThisSide.png"),
    ParkingBothSide: require("../../../../assets/Informatory/ParkingBothSide.png"),
    ParkingLotBike: require("../../../../assets/Informatory/Parking-bike.png"),
    ParkingLotCycle: require("../../../../assets/Informatory/Parking-cycle.png"),
    ParkingLotTaxi: require("../../../../assets/Informatory/Parking-taxi.png"),
    ParkingLotAuto: require("../../../../assets/Informatory/Parking-auto.png"),
}

const Informatory = ({ navigation }) => {
    const symbol = [
        { src: images.telephone, label: "Public Telephone" },
        { src: images.petrol, label: "Petrol Pump" },
        { src: images.hospital, label: "Hospital" },
        { src: images.Eatingplace, label: "Eating Place" },
        { src: images.LightRefreshment, label: "Light Refreshment" },
        { src: images.NoThroughRoad, label: "No Through Road" },
        { src: images.NoThroughSideRoad, label: "No Through Side Road" },
        { src: images.FirstAidPost, label: "First Aid Post" },
        { src: images.ParkThisSide, label: "Park This Side" },
        { src: images.ParkingBothSide, label: "Parking Both Side" },
        { src: images.ParkingLotBike, label: "Parking Lot Bike" },
        { src: images.ParkingLotCycle, label: "Parking Lot Cycle" },
        { src: images.ParkingLotTaxi, label: "Parking Lot Taxi" },
        { src: images.ParkingLotAuto, label: "Parking Lot Auto" },
    ];

    const renderItem = (item) => {
        return (
            <View 
                style={styles.symbolItem}
                key={item.label}
            >
                <View style={styles.symbolIconContainer}>
                    {item.src ? 
                        <Image 
                            source={item.src}
                            style={styles.symbolImage}
                            resizeMode="contain"
                        />
                    : <Text style={styles.fallbackText}>{item.label}</Text>
                    }
                </View>
                <Text style={styles.symbolLabel} numberOfLines={2} ellipsizeMode='tail'>
                    {item.label}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.backButton}
                    onPress={() => {
                        if (navigation && navigation.goBack) {
                            navigation.goBack();
                        } else {
                            console.warn('Navigation not properly configured');
                        }
                    }}
                >
                    <Ionic name="chevron-back" style={styles.backButtonIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Informatory Sign</Text>
            </View>
            <View style={styles.contentContainer}>
                <ScrollView
                    contentContainerStyle={styles.symbolContainer}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    scrollEventThrottle={16}
                >
                    <View style={styles.symbolGrid}>
                        {symbol.map(renderItem)}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Informatory;

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
    headerContainer: {
        backgroundColor: "#35cad1",
        height: "25%"
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
    contentContainer: {
        marginTop: -80,
        backgroundColor: "#dbf3f3",
        height: "100%",
        borderTopLeftRadius: 50,
        marginBottom: 30,
        paddingBottom: 150
    },
    symbolContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderTopLeftRadius: 12,
        paddingTop: 30,
        marginLeft: 20,
    },
    symbolGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    symbolItem: {
        width: "100%",
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 0,
        flexDirection: "row",
        justifyContent: "flex-start",
        gap:15
    },
    symbolIconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 5,
        marginLeft: 10
    },
    symbolImage: {
        width: '100%',
        height: '100%',
        maxWidth: 100,
        maxHeight: 100,
        borderRadius: 10
    },
    symbolLabel: {
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        color: '#333'
    },
    fallbackText: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
    }
});