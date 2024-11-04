// src/components/VenueSection.tsx

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { EventData } from '../../types/EventTypes'; // Import the EventData type
import { ThemedView } from '../ThemedView';
import locationPin from '../../assets/icons/pin.png';
import locationTime from '../../assets/icons/clock.png';

interface VenueSectionProps {
  venueDetails?: EventData['VENUE']; // Make venueDetails optional
}

const VenueSection: React.FC<VenueSectionProps> = ({ venueDetails }) => {
  // Check if venueDetails is defined
  if (!venueDetails) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.venueTitle}>No Venue Information Available</ThemedText>
      </View>
    );
  }

  const venueImage = venueDetails?.images && venueDetails.images.length > 0 ? venueDetails.images[0] : null;
  return (
   <ThemedView style={styles.container}>
   

        <ThemedText style={styles.venueTitle}>{venueDetails.name}</ThemedText>
        {venueImage && (
        <Image source={{ uri: venueImage }} style={styles.venueImage} />
      )}
      <ThemedText style={styles.contact}>Contact Details</ThemedText>

      <ThemedView style={styles.locationContainer}>
      <Image source={locationPin} style={{ width: 20, height: 20 }} />
      <ThemedText>{venueDetails.address}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.locationTimes}>
      <Image source={locationTime} style={{ width: 20, height: 20 }} />
      <ThemedText>Open and close times</ThemedText>
      </ThemedView> 

      {/* Venue social media links */}
      <ThemedView style={styles.locationSocialLinks}>
        <ThemedText>Follow us on:</ThemedText>
        {/* Add social media icons here */}
      
      </ThemedView>

    
   </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginTop: 15,
  },
  venueTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  venueImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  contact: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  locationTimes: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationSocialLinks:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  }
});

export default VenueSection;
