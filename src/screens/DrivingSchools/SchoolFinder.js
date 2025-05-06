import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import MapView conditionally to prevent crashes
let MapView, Marker;
try {
  const MapViewModule = require('react-native-maps');
  MapView = MapViewModule.default;
  Marker = MapViewModule.Marker;
} catch (error) {
  console.warn('react-native-maps could not be loaded', error);
  // We'll handle this case in the component
}

const {width, height} = Dimensions.get('window');
const TEAL_COLOR = '#35cad1';

const SchoolFinder = ({navigation}) => {
  // Refs
  const mapRef = useRef(null);

  // State variables
  const [location, setLocation] = useState({
    latitude: 8.7139,
    longitude: 77.7567,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [drivingSchools, setDrivingSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showSchoolDetail, setShowSchoolDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [mapError, setMapError] = useState(!MapView); // Set to true if MapView is undefined
  const [filters, setFilters] = useState({
    distance: 10, // Default 10km radius
    rating: 0, // Default no minimum rating
    licenseTypes: {
      twoWheeler: true,
      fourWheeler: true,
      commercial: true,
    },
  });

  // Safe data loading
  useEffect(() => {
    try {
      setLoading(true);
      // Simulate loading data from API
      const timeout = setTimeout(() => {
        try {
          setDrivingSchools(mockDrivingSchools);
          setFilteredSchools(mockDrivingSchools);
        } catch (error) {
          console.error('Error setting driving schools data:', error);
          Alert.alert('Error', 'Failed to load driving schools data');
        } finally {
          setLoading(false);
        }
      }, 1000);

      // Cleanup
      return () => clearTimeout(timeout);
    } catch (error) {
      console.error('Error in useEffect:', error);
      setLoading(false);
    }
  }, []);

  // Safe filter update
  useEffect(() => {
    try {
      filterSchools();
    } catch (error) {
      console.error('Error filtering schools:', error);
    }
  }, [searchQuery, filters, drivingSchools]);

  // Filter schools based on search query and filters
  const filterSchools = () => {
    try {
      if (!drivingSchools || !drivingSchools.length) return;

      let filtered = [...drivingSchools];

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(
          school =>
            school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            school.address.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      // Filter by rating
      if (filters.rating > 0) {
        filtered = filtered.filter(school => school.rating >= filters.rating);
      }

      // Filter by license types
      filtered = filtered.filter(school => {
        return (
          (filters.licenseTypes.twoWheeler &&
            school.licenseTypes.includes('Two Wheeler')) ||
          (filters.licenseTypes.fourWheeler &&
            school.licenseTypes.includes('Four Wheeler')) ||
          (filters.licenseTypes.commercial &&
            school.licenseTypes.includes('Commercial'))
        );
      });

      setFilteredSchools(filtered);
    } catch (error) {
      console.error('Error in filterSchools:', error);
      // Fallback to showing all schools
      setFilteredSchools(drivingSchools || []);
    }
  };

  // Handle school selection - with error handling
  const handleSchoolSelect = school => {
    try {
      if (!school) return;

      setSelectedSchool(school);
      setShowSchoolDetail(true);

      // Center map on selected school if map is available
      if (mapRef.current && !mapError && MapView) {
        mapRef.current?.animateToRegion(
          {
            latitude: school.coordinates.latitude,
            longitude: school.coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          500,
        );
      }
    } catch (error) {
      console.error('Error selecting school:', error);
    }
  };

  // Toggle filter modal
  const toggleFilters = () => {
    try {
      setShowFilters(!showFilters);
    } catch (error) {
      console.error('Error toggling filters:', error);
    }
  };

  // Reset filters to default
  const resetFilters = () => {
    try {
      setFilters({
        distance: 10,
        rating: 0,
        licenseTypes: {
          twoWheeler: true,
          fourWheeler: true,
          commercial: true,
        },
      });
      setSearchQuery('');
    } catch (error) {
      console.error('Error resetting filters:', error);
    }
  };

  // Handle book trial action
  const handleBookTrial = schoolId => {
    try {
      // Navigate to booking screen
      setShowSchoolDetail(false);
      // navigation.navigate('BookTrialClass', { schoolId });
      console.log('Book trial for school:', schoolId);
    } catch (error) {
      console.error('Error booking trial:', error);
    }
  };

  // Handle map error
  const handleMapError = error => {
    console.error('Map error:', error);
    setMapError(true);
    Alert.alert(
      'Map Error',
      'Unable to load the map. Please check your internet connection or try again later.',
      [{text: 'OK'}],
    );
  };

  // Render stars for ratings with error handling
  const renderStars = rating => {
    try {
      return (
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map(i => (
            <Icon
              key={i}
              name="star"
              size={16}
              color={i <= Math.floor(rating) ? '#FFD700' : '#E0E0E0'}
            />
          ))}
        </View>
      );
    } catch (error) {
      console.error('Error rendering stars:', error);
      return <View style={styles.starsContainer} />;
    }
  };

  // Render each driving school item with error handling
  const renderSchoolItem = ({item}) => {
    try {
      if (!item) return null;

      return (
        <TouchableOpacity
          style={styles.schoolItem}
          onPress={() => handleSchoolSelect(item)}
          activeOpacity={0.7}>
          <View style={styles.schoolInfo}>
            <Text style={styles.schoolName}>
              {item.name || 'Unknown School'}
            </Text>

            <View style={styles.ratingContainer}>
              {renderStars(item.rating || 0)}
              <Text style={styles.reviewCount}>({item.reviewCount || 0})</Text>
            </View>

            <View style={styles.addressContainer}>
              <Icon name="map-marker" size={14} color={TEAL_COLOR} />
              <Text style={styles.address} numberOfLines={1}>
                {item.address || 'Address not available'}
              </Text>
            </View>

            <View style={styles.distanceContainer}>
              <Icon name="map-marker-distance" size={14} color="#666" />
              <Text style={styles.distance}>
                {item.distance || 'N/A'} km away
              </Text>
            </View>

            <View style={styles.licenseTypesContainer}>
              {(item.licenseTypes || []).map((type, index) => (
                <View key={index} style={styles.licenseTypeTag}>
                  <Icon
                    name={
                      type === 'Two Wheeler'
                        ? 'motorbike'
                        : type === 'Four Wheeler'
                        ? 'car'
                        : 'truck'
                    }
                    size={12}
                    color={TEAL_COLOR}
                  />
                  <Text style={styles.licenseTypeText}>{type}</Text>
                </View>
              ))}
            </View>
          </View>
          <Icon
            name="chevron-right"
            size={24}
            color="#ccc"
            style={styles.chevron}
          />
        </TouchableOpacity>
      );
    } catch (error) {
      console.error('Error rendering school item:', error);
      return null;
    }
  };

  // School detail modal
  const renderSchoolDetail = () => {
    try {
      return (
        <Modal
          visible={showSchoolDetail}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setShowSchoolDetail(false)}>
          <SafeAreaView style={styles.detailContainer}>
            {selectedSchool && (
              <ScrollView>
                <View style={styles.detailHeader}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => setShowSchoolDetail(false)}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                  </TouchableOpacity>
                  <View
                    style={[styles.detailImage, {backgroundColor: TEAL_COLOR}]}>
                    <Icon
                      name="school"
                      size={80}
                      color="#fff"
                      style={{alignSelf: 'center'}}
                    />
                  </View>
                  <View style={styles.headerGradient} />
                </View>

                <View style={styles.detailContent}>
                  <Text style={styles.detailName}>{selectedSchool.name}</Text>

                  <View style={styles.detailRatingContainer}>
                    {renderStars(selectedSchool.rating)}
                    <Text style={styles.detailReviewCount}>
                      ({selectedSchool.reviewCount} reviews)
                    </Text>
                  </View>

                  <View style={styles.infoSection}>
                    <View style={styles.infoItem}>
                      <Icon name="map-marker" size={20} color={TEAL_COLOR} />
                      <Text style={styles.infoText}>
                        {selectedSchool.address}
                      </Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Icon name="phone" size={20} color={TEAL_COLOR} />
                      <Text style={styles.infoText}>
                        {selectedSchool.phone}
                      </Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Icon name="clock-outline" size={20} color={TEAL_COLOR} />
                      <Text style={styles.infoText}>
                        {selectedSchool.hours?.open || 'N/A'} -{' '}
                        {selectedSchool.hours?.close || 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.sectionDivider} />

                  <Text style={styles.sectionTitle}>License Types</Text>
                  <View style={styles.licenseSection}>
                    {(selectedSchool.licenseTypes || []).map((type, index) => (
                      <View key={index} style={styles.detailLicenseTag}>
                        <Icon
                          name={
                            type === 'Two Wheeler'
                              ? 'motorbike'
                              : type === 'Four Wheeler'
                              ? 'car'
                              : 'truck'
                          }
                          size={16}
                          color={TEAL_COLOR}
                        />
                        <Text style={styles.detailLicenseText}>{type}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.sectionDivider} />

                  <Text style={styles.sectionTitle}>Features</Text>
                  <View style={styles.featuresGrid}>
                    {(selectedSchool.features || []).map((feature, index) => {
                      const iconName = getFeatureIcon(feature);
                      return (
                        <View key={index} style={styles.featureItem}>
                          {iconName ? (
                            <Icon
                              name={iconName}
                              size={18}
                              color={TEAL_COLOR}
                            />
                          ) : null}
                          <Text style={styles.featureText}>{feature}</Text>
                        </View>
                      );
                    })}
                  </View>

                  <View style={styles.sectionDivider} />

                  <Text style={styles.sectionTitle}>About</Text>
                  <Text style={styles.descriptionText}>
                    {selectedSchool.description || 'No description available.'}
                  </Text>

                  <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {backgroundColor: '#4CAF50'},
                      ]}>
                      <Icon name="phone" size={20} color="#fff" />
                      <Text style={styles.actionButtonText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {backgroundColor: '#2196F3'},
                      ]}>
                      <Icon name="directions" size={20} color="#fff" />
                      <Text style={styles.actionButtonText}>Directions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        {backgroundColor: TEAL_COLOR},
                      ]}
                      onPress={() => handleBookTrial(selectedSchool.id)}>
                      <Icon name="calendar-check" size={20} color="#fff" />
                      <Text style={styles.actionButtonText}>Book Trial</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          </SafeAreaView>
        </Modal>
      );
    } catch (error) {
      console.error('Error rendering school detail:', error);
      return null;
    }
  };

  // Filter modal
  const renderFilterModal = () => {
    try {
      return (
        <Modal
          visible={showFilters}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleFilters}>
          <View style={styles.filterModalContainer}>
            <View style={styles.filterModalContent}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>Filter Schools</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={toggleFilters}>
                  <Icon name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.filterScrollContainer}>
                <Text style={styles.filterSectionTitle}>Rating</Text>
                <View style={styles.ratingOptions}>
                  {[0, 3, 3.5, 4, 4.5].map(rating => (
                    <TouchableOpacity
                      key={rating}
                      style={[
                        styles.ratingOption,
                        filters.rating === rating &&
                          styles.selectedRatingOption,
                      ]}
                      onPress={() => setFilters({...filters, rating})}>
                      <Text
                        style={[
                          styles.ratingOptionText,
                          filters.rating === rating &&
                            styles.selectedRatingOptionText,
                        ]}>
                        {rating === 0 ? 'Any' : `${rating}+`}
                      </Text>
                      {rating !== 0 && (
                        <Icon
                          name="star"
                          size={14}
                          color={filters.rating === rating ? '#fff' : '#FFD700'}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.filterSectionTitle}>License Types</Text>
                <View style={styles.licenseOptionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.licenseOption,
                      filters.licenseTypes.twoWheeler &&
                        styles.selectedLicenseOption,
                    ]}
                    onPress={() =>
                      setFilters({
                        ...filters,
                        licenseTypes: {
                          ...filters.licenseTypes,
                          twoWheeler: !filters.licenseTypes.twoWheeler,
                        },
                      })
                    }>
                    <Icon
                      name="motorbike"
                      size={24}
                      color={filters.licenseTypes.twoWheeler ? '#fff' : '#666'}
                    />
                    <Text
                      style={[
                        styles.licenseOptionText,
                        filters.licenseTypes.twoWheeler &&
                          styles.selectedLicenseOptionText,
                      ]}>
                      Two Wheeler
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.licenseOption,
                      filters.licenseTypes.fourWheeler &&
                        styles.selectedLicenseOption,
                    ]}
                    onPress={() =>
                      setFilters({
                        ...filters,
                        licenseTypes: {
                          ...filters.licenseTypes,
                          fourWheeler: !filters.licenseTypes.fourWheeler,
                        },
                      })
                    }>
                    <Icon
                      name="car"
                      size={24}
                      color={filters.licenseTypes.fourWheeler ? '#fff' : '#666'}
                    />
                    <Text
                      style={[
                        styles.licenseOptionText,
                        filters.licenseTypes.fourWheeler &&
                          styles.selectedLicenseOptionText,
                      ]}>
                      Four Wheeler
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.licenseOption,
                      filters.licenseTypes.commercial &&
                        styles.selectedLicenseOption,
                    ]}
                    onPress={() =>
                      setFilters({
                        ...filters,
                        licenseTypes: {
                          ...filters.licenseTypes,
                          commercial: !filters.licenseTypes.commercial,
                        },
                      })
                    }>
                    <Icon
                      name="truck"
                      size={24}
                      color={filters.licenseTypes.commercial ? '#fff' : '#666'}
                    />
                    <Text
                      style={[
                        styles.licenseOptionText,
                        filters.licenseTypes.commercial &&
                          styles.selectedLicenseOptionText,
                      ]}>
                      Commercial
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

              <View style={styles.filterActions}>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={resetFilters}>
                  <Text style={styles.resetButtonText}>Reset All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={toggleFilters}>
                  <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      );
    } catch (error) {
      console.error('Error rendering filter modal:', error);
      return null;
    }
  };

  // Helper functions
  const getFeatureIcon = feature => {
    try {
      const iconMap = {
        'Female Instructors': 'account-supervisor-female',
        'Flexible Timing': 'clock-outline',
        'Practice Vehicles': 'car',
        'Theory Classes': 'book-open-variant',
        'Simulator Training': 'steering',
        'RTO Test Support': 'clipboard-check-outline',
        Languages: 'translate',
        'Pickup Service': 'car-arrow-right',
      };
      return iconMap[feature] || 'information-outline';
    } catch (error) {
      console.error('Error getting feature icon:', error);
      return 'information-outline';
    }
  };

  // Function to handle location centering
  const centerUserLocation = () => {
    try {
      if (mapRef.current && !mapError && MapView) {
        mapRef.current.animateToRegion(location, 500);
      }
    } catch (error) {
      console.error('Error centering user location:', error);
    }
  };

  // Function to handle list view toggle
  const toggleListView = () => {
    try {
      // Implementation for toggling between map and list view
      console.log('Toggle list view');
    } catch (error) {
      console.error('Error toggling list view:', error);
    }
  };

  // Mock data for driving schools
  const mockDrivingSchools = [
    {
      id: '1',
      name: 'Tirunelveli Driving School',
      address: '123 Anna Nagar, Tirunelveli, Tamil Nadu 627007',
      coordinates: {
        latitude: 8.7139,
        longitude: 77.7567,
      },
      rating: 4.5,
      reviewCount: 120,
      distance: 1.2,
      phone: '+91 9876543210',
      hours: {
        open: '9:00 AM',
        close: '6:00 PM',
      },
      licenseTypes: ['Two Wheeler', 'Four Wheeler'],
      features: [
        'Female Instructors',
        'Flexible Timing',
        'Practice Vehicles',
        'Theory Classes',
        'RTO Test Support',
      ],
      description:
        'Established in 2005, Tirunelveli Driving School offers comprehensive driving lessons for both two and four-wheeler vehicles. Our experienced instructors focus on defensive driving techniques and road safety.',
    },
    {
      id: '2',
      name: 'Perfect Driving Academy',
      address: '45 South Car Street, Tirunelveli, Tamil Nadu 627001',
      coordinates: {
        latitude: 8.7231,
        longitude: 77.7652,
      },
      rating: 4.2,
      reviewCount: 85,
      distance: 2.5,
      phone: '+91 9876543211',
      hours: {
        open: '8:30 AM',
        close: '7:00 PM',
      },
      licenseTypes: ['Two Wheeler', 'Four Wheeler', 'Commercial'],
      features: [
        'Simulator Training',
        'Practice Vehicles',
        'Theory Classes',
        'RTO Test Support',
        'Pickup Service',
      ],
      description:
        'Perfect Driving Academy specializes in training drivers of all ages. We offer simulated training before actual road practice to build confidence. Our instructors are certified with over 10 years of experience.',
    },
    {
      id: '3',
      name: 'Highway Star Driving School',
      address: '78 Palayamkottai Road, Tirunelveli, Tamil Nadu 627002',
      coordinates: {
        latitude: 8.731,
        longitude: 77.7456,
      },
      rating: 4.7,
      reviewCount: 150,
      distance: 3.4,
      phone: '+91 9876543212',
      hours: {
        open: '9:00 AM',
        close: '8:00 PM',
      },
      licenseTypes: ['Two Wheeler', 'Four Wheeler', 'Commercial'],
      features: [
        'Female Instructors',
        'Flexible Timing',
        'Practice Vehicles',
        'Theory Classes',
        'Languages',
        'Pickup Service',
      ],
      description:
        'Highway Star Driving School is known for its high success rate in RTO tests. We provide instructions in Tamil, English, and Malayalam. Our modern fleet includes various vehicle types for comprehensive training.',
    },
    {
      id: '4',
      name: 'Safe Drive Academy',
      address: '22 NGO Colony, Palayamkottai, Tirunelveli, Tamil Nadu 627007',
      coordinates: {
        latitude: 8.7025,
        longitude: 77.7498,
      },
      rating: 4.0,
      reviewCount: 65,
      distance: 4.8,
      phone: '+91 9876543213',
      hours: {
        open: '10:00 AM',
        close: '6:00 PM',
      },
      licenseTypes: ['Two Wheeler', 'Four Wheeler'],
      features: ['Flexible Timing', 'Practice Vehicles', 'RTO Test Support'],
      description:
        'Safe Drive Academy focuses on practical driving skills and road safety awareness. We offer personalized training sessions adapted to each students learning pace.',
    },
    {
      id: '5',
      name: 'RTO Certified Driving School',
      address: '56 Junction Road, Tirunelveli, Tamil Nadu 627001',
      coordinates: {
        latitude: 8.718,
        longitude: 77.761,
      },
      rating: 4.8,
      reviewCount: 200,
      distance: 5.2,
      phone: '+91 9876543214',
      hours: {
        open: '8:00 AM',
        close: '7:30 PM',
      },
      licenseTypes: ['Two Wheeler', 'Four Wheeler', 'Commercial'],
      features: [
        'Female Instructors',
        'Simulator Training',
        'Practice Vehicles',
        'Theory Classes',
        'RTO Test Support',
        'Pickup Service',
        'Languages',
      ],
      description:
        'RTO Certified Driving School is directly affiliated with the Regional Transport Office. Our comprehensive curriculum covers traffic rules, road signs, defensive driving, and emergency handling. We guarantee license approval or offer free additional classes.',
    },
  ];

  // Show loading state
  if (loading) {
    try {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={TEAL_COLOR} />
          <Text style={styles.loadingText}>Loading driving schools...</Text>
        </View>
      );
    } catch (error) {
      console.error('Error rendering loading state:', error);
      return null;
    }
  }

  // Render main component
  try {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={TEAL_COLOR} barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation?.goBack?.()}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Driving Schools</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="account" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon
              name="magnify"
              size={20}
              color="#777"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search driving schools..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery ? (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}>
                <Icon name="close-circle" size={16} color="#777" />
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
            <Icon name="filter-variant" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Map View - with error handling  */}
        <View style={styles.mapContainer}>
          {mapError || !MapView ? (
            <View style={[styles.map, styles.mapErrorContainer]}>
              <Icon name="map-marker-off" size={50} color="#ccc" />
              <Text style={styles.mapErrorText}>Unable to load map</Text>
            </View>
          ) : (
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={location}
              showsUserLocation
              onError={handleMapError}>
              {(filteredSchools || []).map(school => (
                <Marker
                  key={school.id}
                  coordinate={{
                    latitude: school.coordinates.latitude,
                    longitude: school.coordinates.longitude,
                  }}
                  title={school.name}
                  description={school.address}
                  onPress={() => handleSchoolSelect(school)}>
                  <View style={styles.markerContainer}>
                    <Icon name="school" size={24} color={TEAL_COLOR} />
                  </View>
                </Marker>
              ))}
            </MapView>
          )}

          <View style={styles.mapButtonsContainer}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={centerUserLocation}>
              <Icon name="crosshairs-gps" size={22} color="#333" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.mapButton} onPress={toggleListView}>
              <Icon name="format-list-bulleted" size={22} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Results count and sort */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredSchools.length}{' '}
            {filteredSchools.length === 1 ? 'school' : 'schools'} found
          </Text>
          <TouchableOpacity style={styles.sortButton}>
            <Icon name="sort" size={16} color="#777" />
            <Text style={styles.sortText}>Sort by distance</Text>
          </TouchableOpacity>
        </View>

        {/* School List */}
        <FlatList
          data={filteredSchools}
          renderItem={renderSchoolItem}
          keyExtractor={item =>
            item?.id?.toString() || Math.random().toString()
          }
          style={styles.schoolList}
          contentContainerStyle={styles.schoolListContent}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Icon name="school-outline" size={60} color="#ccc" />
              <Text style={styles.emptyListText}>No driving schools found</Text>
              <Text style={styles.emptyListSubText}>
                Try adjusting your filters or search query
              </Text>
            </View>
          }
        />

        {/* School Detail Modal */}
        {renderSchoolDetail()}

        {/* Filters Modal */}
        {renderFilterModal()}
      </SafeAreaView>
    );
  } catch (error) {
    console.error('Error rendering main component:', error);
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Something went wrong</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation?.goBack?.()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: TEAL_COLOR,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: TEAL_COLOR,
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  mapContainer: {
    height: height * 0.3,
    backgroundColor: '#eee',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapErrorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  mapErrorText: {
    marginTop: 10,
    color: '#777',
    fontSize: 16,
  },
  mapButtonsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  mapButton: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  markerContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: TEAL_COLOR,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  schoolList: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  schoolListContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  schoolItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewCount: {
    fontSize: 12,
    color: '#777',
    marginLeft: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    flex: 1,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  distance: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  licenseTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  licenseTypeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 5,
    marginTop: 5,
  },
  licenseTypeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 3,
  },
  chevron: {
    alignSelf: 'center',
  },
  emptyListContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  emptyListSubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },

  // Filter Modal Styles
  filterModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  filterModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    height: height * 0.7,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  filterScrollContainer: {
    paddingHorizontal: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  ratingOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  ratingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedRatingOption: {
    backgroundColor: TEAL_COLOR,
  },
  ratingOptionText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  selectedRatingOptionText: {
    color: '#fff',
  },
  licenseOptionsContainer: {
    marginBottom: 20,
  },
  licenseOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  selectedLicenseOption: {
    backgroundColor: TEAL_COLOR,
  },
  licenseOptionText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  selectedLicenseOptionText: {
    color: '#fff',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#666',
  },
  applyButton: {
    backgroundColor: TEAL_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },

  // School Detail Modal Styles
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailHeader: {
    height: 200,
    position: 'relative',
  },
  detailImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  headerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  detailContent: {
    padding: 20,
  },
  detailName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detailRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailReviewCount: {
    fontSize: 14,
    color: '#777',
    marginLeft: 5,
  },
  infoSection: {
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  licenseSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailLicenseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 10,
  },
  detailLicenseText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: TEAL_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 5,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: TEAL_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  retryButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default SchoolFinder;