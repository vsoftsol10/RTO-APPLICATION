import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import colors from '../../../constents/colors';
import { StackActions } from '@react-navigation/native';

const FeeDetailsScreen = ({navigation}) => {
  const hanldleBack=()=>{
    navigation.navigate("Home")
  }
  const feeData = [
    {
      id: 1,
      description: "Issue of learner's license in Form 3 for each class of vehicle",
      fee: "Rs.150/-"
    },
    {
      id: 2,
      description: "Learner's license test fee or repeat test fee, as the case may be",
      fee: "Rs.50/-"
    },
    {
      id: 3,
      description: "For test, or repeat test, as the case may be, of competence to drive (for each class of vehicle)",
      fee: "Rs.300/-"
    },
    {
      id: 4,
      description: "Issue of a driving license",
      fee: "Rs.200/-"
    },
    {
      id: 5,
      description: "Issue of International Driving Permit",
      fee: "Rs.1000/-"
    },
    {
      id: 6,
      description: "Addition of another class of vehicle to driving license",
      fee: "Rs.500/-"
    },
    {
      id: 7,
      description: "Renewal of driving license",
      fee: "Rs.200/-"
    },
    {
      id: 8,
      description: "Renewal of a driving license for which application is made after the grace period",
      fee: "Rs. 300.00/- (Additional fee at the rate of Rupees One Thousand Only for delay of each year or part thereof reckoned from the date of expiry of the grace period shall be levied.)"
    },
    {
      id: 9,
      description: "Any application for change in address or any other particulars recorded in the driving licence e.g. address etc.",
      fee: "Rs.200/-"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
              <StatusBar barStyle="light-content" backgroundColor={"#35cad1"} />
      
      <ScrollView horizontal={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Fee Details</Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <View style={styles.idCell}>
              <Text style={styles.headerText}>No.</Text>
            </View>
            <View style={styles.descriptionCell}>
              <Text style={styles.headerText}>Description</Text>
            </View>
            <View style={styles.feeCell}>
              <Text style={styles.headerText}>Fee</Text>
            </View>
          </View>
          
          {feeData.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <View style={styles.idCell}>
                <Text style={styles.cellText}>{item.id}</Text>
              </View>
              <View style={styles.descriptionCell}>
                <Text style={styles.cellText}>{item.description}</Text>
              </View>
              <View style={styles.feeCell}>
                <Text style={styles.cellText}>{item.fee}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button } activeOpacity={0.8} onPress={hanldleBack}>
            <Text style={styles.btnTxt}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#35cad1",
    alignItems: 'center',
    paddingTop:70
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  tableContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#35cad1',
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: "#35cad1",
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#35cad1',
  },
  idCell: {
    flex: 0.5,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#35cad1',
    justifyContent: 'center',
  },
  descriptionCell: {
    flex: 3,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#35cad1',
  },
  feeCell: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize:16,
  },
  cellText: {
    color: '#333',
    fontWeight:"500"
  },
  buttonContainer:{
    alignItems:"center",
    backgroundColor:"#35cad1",
    width:"50%",
    marginLeft:"25%",
    marginVertical:10,
    marginBottom:20,
    borderRadius:10
  },
  button:{
    padding:10,
  },
  btnTxt:{
    color:colors.white,
    fontSize:16,
    fontWeight:"600",
    letterSpacing:1.5,
  }
});

export default FeeDetailsScreen;