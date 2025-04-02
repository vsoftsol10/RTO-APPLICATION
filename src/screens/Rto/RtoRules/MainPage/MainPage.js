import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';

const MainPage = ({ navigation }) => {
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
        
        <Text style={styles.headerText}>Rules of RTO</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.gridContainer}>
          {/* Row 1 */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../../../../assets/file.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View> 
              <Text style={styles.itemText}>Temporary Registration</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../../../../assets/form.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View> 
              <Text style={styles.itemText}>Permanent Registration</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../../../../assets/car.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View> 
              <Text style={styles.itemText}>Renewal of Registration</Text>
            </TouchableOpacity>
          </View>
          
          {/* Row 2 */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../../../../assets/car.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View> 
              <Text style={styles.itemText}>Duplicate RC</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../../../../assets/car.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View> 
              <Text style={styles.itemText}>No Objection Certificate</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../../../../assets/car.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View> 
              <Text style={styles.itemText}>Address Change</Text>
            </TouchableOpacity>
          </View>
          
          {/* Row 3 */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../../../../assets/car.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View> 
              <Text style={styles.itemText}>Reassignment of Vehicle</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../../../../assets/car.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View> 
              <Text style={styles.itemText}>Ownership Transfer</Text>
            </TouchableOpacity>
            
            <View style={styles.emptyItem}></View>
          </View>
        </View>
        
        {/* Add some padding at the bottom for better scrolling */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  )
}

export default MainPage;

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
    backgroundColor: '#dbf3f3',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -35,
  },
  gridContainer: {
    padding: 20,
    paddingTop: 60,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  item: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    elevation: 15,
    minHeight: 130,
    justifyContent: 'center',
  },
  emptyItem: {
    width: '30%',
  },
  iconContainer: {
    padding: 12,
    marginBottom: 12,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
    lineHeight: 16,
  },
  bottomPadding: {
    height: 30,
  }
});