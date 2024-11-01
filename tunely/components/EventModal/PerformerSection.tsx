// src/components/PerformerSection.tsx

import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { EventData } from '../../types/EventTypes';

// Placeholder for social media icon imports
import FacebookIcon from '../../assets/icons/facebook-svgrepo-com.png'; // Update with actual icon paths
import InstagramIcon from '../../assets/icons/instagram-1-svgrepo-com.png';
import YoutubeIcon from '../../assets/icons/youtube-svgrepo-com.png';
import GoogleMapsIcon from '../../assets/icons/map.png';
import LikeFalse from '../../assets/icons/like-false.png';
import LikeTrue from '../../assets/icons/like-true.png';

interface EventSectionProps {
  eventDetails: EventData; // Use EventData type for prop
}

const PerformerSection: React.FC<EventSectionProps> = ({ eventDetails }) => {
  const { PERFORMER, VENUE } = eventDetails;
  console.log('eventDetails', eventDetails);

  // Initialize isLiked as a boolean
  const [isLiked, setIsLiked] = React.useState(false);

  // Toggle like state
  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    // Optional: Add logic to handle like action (e.g., API call)
  };

  return (
    <View style={styles.container}>
      {PERFORMER && PERFORMER.image && (
        <Image source={{ uri: PERFORMER.image }} style={styles.performerImage} />
      )}

      {/* Render social media icons */}
      <View style={styles.socialMediaContainer}>
        {PERFORMER?.socialMedia?.youtube && (
          <Image source={YoutubeIcon} style={styles.icon} />
        )}
        {PERFORMER?.socialMedia?.facebook && (
          <Image source={FacebookIcon} style={styles.icon} />
        )}
        {PERFORMER?.socialMedia?.instagram && (
          <Image source={InstagramIcon} style={styles.icon} />
        )}
        {PERFORMER?.socialMedia?.linkedin && (
          <Image source={GoogleMapsIcon} style={styles.icon} />
        )}
        {VENUE?.address && (
          <Image source={GoogleMapsIcon} style={styles.icon} />
        )}
        {/* Like Icon */}
        <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
          <Image
            source={isLiked ? LikeTrue : LikeFalse}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.title}>{PERFORMER?.name}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15, // Added padding for better spacing
  },
  performerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0', // Placeholder background color
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Align icons horizontally
    alignItems: 'center', // Vertically center the icons
    marginVertical: 10, // Space above and below the icons
  },
  icon: {
    width: 40,
    height: 40,
  },
  likeButton: {
    // Optional: Add padding or margins if needed
  },
});

export default PerformerSection;
