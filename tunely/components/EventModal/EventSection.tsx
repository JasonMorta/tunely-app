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

interface EventSectionProps {
  eventDetails: EventData; // Use EventData type for prop
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const EventSection: React.FC<EventSectionProps> = ({ eventDetails }) => {
  const { PERFORMER, VENUE } = eventDetails;
  console.log('🏁VENUE🏁', VENUE);

  // Initialize isLiked as a boolean
  const [isLiked, setIsLiked] = React.useState(false);

  // Toggle like state
  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    // Optional: Add logic to handle like action (e.g., API call)
  };

  // Access the first image if available
  const firstImage = VENUE?.images?.[0]?.trim();

  // Helper function to open external links
  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Unsupported URL', `Cannot open the link: ${url}`);
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
      Alert.alert('Error', 'An error occurred while trying to open the link.');
    }
  };

  // Helper function to open maps with the given address
  const openMaps = async (address: string) => {
    try {
      const encodedAddress = encodeURIComponent(address);
      const url =
        Platform.OS === 'ios'
          ? `http://maps.apple.com/?q=${encodedAddress}`
          : `geo:0,0?q=${encodedAddress}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Unsupported URL', `Cannot open the map for address: ${address}`);
      }
    } catch (error) {
      console.error('Failed to open maps:', error);
      Alert.alert('Error', 'An error occurred while trying to open the map.');
    }
  };

  // Handler for image loading errors
  const handleImageError = () => {
    console.error(`Failed to load the first image.`);
    // Optionally, you can set a fallback image or handle the error as needed
  };

  return (
    <View style={styles.container}>
      {/* Render the first image or fallback */}
      {firstImage ? (
        <Image
          source={{ uri: firstImage }}
          style={styles.performerImage}
          resizeMode="cover"
          onError={handleImageError}
          accessibilityLabel="Venue image"
        />
      ) : (
        // Fallback image or placeholder if no valid images
        <Image
          source={require('../../assets/images/placeholder.png')} // Ensure this path is correct
          style={styles.performerImage}
          resizeMode="cover"
          accessibilityLabel="Placeholder image"
        />
      )}

      {/* Venue Description */}
      <ThemedText style={styles.title}>{VENUE?.name}</ThemedText>

      {/* Render social media icons */}
      <View style={styles.socialMediaContainer}>
        {PERFORMER?.socialMedia?.youtube && (
          <TouchableOpacity
            onPress={() => openLink(PERFORMER?.socialMedia?.youtube!)}
            accessibilityLabel="Open YouTube profile"
            accessibilityRole="button"
          >
            <Image source={YoutubeIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        {PERFORMER?.socialMedia?.facebook && (
          <TouchableOpacity
            onPress={() => openLink(PERFORMER?.socialMedia?.facebook!)}
            accessibilityLabel="Open Facebook profile"
            accessibilityRole="button"
          >
            <Image source={FacebookIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        {PERFORMER?.socialMedia?.instagram && (
          <TouchableOpacity
            onPress={() => openLink(PERFORMER?.socialMedia?.instagram!)}
            accessibilityLabel="Open Instagram profile"
            accessibilityRole="button"
          >
            <Image source={InstagramIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        {PERFORMER?.socialMedia?.linkedin && (
          <TouchableOpacity
            onPress={() => openLink(PERFORMER?.socialMedia?.linkedin!)}
            accessibilityLabel="Open LinkedIn profile"
            accessibilityRole="button"
          >
            <Image source={GoogleMapsIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        {VENUE?.address && (
          <TouchableOpacity
            onPress={() => openMaps(VENUE.address!)}
            accessibilityLabel="Open venue location in maps"
            accessibilityRole="button"
          >
            <Image source={GoogleMapsIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        {/* Like Icon */}
        <TouchableOpacity
          onPress={toggleLike}
          style={styles.likeButton}
          accessibilityLabel={isLiked ? 'Unlike' : 'Like'}
          accessibilityRole="button"
        >
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

// Define styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15, // Added padding for better spacing
    backgroundColor: 'aliceblue',
  },
  // Removed pagerView and page styles as they're no longer needed
  performerImage: {
    width: SCREEN_WIDTH * 0.8, // 80% of screen width for responsiveness
    height: 200, // Fixed height since we're displaying a single image
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Placeholder background color
    alignSelf: 'center', // Center the image horizontally
    marginBottom: 10, // Add some space below the image
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

export default EventSection;
