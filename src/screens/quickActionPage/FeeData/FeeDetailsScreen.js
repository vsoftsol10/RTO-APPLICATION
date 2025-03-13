import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import colors from '../../../constents/colors';
import { StackActions } from '@react-navigation/native';

const FeeDetailsScreen = () => {
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
              <StatusBar barStyle="light-content" backgroundColor={colors.purple} />
      
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
    backgroundColor: colors.purple,
    alignItems: 'center',
    paddingTop:50
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  tableContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.purple,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  idCell: {
    flex: 0.5,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    justifyContent: 'center',
  },
  descriptionCell: {
    flex: 3,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  feeCell: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  cellText: {
    color: '#333',
    fontWeight:"500"
  },
});

export default FeeDetailsScreen;