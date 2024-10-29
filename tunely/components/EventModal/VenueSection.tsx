// src/components/VenueSection.tsx

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { EventData } from '../../types/EventTypes'; // Import the EventData type

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

  const { name: venueName, address: venueAddress, image: venueImage, openingHours } = venueDetails;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.venueTitle}>{venueName || "Unknown Venue"}</ThemedText>
      {venueImage && (
        <Image source={{ uri: venueImage }} style={styles.venueImage} />
      )}
      <ThemedText style={styles.address}>{venueAddress || "No Address"}</ThemedText>
      <ThemedText style={styles.openingHours}>
        {openingHours ? JSON.stringify(openingHours) : "No Opening Hours"}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  venueTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  venueImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    marginVertical: 5,
  },
  openingHours: {
    fontSize: 14,
    marginVertical: 5,
  },
});

export default VenueSection;
