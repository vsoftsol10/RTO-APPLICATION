import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

const OwnershipTransferScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.headerContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <Ionic name="chevron-back" style={styles.backIcon} />
              </TouchableOpacity>
      
              <Text style={styles.headerText}>Ownership Transfer</Text>
            </View>
      
      <ScrollView style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Ownership Transfer</Text>
          
          <Text style={styles.subHeading}>About</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Transfer of ownership in case of normal sale 
              When a vehicle is sold, the name of the purchaser is noted as the registered owner in place of the previous registered owner and the process is known as transfer of ownership.
            </Text>
          </View>
          
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Transfer of ownership on death of owner of the vehicle 
              When the registered owner of a vehicle dies, transfer of ownership is affected in favour of the legal heirs of the deceased registered owner. Where the owner of a motor vehicle dies, the person succeeding to the possession of the vehicle may for a period of three months, use the vehicle as if it has been transferred to him where such person has, within thirty days of the death of the owner informs the registering authority of the occurrence of the death of the owner and of his own intention to use the vehicle
            </Text>
          </View>
          
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Transfer of ownership of vehicle purchased in public auction 
              When a vehicle is sold in public auction, the name of the purchaser is noted as the registered owner in place of the previous registered owner and the process is known as transfer of ownership on auction.
            </Text>
          </View>
          
          <Text style={styles.subHeading}>Guidelines</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>Transfer of ownership in case of normal sale</Text>
            </Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
              Where the ownership of a motor vehicle is transferred, the transferor shall report the fact of transfer in Form 29 to the registering authorities concerned in whose jurisdiction the transferor and the transferee reside or have their places of business.
            </Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
              in the case of a vehicle registered within the same State, within fourteen days of the transfer, application for the transfer of ownership of a motor vehicle shall be made by the transferee in Form 30 to the registering authorities, and shall be accompanied by set of forms given below under Form I
            </Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
              in the case of a vehicle registered outside the State, within forty-five days of the transfer, application for the transfer of ownership of a motor vehicle shall be made by the transferee in Form 30 to the registering authorities, and shall be accompanied by set of forms given below under Form I and Form II
            </Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
              Pay appropriate fee and tax as specified in rule 81 of the Central Motor Vehicle Rules 1989
            </Text>
          </View>
          
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>Transfer of ownership on death of owner of the vehicle</Text>
            </Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
              Pay appropriate fee and tax as specified in rule 81 of the Central Motor Vehicle Rules 1989
            </Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
              Transfer of ownership of vehicle purchased in public auction
            </Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
              The person who has acquired or purchased a motor vehicle at a public auction conducted by or on behalf of the Central Government or a State Government shall apply in Form 32 within thirty days of taking possession of the vehicle to the registering authority
            </Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
              Pay appropriate fee and tax as specified in rule 81 of the Central Motor Vehicle Rules 1989
            </Text>
          </View>
          
          <Text style={styles.subHeading}>Documents required</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>Transfer of ownership in case of normal sale</Text>
            </Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Form 29</Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Form 30</Text>
          </View>
          
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>Form I</Text>
            </Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Certificate of registration</Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Certificate of insurance</Text>
          </View>
          
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Certificate of pollution under control*</Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>PAN card (seller and purchaser) or Form 60*</Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Chassis & Engine Pencil Print*</Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Proof of Date of Birth of purchaser*</Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Proof of address*</Text>
          </View>

          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>R.C. Book</Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Purchaser's undertaking*</Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Passport size photograph*</Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>Tax clearance certificate*</Text>
          </View>
          

          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>Form II</Text>
            </Text>
          </View>

          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>a no objection certificate granted by the registering authority</Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>an order of the registering authority refusing to grant the no objection certificate; or</Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                where the no objection certificate or the order, as the case may be,
                has not been received, a declaration by the transferor that he has 
                not received any such communication together with—
            </Text>
          </View>
          <View style={styles.DoublenestedBulletPoint}>
            <Text style={styles.bulletDot}>-</Text>
            <Text style={styles.bulletText}>
            	The receipt obtained from the registering authority; or
            </Text>
          </View>
          <View style={styles.DoublenestedBulletPoint}>
            <Text style={styles.bulletDot}>-</Text>
            <Text style={styles.bulletText}>
                The postal acknowledgement received from the registering authority 
                where the application for no objection certificate has been sent by 
                post.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>
                Transfer of ownership on death of owner of the vehicle
              </Text>
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Form 31
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Certificate of registration
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Certificate of insurance
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Death certificate in relation to the registered owner
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Certificate of pollution under control*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                PAN card (successor) or Form 60*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Chassis & Engine Pencil Print*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Proof of Date of Birth of successor*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Proof of address*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Signature Identification of Seller*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Declaration by the applicant and all other Legal Heirs of the deceased
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Verification of vehicle on Form 20*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                R.C. Book
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Passport size photograph*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Proof of succession*
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>
                Transfer of ownership of vehicle purchased in public auction
              </Text>
            </Text>
          </View>

          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Form 32
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Certificate of registration
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Certificate of insurance
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Certificate or order confirming the sale of the vehicle 
                in his favour duly signed by the person authorised to conduct 
                the auction; and
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Certified copy of the order of the Central Government or State 
                Government authorising the auction of the vehicle
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Certificate of pollution under control*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                PAN card (seller and purchaser) or Form 60*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Chassis & Engine Pencil Print*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Proof of Date of Birth of purchaser*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Proof of address*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Purchaser's undertaking*
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                R.C. Book
            </Text>
          </View>
          <View style={styles.nestedBulletPoint}>
            <Text style={styles.bulletDot}>○</Text>
            <Text style={styles.bulletText}>
                Passport size photograph*
            </Text>
          </View>
          <Text style={styles.subHeading}>Reference</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
                 The Motor Vehicles Act 1988 (Section 50 of Chapter IV)
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
                The Central Motor Vehicles Rules 1989 (Rule 55, 56, 57)
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
                State transport official websites
            </Text>
          </View>
          <Text style={styles.footer}>
              Documents marked with asterisk (*) may be required in some states.
          </Text>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    top: 50,
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
    marginTop: 40,
    color: 'white',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    paddingBottom:20
  },
  contentContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: 10,
  },
  nestedBulletPoint: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  DoublenestedBulletPoint:{
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 10,
  },
  bulletDot: {
    width: 15,
    fontSize: 16,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 16,
    marginBottom: 24,
    fontWeight:"700"
  },
});

export default OwnershipTransferScreen;