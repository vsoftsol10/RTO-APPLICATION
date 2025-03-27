import React from 'react';
import { 
    Image, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Platform,
    Dimensions 
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

// Screen width for responsive design
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const images = {
    RightHairPinBend: require('../../../../assets/Cautionary/RightHairPinBend.jpeg'), // Update with actual paths
    LeftHairPinBend: require('../../../../assets/Cautionary/LeftHairPinBend.png'),
    rightandCurve: require('../../../../assets/Cautionary/RightHandCurve.png'),
    LeftHandCurve: require('../../../../assets/Cautionary/LeftHandCurve.jpeg'),
    LeftReverseBend: require('../../../../assets/Cautionary/LeftReverseBend.jpeg'),
    RightReverseBend: require('../../../../assets/Cautionary/RightReverseBend.png'),
    SideRoadLeft: require('../../../../assets/Cautionary/SideRoadLeft.png'),
    SideRoadRight: require('../../../../assets/Cautionary/SideRoadRight.png'),
    TIntersection: require('../../../../assets/Cautionary/TIntersection.jpg'),
    MajorRoadAhead: require('../../../../assets/Cautionary/MajorRoadAhead.png'),
    StaggeredIntersection: require('../../../../assets/Cautionary/StaggeredIntersection.png'),
    CrossRoadAhead: require('../../../../assets/Cautionary/CrossRoadAhead.jpeg'),
    RightYIntersection: require('../../../../assets/Cautionary/RighttYIntersection.png'),
    LeftYintersection: require('../../../../assets/Cautionary/LeftYIntersection.png'),
    TwoWaytraffic: require('../../../../assets/Cautionary/TwoWayTraffic.png'),
    YIntersection: require('../../../../assets/Cautionary/YIntersection.png'),
    RoundaboutAheead: require('../../../../assets/Cautionary/RoundaboutAhead.jpg'),
    GapInMedian: require('../../../../assets/Cautionary/GapInMedian.jpg'),
    PedestrainCrossing: require('../../../../assets/Cautionary/PedestrianCrossing.jpg'),
    NarrowBridgeAhead: require('../../../../assets/Cautionary/NarrowBridgeAhead.png')
};

const Cautionary = ({navigation}) => {
    const Symbol = [
        {src: images.RightHairPinBend, label: "Right Hair Pin Bend"},
        {src: images.LeftHairPinBend, label: "Left Hair Pin Bend"},
        {src: images.rightandCurve, label: "Right Hand Curve"},
        {src: images.LeftHandCurve, label: "Left Hand Curve"},
        {src: images.LeftReverseBend, label: "Left Reverse Bend"},
        {src: images.RightReverseBend, label: "Right Reverse Bend"},
        {src: images.SideRoadLeft, label: "Side Road Left"},
        {src: images.SideRoadRight, label: "Side Road Right"},
        {src: images.TIntersection, label: "T-Intersection"},
        {src: images.MajorRoadAhead, label: "Major Road Ahead"},
        {src: images.StaggeredIntersection, label: "Staggered Intersection"},
        {src: images.CrossRoadAhead, label: "Cross Road Ahead"},
        {src: images.RightYIntersection, label: "Right Y-Intersection"},
        {src: images.LeftYintersection, label: "Left Y-Intersection"},
        {src: images.TwoWaytraffic, label: "Two Way Traffic"},
        {src: images.YIntersection, label: "Y-Intersection"},
        {src: images.RoundaboutAheead, label: "Roundabout Ahead"},
        {src: images.GapInMedian, label: "Gap In Median"},
        {src: images.PedestrainCrossing, label: "Pedestrian Crossing"},
        {src: images.NarrowBridgeAhead, label: "Narrow Bridge Ahead"},
    ];

    const renderItem = (item) => {
        return (
            <View 
                style={styles.symbolItem} 
                key={item.label}
            >
                <View style={styles.symbolIconContainer}>
                    {item.src ? (
                        <Image 
                            source={item.src} 
                            style={styles.symbolImage} 
                            resizeMode="contain"
                            onError={(e) => console.log('Image load error for', item.label, e.nativeEvent.error)}
                        />
                    ) : (
                        <Text style={styles.fallbackText}>{item.label}</Text>
                    )}
                </View>
                <Text style={styles.symbolLabel} numberOfLines={2} ellipsizeMode="tail">
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
                        if (navigation && navigation.navigate) {
                            navigation.goBack();
                        } else {
                            console.warn('Navigation not properly configured');
                        }
                    }}
                >
                    <Ionic name="chevron-back" style={styles.backButtonIcon} />
                </TouchableOpacity>
                
                <Text style={styles.headerText}>Cautionary Signs</Text>
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

export default Cautionary;

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
        paddingBottom:140    
    },
    symbolContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderTopLeftRadius:12,
        paddingTop:30,
        marginLeft:20,
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
        borderRadius: 60,
        elevation: 0,
        flexDirection:"row",
        justifyContent:"flex-start",
        gap:30,
        // marginBottom:10
    },
    symbolIconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft:10
    },
    symbolImage: {
        width: '100%',
        height: '100%',
        maxWidth: 100,
        maxHeight: 100,
        borderRadius:10
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