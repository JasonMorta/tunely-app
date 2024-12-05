// src/components/PerformerSection.tsx

import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { EventData } from '../../types/EventTypes';

// Placeholder for social media icon imports
import FacebookIcon from '../../assets/icons/facebook-svgrepo-com.png'; // Update with actual icon paths
import InstagramIcon from '../../assets/icons/instagram-1-svgrepo-com.png';
import Twitter from '../../assets/icons/twitter-svgrepo-com.png';
import YoutubeIcon from '../../assets/icons/youtube-svgrepo-com.png';
import LinkedIn from '../../assets/icons/linkedin-svgrepo-com.png';
import LikeFalse from '../../assets/icons/like-false.png';
import LikeTrue from '../../assets/icons/like-true.png';
import { ThemedView } from '../ThemedView';
import AddressOptions from './AddressOptions';

interface EventSectionProps {
  eventDetails: EventData; // Use EventData type for prop
}

const PerformerSection: React.FC<EventSectionProps> = ({ eventDetails }) => {
  const { PERFORMER, VENUE } = eventDetails;
  

  // Initialize isLiked as a boolean
  const [isLiked, setIsLiked] = React.useState(false);

  // Toggle like state
  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    // Optional: Add logic to handle like action (e.g., API call)
  };

  if (!PERFORMER) {
    return 'no data';
  }

  return (
    <ThemedView style={styles.container}>
        {/* <ThemedText style={styles.title}>Performer</ThemedText> */}

      {PERFORMER && PERFORMER.image && (
        <Image source={{ uri: PERFORMER.image }} style={styles.performerImage} />
      )}

      {/* Render social media icons */}
    
      <ThemedView style={styles.socialMediaContainer}>
        {PERFORMER?.socialMedia?.youtube && (
          <Image source={YoutubeIcon} style={styles.icon} />
        )}
        {PERFORMER?.socialMedia?.facebook && (
          <Image source={FacebookIcon} style={styles.icon} />
        )}
        {PERFORMER?.socialMedia?.instagram && (
          <Image source={InstagramIcon} style={styles.icon} />
        )}
         {PERFORMER?.socialMedia?.twitter && (
          <Image source={Twitter} style={styles.icon} />
        )}
        {PERFORMER?.socialMedia?.linkedin && (
          <Image source={LinkedIn} style={styles.icon} />
        )}
        <AddressOptions address={VENUE?.address || 'No address available'} source={"performer"} />
        {/* Like Icon */}
        <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
          <Image
            source={isLiked ? LikeTrue : LikeFalse}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ThemedView>

      {/* Display performer name */}
      <ThemedText style={styles.performerName}>{PERFORMER?.name?.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
    paddingBottom: 15, // Added padding for better spacing
    //backgroundColor: 'beige',
    width: '100%',
  },
  performerImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    //backgroundColor: '#f0f0f0', // Placeholder background color
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
  },
  socialMediaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Evenly space the icons
    alignItems: 'center', // Vertically center the icons
    marginVertical: 10, // Space above and below the icons
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: '#000',
  },
  performerName: {
    fontSize: 35,
    height: 'auto',
    textAlign: 'center',
    lineHeight: 50,

    fontWeight: 'bold',
    marginVertical: 0,
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
