import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';

const AddressChange = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionic name="chevron-back" style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.headerText}>Address Change</Text>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 0}}>
          <Text style={styles.topHeader}>Address Change</Text>

          <Text style={styles.header}>About</Text>
          <Text style={styles.para}>
            The Motor Vehicle Act 1988 gives provision to apply for recording a 
            change of residence address of registered owner in the certificate 
            of registration of the motor vehicle.
          </Text>

          <Text style={styles.header}>Guidelines</Text>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Apply for recording the change in residence (within 14 days of address changed) 
                in the certificate of registration of a motor vehicle of the registered owner 
                of the vehicle in Form 33.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Pay appropriate fee as specified in rule 81 of the 
                Central Motor Vehicle Rules 1989.
              </Text>
            </View>
          </View>

          <Text style={styles.header}>Documents Required</Text>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Application in Form 33.</Text>
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
                Proof of new address
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Valid insurance certificate
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Pollution under control certificate.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                No Objection Certificate from financier (in case of hypothecation)*.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Smart card fee*.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Attested cop of PAN card or Form 60 and Form 61(as applicable)*.
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
                Signature Identification of owner*
              </Text>
            </View>
          </View>
          <Text style={styles.header}>Reference</Text>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                The Motor Vehicles Act 1988 (Section 49 of Chapter IV)
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                The Central Motor Vehicles Rules 1989 (Rule 59)
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
  );
};
export default AddressChange;

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
});
