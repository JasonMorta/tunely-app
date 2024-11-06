// src/components/VenueSection.tsx

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { EventData } from '../../types/EventTypes'; // Import the EventData type
import { ThemedView } from '../ThemedView';
import locationTime from '../../assets/icons/clock.png';
import OpeningHours from './OpeningHours';
import AddressOptions from './AddressOptions'; // Import the new component

interface VenueSectionProps {
  venueDetails?: EventData['VENUE']; // Make venueDetails optional
}

const VenueSection: React.FC<VenueSectionProps> = ({ venueDetails }) => {
  // Check if venueDetails is defined
  if (!venueDetails) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.venueTitle}>No Venue Information Available</ThemedText>
      </ThemedView>
    );
  }

  const venueImage =
    venueDetails?.images && venueDetails.images.length > 0
      ? venueDetails.images[0]
      : null;
  const openingHours = venueDetails.openingHours; // Assuming opening hours are stored here

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.venueTitle}>{venueDetails.name}</ThemedText>
      {venueImage && <Image source={{ uri: venueImage }} style={styles.venueImage} />}
      <ThemedText style={styles.contact}>Contact Details</ThemedText>

      {/* Use AddressOptions Component */}
      <AddressOptions address={venueDetails.address || 'No address available'} source={"venue"} />

      <ThemedView style={styles.locationTimes}>
        <ThemedView style={styles.timeHeading}>
          <Image source={locationTime} style={{ width: 20, height: 20 }} />
          <ThemedText>Open and close times</ThemedText>
        </ThemedView>
        {openingHours && <OpeningHours dates={openingHours} />}
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
    paddingHorizontal: 16, // Added padding for better layout
  },
  venueTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 40,
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
  locationTimes: {
    flexDirection: 'column',
    marginVertical: 10,
    gap: 10,
  },
  timeHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationSocialLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
});

export default VenueSection;
