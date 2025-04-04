import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import Ionic from 'react-native-vector-icons/Ionicons';
  

const Reassignment=({navigation})=> {
  return (
    <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Ionic name="chevron-back" style={styles.backIcon} />
            </TouchableOpacity>
    
            <Text style={styles.headerText}>Reassignment Of Vehicle</Text>
          </View>
          <View style={styles.contentContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 210}}>
              <Text style={styles.topHeader}>Reassignment</Text>
    
              <Text style={styles.header}>About</Text>
              <Text style={styles.para}>
                When a motor vehicle registered in one States has been kept in another State, 
                for a period exceeding twelve months, the owner of the vehicle shall, 
                within such period and in such form containing such particulars as 
                may be prescribed by the Central Government, apply to the registering authority, 
                within whose jurisdiction the vehicle then is, for the assignment of a new
                registration mark and shall present the certificate of registration to that 
                registering authority.
              </Text>
    
              <Text style={styles.header}>Guidelines</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Apply for assignment of new registration mark to a motor vehicle in Form 27 
                    within 12 months of re-assignment of the vehicle from one state to another.
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Pay appropriate fee and tax as specified in rule 81 of the 
                    Central Motor Vehicle Rules 1989.
                  </Text>
                </View>
              </View>
    
              <Text style={styles.header}>Documents Required</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Application in Form 27.</Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Certificate of registration
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Proof of residence
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    No Objection Certificate
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Insurance certificate
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Pollution under control certificate
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Form 28*
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Form 20*
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Challan clearance from traffic police or enforcement 
                    wing of transport department (in case of commercial vehicles)*
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Fitness certificate*
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    PAN Card or Form 60 and Form 61 ( as applicable)*
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Parking fee*
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Certificate manufactured regarding emission norms*
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Chassis & Engine Pencil Print*
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Proof of Date of Birth*
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Proof of seller's address*
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Signature identification of seller
                  </Text>
                </View>
              </View>
              <Text style={styles.header}>Reference</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    The Motor Vehicles Act 1988 (Section 47 of Chapter IV)
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    The Central Motor Vehicles Rules 1989 (Rule 54)
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    State transport official websites
                  </Text>
                </View>
              </View>
    
              <Text style={styles.footer}>
                Documents marked with asterisk (*) may be required in some states.
              </Text>
            </ScrollView>
          </View>
        </View>
  )
}
export default Reassignment;
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      headerContainer: {
        padding: 16,
        backgroundColor: '#35cad1',
        position: 'relative',
        height: '18%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        backgroundColor: '#dbf3f3',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
      backIcon: {
        fontSize: 22,
        color: '#35cad1',
      },
      headerText: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 80,
        color: 'white',
        letterSpacing: 0.5,
      },
      contentContainer: {
        padding: 16,
        backgroundColor: 'white',
        flex: 1,
      },
      topHeader: {
        color: '#333',
        fontSize: 20,
        fontWeight: '700',
        paddingBottom: 12,
      },
      header: {
        fontSize: 18,
        fontWeight: '500',
        textDecorationLine: 'underline',
        textDecorationColor: 'gray',
        marginTop: 16,
        marginBottom: 8,
      },
      para: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
        textAlign: 'justify',
        marginBottom: 12,
      },
      subheader: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: 8,
        marginBottom: 4,
        color: '#444',
      },
      bulletList: {
        marginLeft: 4,
        marginBottom: 12,
      },
      bulletItem: {
        flexDirection: 'row',
        marginBottom: 6,
      },
      bullet: {
        fontSize: 14,
        marginRight: 6,
        lineHeight: 20,
        color: '#333',
      },
      bulletText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
        textAlign: 'justify',
      },
      footer: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#666',
        marginTop: 16,
        marginBottom: 24,
      },
})