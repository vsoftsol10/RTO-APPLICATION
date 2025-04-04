import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';

const PermanentRegistration=({navigation})=> {
  return (
   <View style={styles.mainContainer}>
           <View style={styles.headerContainer}>
               <TouchableOpacity
                 activeOpacity={0.7}
                 style={styles.backButton}
                 onPress={() => navigation.goBack()}
               >
                 <Ionic name="chevron-back" style={styles.backIcon} />
               </TouchableOpacity>
   
               <Text style={styles.headerText}>Permanent Registration</Text>
           </View>
           <View style={styles.contentContainer}>
               <ScrollView showsVerticalScrollIndicator={false}>
                   <Text style={styles.topHeader}>Permanent Registration</Text>
                   
                   <Text style={styles.header}>About</Text>
                   <Text style={styles.para}>
                     As per CMVR, the vehicle can be driven or allowed to be driven in public place 
                     only after registration by registering authority as under the provision of 
                     section 39 of motor vehicle Act 1988. An application for registration of a
                     motor vehicle is required to be made to the registering authority within a 
                     period of seven days from the date of taking delivery of such vehicle, 
                     excluding the period of journey.
                   </Text>
                   
                   <Text style={styles.header}>Guidelines</Text>

                   <View style={styles.bulletList}>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Apply for permanent registration of
                             a motor vehicle in Form 20 to the Registering Authority in whose
                             jurisdiction the vehicle is</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>If the vehicle has been temporarily 
                            registered then apply before the temporary registration expires</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Confirm whether the registration 
                            involves hypothecation in which case refer Hypothecation.</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Confirm the type of registration 
                            number (Fancy number/Choice number/General number).</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Confirm about the usage requirement 
                            of HSRP/smart card.</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Pay appropriate fee as specified in 
                            Rule 81 of Central Motor Vehicle Rules 1989 depending on the choice 
                            of registration number and use of HSRP/smart card.</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>•	Pay Tax as per Central Motor 
                            Vehicle Rules 1989 depending on the choice of registration number 
                            and use of HSRP/smart card.</Text>
                       </View>
                   </View>
                   


                   
                   <Text style={styles.header}>Documents Required</Text>

                   <View style={styles.bulletList}>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Application in Form 20</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Sales certificate in Form 21 </Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Road worthiness certificate in Form 22 from the manufacturers (Form 22A from the Body builder)</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Pollution under control certificate</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Valid insurance certificate</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Proof of address (Ration card, Electricity bill etc.)</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Design approval copy of STA in case Trailer or Semi-Trailer</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Original sales certificate from the concerned authorities in Form 21 in case of ex-army vehicle</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Custom's clearance certificate along with license, and bond in case of imported vehicle</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Temporary registration, if any</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Form 34 (in case of HP endorsement)</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Copy of PAN card of Form 60 and Form 61 (as applicable)*</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Permit proceedings in case of transport vehicle*</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Municipal Corporation parking fee*</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Dealer and manufacturer invoice*</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Passport size photographs*</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Proof of Date of Birth*</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Chassis & Engine Pencil Print*</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Form CMV Form 22A in case of Body built vehicle (EX. Goods vehicle, bus etc.)*</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Bonafide agriculture certificate issued by Tehsildar in case of registration of tractor-trailer unit used for agriculture*</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>Form-A under Taxation Act, 1997*</Text>
                       </View>
                   </View>

                   
                   
                   <Text style={styles.header}>Reference</Text>
                   <View style={styles.bulletList}>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>The Motor Vehicles Act 1988 (Section 41 of Chapter IV)</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>The Central Motor Vehicles Rules 1989 (Rule 47)</Text>
                       </View>
                       <View style={styles.bulletItem}>
                           <Text style={styles.bullet}>•</Text>
                           <Text style={styles.bulletText}>State transport official websites</Text>
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
export default PermanentRegistration;
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
        backgroundColor: "white",
        flex: 1,
    },
    topHeader: {
        color: "#333",
        fontSize: 20,
        fontWeight: "700",
        paddingBottom: 12
    },
    header: {
        fontSize: 18,
        fontWeight: "500",
        textDecorationLine: "underline",
        textDecorationColor: "gray",
        marginTop: 16,
        marginBottom: 8
    },
    para: {
        fontSize: 14,
        lineHeight: 20,
        color: "#333",
        textAlign: 'justify',
        marginBottom: 12
    },
    subheader: {
        fontSize: 15,
        fontWeight: "500",
        marginTop: 8,
        marginBottom: 4,
        color: "#444"
    },
    bulletList: {
        marginLeft: 4,
        marginBottom: 12
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 6
    },
    bullet: {
        fontSize: 14,
        marginRight: 6,
        lineHeight: 20,
        color: "#333"
    },
    bulletText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        color: "#333",
        textAlign: 'justify'
    },
    footer: {
        fontSize: 12,
        fontStyle: 'italic',
        color: "#666",
        marginTop: 16,
        marginBottom: 24
    }
})