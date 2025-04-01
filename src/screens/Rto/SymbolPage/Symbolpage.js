import React from 'react';
import { StyleSheet, Text, View,  Image } from 'react-native';
import {TouchableOpacity} from 'react-native'
import Ionic from 'react-native-vector-icons/Ionicons';

const SymbolPage = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionic name="chevron-back" style={styles.backIcon} />
        </TouchableOpacity>
      
        <Text style={styles.headerText}>RTO Symbols</Text>

      </View>
      
      <View style={styles.symbolContainer}>
        <TouchableOpacity 
          style={styles.symbolItem} 
          onPress={() => navigation.navigate('mandatory')}
          activeOpacity={0.8}
        >
          <View style={[styles.symbolIconContainer]}>
            <Image source={require("../../../../assets/50.webp")} style={styles.MandIcon}></Image>
          </View>
          <Text style={styles.symbolLabel}>Mandatory</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.symbolItem} 
          onPress={() => navigation.navigate('cautionary')}
          activeOpacity={0.8}
        >
          <View style={[styles.symbolIconContainer]}>
            <Image source={require("../../../../assets/caution.png")} style={styles.CautionIcon}/>
          </View>
          <Text style={styles.symbolLabel}>Cautionary</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.symbolItem} 
          onPress={() => navigation.navigate('Informatory')}
          activeOpacity={0.8}
        >
          <View style={[styles.symbolIconContainer]}>
            <Image source={require("../../../../assets/informatory.jpg")} style={styles.informatoryIcon} />
          </View>
          <Text style={styles.symbolLabel}>Informatory</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.symbolItem} 
          onPress={() => navigation.navigate('RoadSignals')}
          activeOpacity={0.8}
        >
          <View style={[styles.symbolIconContainer, ]}>
          <Image source={require("../../../../assets/RoadSignals.png")} style={styles.RoadSignalIcon} />
          </View>
          <Text style={styles.symbolLabel}>Road & Signals</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.symbolItem} 
          onPress={() => navigation.navigate('DrivingRules')}
          activeOpacity={0.8}
        >
          <View style={[styles.symbolIconContainer]}>
           <Image source={require("../../../../assets/rules.jpg")} style={styles.RoadSignalIcon} />
          </View>
          <Text style={styles.symbolLabel}>Driving Rules</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.symbolItem} 
          onPress={() => navigation.navigate('TrafficPolice')}
          activeOpacity={0.8}
        >
          <View style={[styles.symbolIconContainer, ]}>
          <Image source={require("../../../../assets/trafficPolice.webp")} style={styles.trafficPoliceIcon} />
          </View>
          <Text style={styles.symbolLabel}>Traffic Police Signals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  headerContainer:{
    backgroundColor:"#35cad1",
    height:"25%"
  },
  headerText: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 70,
    color: "#fff",
    letterSpacing: 2
  },
  backButton: {
    backgroundColor: "#aeeaed",
    marginTop: 20,
    padding: 10,
    borderRadius: 100,
    elevation: 5,
    alignItems: "center",
    aspectRatio: 1/1,
    width: 40,
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1
  },
  backIcon: {
    fontSize: 20,
    color: "black"
  },
 
  symbolContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    marginTop:-60,
    backgroundColor:"#dbf3f3",
    borderTopLeftRadius:40,
    height:"100%"
  },
  symbolItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginTop:20,

  },
  symbolIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  symbolIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  symbolLabel: {
    fontSize: 18,
    fontWeight: '500'
  },
  MandIcon:{
    width:50,
    height:50,
   },
  CautionIcon:{
    width:40,
    height:40,
  },
  informatoryIcon:{
    width:40,
    height:40,
  },
  RoadSignalIcon:{
    width:38,
    height:40,
  },
  trafficPoliceIcon:{
    width:70,
    height:60,
  }
});

export default SymbolPage;