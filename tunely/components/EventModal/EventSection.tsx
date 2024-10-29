// src/components/EventSection.tsx

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { EventData } from '../../types/EventTypes';

// Placeholder for social media icon imports
import FacebookIcon from '../../assets/icons/facebook-svgrepo-com.png'; // Update with actual icon paths
import InstagramIcon from '../../assets/icons/instagram-1-svgrepo-com.png';
import YoutubeIcon from '../../assets/icons/youtube-svgrepo-com.png';
import GoogleMapsIcon from '../../assets/icons/map.png';

interface EventSectionProps {
  eventDetails: EventData; // Use EventData type for prop
}

const EventSection: React.FC<EventSectionProps> = ({ eventDetails }) => {
  const { PERFORMER, eventDate, description, pricing } = eventDetails;

  // Extract performer information
  const performerName = PERFORMER?.name || "Unknown Performer";
  const performerImage = PERFORMER?.performerImage || ""; // Assuming performerImage is an optional string

  // Extract event date details
  const eventStartDate = eventDate?.startDay && eventDate?.startTime
    ? `${eventDate.startDay} ${eventDate.startTime}`
    : "No Date";

  return (
    <View style={styles.container}>
      {performerImage && (
        <Image source={{ uri: performerImage }} style={styles.performerImage} />
      )}

      {/* Social Media Icons placed immediately below the performer image */}
      <View style={styles.socialMediaContainer}>
        {PERFORMER?.socialMedia?.facebook && (
          <Image source={FacebookIcon} style={styles.icon} />
        )}
        {PERFORMER?.socialMedia?.instagram && (
          <Image source={InstagramIcon} style={styles.icon} />
        )}
        {PERFORMER?.socialMedia?.youtube && (
          <Image source={YoutubeIcon} style={styles.icon} />
        )}
      
      </View>

      <ThemedText style={styles.title}>{performerName}</ThemedText>
      <ThemedText style={styles.date}>{eventStartDate}</ThemedText>
      <ThemedText style={styles.cost}>Cost: {pricing?.price || "Free"}</ThemedText>
      <ThemedText style={styles.description}>{description || "No Description"}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  performerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    marginVertical: 5,
  },
  cost: {
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Align icons horizontally
    marginVertical: 10, // Space above and below the icons
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default EventSection;
