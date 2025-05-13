import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionic from "react-native-vector-icons/Ionicons";
const DocumentUploadScreen = ({ navigation }) => {
  // const { personalDetails } = route.params || {};

  // Document state
  const [documents, setDocuments] = useState({
    photo: null,
    signature: null,
    aadhar: null,
    ageProof: null,
    addressProof: null,
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Request permissions (Android)
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to select documents and images',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Required',
            'Please grant storage permissions to upload documents.',
            [{ text: 'OK' }]
          );
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Pick image from gallery
  const pickImage = async (documentType) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const options = {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      };

      const result = await launchImageLibrary(options);

      if (!result.didCancel && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        updateDocument(documentType, {
          uri: selectedAsset.uri,
          type: selectedAsset.type || 'image/jpeg',
          name: selectedAsset.fileName || `${documentType}_${Date.now()}.jpg`,
        });
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  // Pick document (PDF)
  const pickDocument = async (documentType) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        allowMultiSelection: false,
      });

      if (result && result.length > 0) {
        const selectedDoc = result[0];
        updateDocument(documentType, {
          uri: selectedDoc.uri,
          type: selectedDoc.type || 'application/pdf',
          name: selectedDoc.name || `${documentType}_${Date.now()}`,
        });
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker
        console.log('Document picking cancelled');
      } else {
        console.log('Error picking document:', error);
        Alert.alert('Error', 'Failed to select document. Please try again.');
      }
    }
  };

  // Update document in state
  const updateDocument = (key, value) => {
    setDocuments((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Clear error when document is uploaded
    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: null,
      }));
    }
  };

  // Remove document
  const removeDocument = (key) => {
    setDocuments((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Required documents
    if (!documents.photo) {
      newErrors.photo = 'Passport-size photo is required';
      isValid = false;
    }

    if (!documents.signature) {
      newErrors.signature = 'Signature image is required';
      isValid = false;
    }

    if (!documents.aadhar) {
      newErrors.aadhar = 'Aadhar card is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Combine personal details with documents
      const applicationData = {
        ...personalDetails,
        documents,
      };

      // Navigate to next screen or submit
      Alert.alert(
        'Confirmation',
        'Your application has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );

      // For debug
      console.log('Application Data:', applicationData);
    }
  };

  // Helper to render document item
  const renderDocumentItem = ({
    title,
    description,
    documentKey,
    required = false,
    allowPdf = true,
  }) => {
    const document = documents[documentKey];
    const hasError = errors[documentKey];

    return (
      <View style={styles.documentItem}>
        <View style={styles.documentHeader}>
          <Text style={styles.documentTitle}>
            {title} {required && <Text style={styles.requiredStar}>*</Text>}
          </Text>
          {description && (
            <Text style={styles.documentDescription}>{description}</Text>
          )}
        </View>

        {document ? (
          <View style={styles.uploadedDocumentContainer}>
            <View style={styles.uploadedDocument}>
              {document.type.includes('image') ? (
                <Image source={{ uri: document.uri }} style={styles.documentPreview} />
              ) : (
                <View style={styles.pdfPreview}>
                  <Icon name="picture-as-pdf" size={40} color="#FF5252" />
                  <Text style={styles.pdfName} numberOfLines={1}>
                    {document.name}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeDocument(documentKey)}
            >
              <Ionicons name="close-circle" size={24} color="#ff3b30" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadButtons}>
            <TouchableOpacity
              style={[styles.uploadButton, hasError && styles.uploadButtonError]}
              onPress={() => pickImage(documentKey)}
            >
              <Ionicons name="image-outline" size={20} color="#35cad1" />
              <Text style={styles.uploadButtonText}>Image</Text>
            </TouchableOpacity>

            {allowPdf && (
              <TouchableOpacity
                style={[styles.uploadButton, hasError && styles.uploadButtonError]}
                onPress={() => pickDocument(documentKey)}
              >
                <Icon name="picture-as-pdf" size={20} color="#35cad1" />
                <Text style={styles.uploadButtonText}>PDF</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {hasError && <Text style={styles.errorText}>{hasError}</Text>}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      ><TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconstyle}
            onPress={() => navigation.navigate("TestBooking")}>
            <Ionic name="chevron-back"
                style={styles.icon}
            />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Apply for License</Text>
            <Text style={styles.subHeaderText}>Document Upload</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Upload Required Documents</Text>
            <Text style={styles.noteText}>
              Files should be in JPG, PNG, or PDF format and less than 2MB in size
            </Text>

            {renderDocumentItem({
              title: 'Passport-size Photo',
              description: 'Recent color photograph with light background',
              documentKey: 'photo',
              required: true,
              allowPdf: false,
            })}

            {renderDocumentItem({
              title: 'Signature Image',
              description: 'Clear image of your signature on white paper',
              documentKey: 'signature',
              required: true,
              allowPdf: false,
            })}

            {renderDocumentItem({
              title: 'Aadhar Card (front/back)',
              description: 'Both sides of your Aadhar card',
              documentKey: 'aadhar',
              required: true,
            })}

            {renderDocumentItem({
              title: 'Age Proof',
              description: 'Required if not using Aadhar for age verification',
              documentKey: 'ageProof',
            })}

            {renderDocumentItem({
              title: 'Address Proof',
              description: 'Required if not using Aadhar for address verification',
              documentKey: 'addressProof',
            })}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Submit Application</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  keyboardAvoid: {
    flex: 1,
  },
  icon:{
    fontSize:20,
    color:"white",
},
iconstyle:{
    backgroundColor: '#35cad1',
    marginTop:50,
    padding:10,
    borderRadius:100,
    elevation:5,
    alignItems:"center",
    aspectRatio:1/1,
    width:40,
    position:"absolute",
    top:20,
    left:20,
    zIndex:1,
},
  header: {
    padding: 20,
    backgroundColor: '#35cad1',
    alignItems: 'center',
    height: 150,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    top: 60,
  },
  subHeaderText: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 65,
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  documentItem: {
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#35cad1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  documentHeader: {
    marginBottom: 10,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  documentDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  requiredStar: {
    color: '#ff3b30',
    fontWeight: 'bold',
  },
  uploadButtons: {
    flexDirection: 'row',
    marginTop: 5,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9fa',
    borderWidth: 1,
    borderColor: '#35cad1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  uploadButtonError: {
    borderColor: '#ff3b30',
  },
  uploadButtonText: {
    color: '#35cad1',
    marginLeft: 5,
    fontWeight: '500',
  },
  uploadedDocumentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  uploadedDocument: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  documentPreview: {
    height: 120,
    width: '100%',
    resizeMode: 'cover',
  },
  pdfPreview: {
    height: 80,
    width: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  pdfName: {
    marginTop: 5,
    color: '#333',
    fontSize: 12,
    maxWidth: '90%',
  },
  removeButton: {
    marginLeft: 10,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#35cad1',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default DocumentUploadScreen;