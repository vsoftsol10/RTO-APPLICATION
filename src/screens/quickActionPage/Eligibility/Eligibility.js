import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, SafeAreaView, StatusBar, Platform, Touchable, TouchableOpacity } from 'react-native';
import colors from '../../../constents/colors';

const { width, height } = Dimensions.get('window');


const Eligibility = ({navigation}) => {
    const handleBack=()=>{
        navigation.navigate("Home")
    }
  const licenseData = [
    {
      type: 'Cars and Motorcycles with Gear',
      requirements: [
        'Minimum 18 years old.',
        'Should be aware of traffic rules and regulations.',
        'Must have valid age proof and address proof documents.',
        'Must pass both theory and practical driving tests.'
      ]
    },
    {
      type: 'Motorcycles without Gear (engine capacity up to 50cc)',
      requirements: [
        'Minimum 16 years old.',
        'Should have the consent of parent/guardian if under 18.',
        'Must be aware of traffic rules and regulations.',
        'Must have valid age proof and address proof documents.',
        'Must pass the required driving tests.'
      ]
    },
    {
      type: 'Heavy Commercial Vehicles',
      requirements: [
        'Should have cleared the 8th standard examination.',
        'Should be above the age of 20 years.',
        'Should be trained from an authorized driving training school.',
        'Must have at least 1 year experience driving light motor vehicles.',
        'Must pass specialized commercial vehicle driving tests.',
        'Medical fitness certificate required.'
      ]
    },
    {
      type: 'Transport Vehicles',
      requirements: [
        'Minimum 20 years old.',
        'Should possess a valid light motor vehicle license for at least 12 months.',
        'Must pass additional transport vehicle tests.',
        'Should have knowledge of vehicle maintenance and repair.'
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.purple} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Eligibility for Driving License in Tamil Nadu</Text>
          <Text style={styles.subtitle}>
            To be eligible for a driving license in Tamil Nadu, applicants must meet the following criteria:
          </Text>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Vehicle Type</Text>
              <Text style={[styles.tableHeaderText, styles.requirementsColumn]}>Eligibility Requirements</Text>
            </View>
            
            {licenseData.map((item, index) => (
              <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                <View style={styles.typeCell}>
                  <Text style={styles.typeCellText}>{item.type}</Text>
                </View>
                <View style={[styles.requirementsCell, styles.requirementsColumn]}>
                  {item.requirements.map((req, reqIndex) => (
                    <View key={reqIndex} style={styles.requirementItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.requirementText}>{req}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View style={styles.backBtnContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={handleBack} >
                <Text style={styles.backButtonTxt}>Back</Text>
            </TouchableOpacity>
          </View>
          {/* Added some bottom padding to prevent overflow issues */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.purple,
    // Remove fixed top positioning
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: colors.purple,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    paddingTop:50,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 24, // Ensure content doesn't get cut off at bottom
  },
  tableContainer: {
    marginTop: 16,
    marginBottom: 16, 
    marginHorizontal: 8,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: 'white',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.purple,
    padding: 12,
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  requirementsColumn: {
    flex: 3,
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  evenRow: {
    backgroundColor: 'white',
  },
  oddRow: {
    backgroundColor: '#F8FAFC',
  },
  typeCell: {
    flex: 2,
    padding: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  typeCellText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.lightText,
  },
  requirementsCell: {
    flex: 3,
    padding: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
  },
  requirementItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bulletPoint: {
    width: 16,
    fontSize: 14,
    color: '#3B82F6',
  },
  requirementText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20, // Extra space at bottom to prevent overflow
  },
  backButton:{
    alignItems:"center",
    backgroundColor:colors.purple,
    width:"50%",
    padding:10,
    borderRadius:10

  },
  backBtnContainer:{
    alignItems:"center",
    justifyContent:"center"
  },
  backButtonTxt:{
    fontSize:18,
    color:colors.white,
    letterSpacing:2,
    fontWeight:"600"
  }
});

export default Eligibility;