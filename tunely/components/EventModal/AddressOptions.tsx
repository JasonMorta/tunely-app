// AddressOptions.tsx

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { ThemedText } from '../ThemedText';
import locationPin from '../../assets/icons/pin.png';
import * as Clipboard from 'expo-clipboard';
import { Linking } from 'react-native';
import { ThemedView } from '../ThemedView';

interface AddressOptionsProps {
  address: string;
}

const AddressOptions: React.FC<AddressOptionsProps> = ({ address }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Function to open Google Maps
  const openGoogleMaps = async () => {
    const url = Platform.select({
      ios: `comgooglemaps://?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
    });

    console.log('Google Maps URL:', url);

    if (url) {
      const supported = await Linking.canOpenURL(url);
      console.log('Can open Google Maps:', supported);
      if (supported) {
        await Linking.openURL(url);
      } else {
        // Fallback to web URL
        const webUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        const webSupported = await Linking.canOpenURL(webUrl);
        if (webSupported) {
          await Linking.openURL(webUrl);
        } else {
          Alert.alert('Error', 'Unable to open the map. Please check your device settings.');
        }
      }
    }
  };

  // Function to open Apple Maps
  const openAppleMaps = async () => {
    const url = Platform.select({
      ios: `maps://?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`, // Fallback for Android
    });

    if (url) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Apple Maps is not installed on your device.');
      }
    }
  };

  // Function to copy address to clipboard
  const copyAddress = async () => {
    await Clipboard.setStringAsync(address);
    Alert.alert('Success', 'Address copied to clipboard.');
  };

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <Image source={locationPin} style={styles.icon} />
        <ThemedText>{address}</ThemedText>
      </TouchableOpacity>

      {/* Modal for options */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <ThemedView style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <ThemedView style={styles.modalContent}>
                <ThemedText style={styles.modalTitle}>Choose an option</ThemedText>

                <TouchableOpacity style={styles.modalButton} onPress={openGoogleMaps}>
                  <ThemedText>Open in Google Maps</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={openAppleMaps}>
                  <ThemedText>Open in Apple Maps</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={copyAddress}>
                  <ThemedText>Copy Address</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <ThemedText style={styles.cancelText}>Cancel</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </TouchableWithoutFeedback>
          </ThemedView>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cancelButton: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  cancelText: {
    color: 'red',
  },
});

export default AddressOptions;
