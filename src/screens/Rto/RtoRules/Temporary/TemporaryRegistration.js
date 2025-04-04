import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';

export default function TemporaryRegistration({navigation}) {
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

            <Text style={styles.headerText}>Temporary Registration</Text>
        </View>
        <View style={styles.contentContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.topHeader}>Temporary Registration</Text>
                
                <Text style={styles.header}>About</Text>
                <Text style={styles.para}>
                    A temporary registration number is assigned by the dealership from which 
                    the vehicle is purchased which serves the purpose when the vehicle is brand new 
                    and is yet to be permanently registered. This unique number is normally valid
                    for a period of maximum one month, in which the vehicle should be registered by 
                    the concerned Regional Transport Office (RTO) authority.
                </Text>
                
                <Text style={styles.header}>Guidelines</Text>
                <Text style={styles.subheader}>For temporary registration</Text>
                <View style={styles.bulletList}>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Apply for temporary registration of a motor vehicle in Form 20 to the 
                            Registering Authority in whose jurisdiction the vehicle is or to the dealer 
                            dealing in the sale of New Motor Vehicles Recognised by the Transport Commissioner.</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Provide copies of Sale Certificate, Insurance Certificate and Road worthiness Certificate.</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Pay tax and fee as specified in Central Motor Vehicle Rules 1989 for temporary registration.</Text>
                    </View>
                </View>
                
                <Text style={styles.subheader}>For extension of temporary registration</Text>
                <View style={styles.bulletList}>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>You can apply for the extension of the period of temporary registration to the Registering 
                            Authority by specifying the reason and period up to which the extension is required.</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>You can apply for the extension of the temporary registration for maximum two times.</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>In case you have already applied for extension once and are again applying for extension, 
                            you will have to pay the penalty as per Central Motor Vehicle Rules 1989.</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Pay fee and tax for extension as specified in in Rule 81 of Central Motor Vehicle Rules 1989.</Text>
                    </View>
                </View>
                
                <Text style={styles.header}>Documents Required</Text>
                <Text style={styles.subheader}>For temporary registration</Text>
                <View style={styles.bulletList}>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Application in Form 20</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Sales certificate in Form 21</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Road worthiness certificate in Form 22</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Valid insurance certificate</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Proof of address (Ration card, Electricity bill etc.)*</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Pollution under control certificate*</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Copy of PAN card of Form 60 and Form 61 (as applicable)*</Text>
                    </View>
                </View>
                
                <Text style={styles.subheader}>For extension of temporary registration</Text>
                <View style={styles.bulletList}>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>Sales certificate in Form 21</Text>
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
                </View>
                
                <Text style={styles.header}>Reference</Text>
                <View style={styles.bulletList}>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>The Motor Vehicles Act 1988 (Section 43 of Chapter IV)</Text>
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