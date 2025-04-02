import React, { useState } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons"

const DrivingTips = ({navigation}) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleBack=()=>{
    navigation.navigate("Home")
  }
  const sections = [
    {
      id: 1,
      title: "Understand the Test Requirements",
      icon: "📄",
      content: [
        "Check the official driving test syllabus in your region.",
        "Know the minimum age, documents, and eligibility criteria.",
        "Learn about both the theory and practical tests."
      ]
    },
    {
      id: 2,
      title: "Master the Rules of the Road",
      icon: "🚦",
      content: [
        "Study the road signs, traffic signals, and markings.",
        "Understand the right-of-way rules and speed limits.",
        "Learn about lane discipline, overtaking rules, and parking regulations."
      ]
    },
    {
      id: 3,
      title: "Get Comfortable with Your Vehicle",
      icon: "🔧",
      content: [
        "Adjust your seat, mirrors, and steering wheel for comfort.",
        "Learn the controls (indicators, wipers, headlights, handbrake, etc.).",
        "Practice smooth acceleration, braking, and clutch control (for manual cars)."
      ]
    },
    {
      id: 4,
      title: "Develop Essential Driving Skills",
      icon: "🚗",
      content: [
        "Starting & stopping smoothly without jerks.",
        "Steering control – Keep both hands on the wheel.",
        "Lane changing – Check mirrors & use indicators.",
        "Reverse parking & parallel parking techniques.",
        "Emergency braking and hazard response."
      ]
    },
    {
      id: 5,
      title: "Practice Defensive Driving",
      icon: "🛡️",
      content: [
        "Always be aware of your surroundings.",
        "Maintain a safe following distance.",
        "Avoid distractions – No phone use while driving.",
        "Anticipate other drivers' unexpected moves."
      ]
    },
    {
      id: 6,
      title: "Take Mock Theory Tests",
      icon: "📝",
      content: [
        "Practice with online mock tests to get familiar with the format.",
        "Memorize important road signs and traffic laws."
      ]
    },
    {
      id: 7,
      title: "Stay Calm & Confident on Test Day",
      icon: "😌",
      content: [
        "Get a good night's sleep before the test.",
        "Arrive early at the test center.",
        "Listen carefully to the examiner's instructions.",
        "Don't panic if you make a small mistake—stay focused."
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar barStyle="light-content" backgroundColor={"#35cad1"} />
        
        <View style={styles.header}>
          <View style={styles.head}> 
            <Image
              source={require("../../../../assets/car.png")}
              style={styles.carImage}
            />
            <Text style={styles.title}> Driving Test Preparation</Text>
          </View>
          <Text style={styles.subtitle}>Essential Tips & Guidance</Text>
        </View>

        {sections.map((section) => (
          <View key={section.id} style={styles.sectionContainer}>
            <TouchableOpacity 
              style={styles.sectionHeader} 
              onPress={() => toggleSection(section.id)}
            >
              <Text style={styles.sectionIcon}>{section.icon}</Text>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.expandIcon}>
                {expandedSection === section.id ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>
            
            {expandedSection === section.id && (
              <View style={styles.sectionContent}>
                {section.content.map((item, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Good luck on your driving test!
          </Text>
        </View>
        <View style={styles.backBtnContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconstyle}
              onPress={() => navigation.navigate("Onboarding")}>
              <Ionic name="caret-back-outline"
                  style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonTxt}>Back to Home</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    top:50
  },
  scrollContainer: {
    padding: 16,
  },
  head:{
    flexDirection:"row"
  },
  carImage:{
    width:50,
    height:38
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: "#35cad1",
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
  },
  expandIcon: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    marginRight: 8,
    fontSize: 16,
    lineHeight: 20,
    color: '#3498db',
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    color: '#34495e',
  },
  footer: {
    marginTop: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  icon:{
    fontSize:20,
    color:"white",
  },
  iconstyle:{
    width:40,

  },
  backButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10
  },
  backBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#35cad1",
    width: "60%",
    flexDirection:"row",
    marginLeft:"20%",
    borderRadius:10,
    gap:-12,
    marginTop:50
  },
  backButtonTxt: {
    fontSize: 18,
    color: "white",
    letterSpacing: 2,
    fontWeight: "600" ,
    paddingLeft:-5
  }
});

export default DrivingTips;