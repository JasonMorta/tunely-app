// AddressOptions.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ActionSheetIOS,
  Clipboard,
  Linking,
} from 'react-native';
import { ThemedText } from '../ThemedText';
import locationPin from '../../assets/icons/pin.png';
import { ThemedView } from '../ThemedView';
import GoogleMapsIcon from '../../assets/icons/map.png';

interface AddressOptionsProps {
  address: string;
  source: string
}

const AddressOptions: React.FC<AddressOptionsProps> = ({ address, source }) => {
  // Function to open Google Maps
  const openGoogleMaps = async () => {
    const url = Platform.select({
      ios: `comgooglemaps://?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
    });

    if (url) {
      const supported = await Linking.canOpenURL(url);
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

  // Function to show options
  const showOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Open in Google Maps', 'Open in Apple Maps', 'Copy Address'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 1:
              openGoogleMaps();
              break;
            case 2:
              openAppleMaps();
              break;
            case 3:
              copyAddress();
              break;
            default:
              break;
          }
        }
      );
    } else {
      Alert.alert(
        'Choose an option',
        '',
        [
          { text: 'Open in Google Maps', onPress: openGoogleMaps },
          { text: 'Open in Apple Maps', onPress: openAppleMaps },
          { text: 'Copy Address', onPress: copyAddress },
          { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  if (source === 'venue') {
    return (
      <ThemedView>
        <TouchableOpacity style={styles.container} onPress={showOptions}>
          <Image source={locationPin} style={styles.icon} />
          <ThemedText>{address}</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  };

  if (source === 'performer') {
    return (
      <ThemedView >
      <TouchableOpacity style={styles.container} onPress={showOptions}>
          <Image source={GoogleMapsIcon} style={styles.performerIcon} />
          </TouchableOpacity>
      </ThemedView>
    );
  };


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
  performerIcon: {
    width: 40,
    height: 40,
  },
});

export default AddressOptions;
