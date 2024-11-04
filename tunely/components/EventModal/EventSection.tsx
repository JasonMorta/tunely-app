// src/components/EventSection.tsx

import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert,
  Platform,
} from 'react-native';
// Removed PagerView import as it's no longer needed
import { ThemedText } from '../ThemedText';
import { EventData } from '../../types/EventTypes';

// Social media icons
import FacebookIcon from '../../assets/icons/facebook-svgrepo-com.png'; // Update with actual icon paths
import InstagramIcon from '../../assets/icons/instagram-1-svgrepo-com.png';
import YoutubeIcon from '../../assets/icons/youtube-svgrepo-com.png';
import GoogleMapsIcon from '../../assets/icons/map.png';
import LikeFalse from '../../assets/icons/like-false.png';
import LikeTrue from '../../assets/icons/like-true.png';
import { ThemedView } from '../ThemedView';

interface EventSectionProps {
  eventDetails: EventData; // Use EventData type for prop
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const EventSection: React.FC<EventSectionProps> = ({ eventDetails }) => {



  // Event layout structure
  // - Date and time
  // - Fee
  // - Description

  return (
    <ThemedView style={styles.container}>
         <ThemedText style={styles.eventDate}>
          {eventDetails.eventDate?.startDay} {" "}
          {eventDetails.eventDate?.startTime}
         </ThemedText>
         <ThemedText style={styles.description}>
          {eventDetails?.description}
          </ThemedText>
      </ThemedView>
      
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    // marginBottom: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#fff',
    // paddingBottom: 15, // Added padding for better spacing
    // backgroundColor: 'aliceblue',
  },
  // Removed pagerView and page styles as they're no longer needed
  eventImage: {
    width: SCREEN_WIDTH * 0.8, // 80% of screen width for responsiveness
    height: 200, // Fixed height since we're displaying a single image
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Placeholder background color
    alignSelf: 'center', // Center the image horizontally
    marginBottom: 10, // Add some space below the image
  },
  eventDate: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    padding: 10,
    textAlign: 'center',
  },
  
});

export default EventSection;
