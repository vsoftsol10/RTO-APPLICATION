import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';

const Images = {
    CenterBarrier: require("../../../../assets/RoadSignals/Centaur-line-marking.png"),
    LaneLine: require("../../../../assets/RoadSignals/Lane-line.png"),
    FourLaneRoad: require("../../../../assets/RoadSignals/Centaur-four-lane-road.png"),
    SixLaneRoad: require("../../../../assets/RoadSignals/Centaur-six-lane-road.png"),
    DoubleWhite: require("../../../../assets/RoadSignals/Double-white.png"),
    BrokenLine: require("../../../../assets/RoadSignals/Solid-broken-line.png"),
    StopLine: require("../../../../assets/RoadSignals/Pedestrian-Crossings.png"),
    GiveWayLine: require("../../../../assets/RoadSignals/Give-way-line.png"),
    EdgeLine: require("../../../../assets/RoadSignals/Board-or-Edge-line.png"),
    ParkingProhibitedLine: require("../../../../assets/RoadSignals/Parking-line.png"),
    yellowJunction: require("../../../../assets/RoadSignals/Yellow-box.png"),
    PedestrianCrossing: require("../../../../assets/RoadSignals/Pedestrian-Crossings.png")
};

const RoadSignals = ({ navigation }) => {
    const Symbol = [
        {src: Images.CenterBarrier, label: "Centre line marking for a Two lane road."},
        {src: Images.LaneLine, label: "Lane line and Broken centre line."},
        {src: Images.FourLaneRoad, label: "Centre barrier line marking for a Four lane road."},
        {src: Images.SixLaneRoad, label: "Centre barrier line marking for a Six lane road."},
        {src: Images.DoubleWhite, label: "Double white / yellow lines :Used where visibility is restricted in both direction."},
        {src: Images.BrokenLine, label: "Combination of solid and Broken lines: If the line on your side is broken, you may cross or straddle it. Overtake - but only if it safe to do so. If the line on your side is continues you must not cross or straddle it."},
        {src: Images.StopLine, label: "Stop Line : A stop line is a signal solid transverse line painted before the intersecting edge of the road junction / intersection."},
        {src: Images.GiveWayLine, label: "Give Way Line : The give way line is usually a double dotted line marked transversely at junctions."},
        {src: Images.EdgeLine, label: "Board or Edge Lines : These are continues lines at the edge of the carriageway and mark the limits of the main carriageway up to which a driver can safely venture."},
        {src: Images.ParkingProhibitedLine, label: "Parking Prohibited Lines : A solid continues yellow line painted on help or edge of the carriageway alone with a 'No Parking' sign indicates the extent of no parking area."},
        {src: Images.yellowJunction, label: "Yellow Box Junctions or Keep Clear: These are yellow crossed diagonal lines within the box. The vehicles should cross it only if they have a clear space available ahead of the yellow box. In this marked area vehicles must not stop even briefly."},
        {src: Images.PedestrianCrossing, label: "Pedestrian Crossings : These are alternate black and white stripes painted parallel to the road generally known as zebra crossing. Pedestrians must cross only at the point where these lines are provided and when the signal is in their favour at controlled crossings. You must stop and give way to pedestrians at these crossings. Pedestrian crossings are marked to facilitate and give the right of way to pedestrians."},
    ];

    const renderItem = (item) => {
        return (
            <View 
                style={styles.symbolItem}
                key={item.label}
            >
                <View style={styles.symbolIconContainer}>
                    {item.src? 
                    <Image
                        source={item.src}
                        style={styles.symbolIcon}
                        resizeMode='contain'
                    />
                        :
                        <Text style={styles.fallBack}>{item.label}</Text>
                    }
                </View>
                <Text 
                    style={styles.symbolLabel} 
                    numberOfLines={12}  // Limit to 2 lines
                    ellipsizeMode='tail'  // Add ellipsis if text overflows
                >
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
                <Text style={styles.headerText}>RoadSignals</Text>
            </View>
            <View style={styles.contentContainer}>
                <ScrollView
                    contentContainerStyle={styles.symbolContainer}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    scrollEventThrottle={16}
                >
                    <View style={styles.symbolGrid}>
                        {Symbol.map(renderItem)}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default RoadSignals;

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
        flexDirection: 'column',  // Change to column to match the image
        gap: 10  // Add some spacing between items
    },
    symbolItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#fff',
        borderRadius: 10,  // Reduced border radius
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
    },
    symbolIconContainer: {
        width: 50,
        height: 50,
        marginRight: 15,  // Add some margin between icon and text
        justifyContent: 'center',
        alignItems: 'center'
    },
    symbolIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    symbolLabel: {
        flex: 1,  // Allow text to take remaining space
        fontSize: 16,
        color: '#333',
        textAlign:"justify",
        flexWrap: 'wrap',
        marginRight: 10,  // Add some right margin
        fontWeight:"600"
    },
    fallBack: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
    }
});