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

// Static image imports
const images = {
    speedLimit: require('../../../../assets/symbol/50.webp'),
    noEntry: require('../../../../assets/symbol/NO_ENTRY.png'),
    oneWaySign: require('../../../../assets/symbol/One-Way-Sign-Entry-Allowed.png'),
    rightTurnProhibited: require('../../../../assets/symbol/Right-turn-prohibited.png'),
    leftTurnProhibited: require('../../../../assets/symbol/left-turn-prohibited.png'),
    oneWayEntryProhibited: require('../../../../assets/symbol/One-Way-Entry-Prohibited.jpg'),
    loadLimit: require('../../../../assets/symbol/Load-Limit.webp'),
    vehicleProhibited: require('../../../../assets/symbol/Vehicle-Prohibited.jpeg'),
    hornProhibited: require('../../../../assets/symbol/Horn-Prohibited.png'),
    uTurnProhibited: require('../../../../assets/symbol/U-turn-Prohibited.png'),
    overtakingProhibited: require('../../../../assets/symbol/Overtaking-Prohibited.png'),
    noParking: require('../../../../assets/symbol/No-Parking.webp'),
    widthLimit: require('../../../../assets/symbol/Width-Limit.jpeg'),
    heightLimit: require('../../../../assets/symbol/Height-Limit.png'),
    noStoppingStanding: require('../../../../assets/symbol/No-Standing-no-Stopping.jpg'),
    restrictionEnds: require('../../../../assets/symbol/RestrictionEnds.jpg'),
    stop: require('../../../../assets/symbol/Stop.png'),
    compulsoryRightTurn: require('../../../../assets/symbol/Compulsory-Right-Turn.webp'),
    compulsoryLeftTurn: require('../../../../assets/symbol/Cumpulsory-Left-Turn.png'),
    compulsoryAhead: require('../../../../assets/symbol/Compulsory-Ahead.jpg'),
    compulsoryKeepLeft: require('../../../../assets/symbol/Compulsory-Keep-Left.jpg'),
    aheadOrLeft: require('../../../../assets/symbol/ahead-or-left.jpg'),
    aheadOrRight: require('../../../../assets/symbol/Ahead-or-Right.jpeg'),
    compulsorySoundHorn: require('../../../../assets/symbol/compulsory-Sound-Horn.jpg'),
    giveWay: require('../../../../assets/symbol/Give-Way.jpg'),
};

const Mandatory = ({navigation}) => {
    const Symbol = [
        {src: images.speedLimit, label: "Speed Limit"},
        {src: images.noEntry, label: "No Entry"},
        {src: images.oneWaySign, label: "One Way Sign, Entry Allowed"},
        {src: images.rightTurnProhibited, label: "Right Turn Prohibited"},
        {src: images.leftTurnProhibited, label: "Left Turn Prohibited"},
        {src: images.oneWayEntryProhibited, label: "One Way, Entry Prohibited"},
        {src: images.loadLimit, label: "Load Limit"},
        {src: images.vehicleProhibited, label: "Entry Prohibited in Both Direction"},
        {src: images.hornProhibited, label: "Horn Prohibited"},
        {src: images.uTurnProhibited, label: "U-turn Prohibited"},
        {src: images.overtakingProhibited, label: "Overtaking Prohibited"},
        {src: images.noParking, label: "No Parking"},
        {src: images.widthLimit, label: "Width Limit"},
        {src: images.heightLimit, label: "Height Limit"},
        {src: images.noStoppingStanding, label: "No Stopping or Standing"},
        {src: images.restrictionEnds, label: "Restriction Ends"},
        {src: images.stop, label: "Stop"},
        {src: images.compulsoryRightTurn, label: "Compulsory Turn Right"},
        {src: images.compulsoryLeftTurn, label: "Compulsory Turn Left"},
        {src: images.compulsoryAhead, label: "Compulsory Ahead Only"},
        {src: images.compulsoryKeepLeft, label: "Compulsory keep Left"},
        {src: images.aheadOrLeft, label: "Compulsory Ahead or Turn Left"},
        {src: images.aheadOrRight, label: "Compulsory Ahead or Turn Right"},
        {src: images.compulsorySoundHorn, label: "Compulsory Sound Horn"},
        {src: images.giveWay, label: "Give Way"},
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
            
                <Text style={styles.headerText}>Mandatory Signs</Text>
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

export default Mandatory;

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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    symbolItem: {
        width: "100%", // Two columns with spacing
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 0,
        flexDirection:"row",
        justifyContent:"flex-start",
        gap:30
    },
    symbolIconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
        marginLeft:0
    },
    symbolImage: {
        width: '100%',
        height: '100%',
        maxWidth: 100,
        maxHeight: 100,
        borderRadius:70
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