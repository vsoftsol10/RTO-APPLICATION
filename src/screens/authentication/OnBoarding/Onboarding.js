import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constents/colors';

const Onboarding = ({navigation}) => {
  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bgLineGradeOne} />
      <LinearGradient
        colors={[
          colors.bgLineGradeOne,
          colors.bgLineGradeTwo,
          colors.bgLineGradeThree,
          colors.bgLineGradeFour,
          colors.bgLineGradeFive,
          colors.bgLineGradeSix,
        ]}
        style={styles.linearGradient}
      >
        <View style={styles.picContainer}>
          <View style={styles.pic}>
            <Image source={require("../../../images/authentication/Notes.gif")} />
          </View>
        </View>
        <View style={styles.notesContainer}>
            <Text style={styles.notesTxt}>Get Your License with Ease!</Text>
            <Text style={styles.notesTxt}>No More Long Queues!</Text>
        </View>
        <View style={styles.subNoteContainer}>
          <View>
            <Text style={styles.subNoteText}>  Drive your dreams with ease,</Text>
            <Text style={styles.subNoteText}>apply, learn & hit the road today!</Text>
          </View>
        </View>
        <View style={styles.ButtonContainer}>
            <View style={styles.Buttons}>
            <TouchableOpacity 
                    onPress={()=>navigation.navigate("Register")}
                    activeOpacity={0.8}
                    style={styles.Buttonthingsleft}>
                    <Text style={styles.ButtonText}>
                        Register
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate("LogIn")}
                    activeOpacity={0.8}
                    style={styles.Buttonthingsright}>
                    <Text style={styles.ButtonText}>
                        LogIn
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
       
      </LinearGradient>
    </View>
  )
}

export default Onboarding;

const styles=StyleSheet.create({
    linearGradient: {
        width: '100%',
        height: '100%',
      },
      picContainer: {
        width: '150%',
        height: '70%',
        padding: 16,
        paddingStart: 90,
      },
      pic: {
        width: '50%',
        height: '50%',
        backgroundColor: colors.onBoardCardBG,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      notesTxt: {
        fontSize: 24,
        color: colors.black,
        fontWeight: '800',
        letterSpacing: 1,
      },
      notesContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -200,
        marginBottom: 40,
      },
      subNoteContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
      },
      subNoteText: {
        color: colors.black,
        fontWeight: 'bold',
        letterSpacing: 1,
      },
      ButtonContainer: {
        paddingHorizontal: 40,
        marginTop: 60,
      },
      Buttons: {
        width: '100%',
        flexDirection: 'row',
      },
      Buttonthingsleft: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: colors.white,
      },
      Buttonthingsright: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colors.transparent,
        borderColor: colors.white,
        borderWidth: 5,
      },
      ButtonText: {
        fontSize: 24,
        color: colors.black,
        fontWeight: '600',
      },
})