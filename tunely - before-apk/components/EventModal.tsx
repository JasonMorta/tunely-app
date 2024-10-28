// src/components/EventModal.tsx

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Alert 
} from 'react-native';
import Modal from 'react-native-modal'; // Import Modal from react-native-modal
import { Image as ExpoImage } from 'expo-image'; // Import Image from expo-image
import { useColorScheme } from '../hooks/useColorScheme';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import placeholderImage from '../assets/images/thumb.gif'; // Ensure this path is correct
import mapMiniImage from '../assets/images/map-mini.png'; // Ensure this path is correct
import { primaryColor, tintColorDark, tintColorLight } from '../constants/Colors';
import { EventData } from '../types/EventTypes';
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns'; // If using date-fns
import { database } from '../firebaseConfig'; // Import Firebase config
import { ref, onValue, off, runTransaction } from "firebase/database"; // Import Firebase methods

// Import SVGs as React components
import HeartFilled from '../assets/svg/likes-true.svg';
import HeartOutline from '../assets/svg/likes-false.svg';

interface EventModalProps {
  visible: boolean;
  event: EventData | null;
  onClose: () => void;
  onGetDirections: (location: string) => void;
}

const EventModal: React.FC<EventModalProps> = ({
  visible,
  event,
  onClose,
  onGetDirections,
}) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  
  // Local state to store the latest event data
  const [currentEvent, setCurrentEvent] = useState<EventData | null>(event);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [liked, setLiked] = useState<boolean>(false); // State to track if user has liked the event

  useEffect(() => {
    // If no event is selected, clear the local state
    if (!event || !event.id) {
      setCurrentEvent(null);
      setTimeRemaining('');
      setLiked(false);
      return;
    }

    // Reference to the specific event in Firebase
    const eventRef = ref(database, `events/${event.id}`);

    // Listener callback
    const listener = onValue(eventRef, (snapshot) => {
      if (snapshot.exists()) {
        const updatedEvent: EventData = snapshot.val();
        updatedEvent.id = snapshot.key || event.id; // Ensure the id is present
        setCurrentEvent(updatedEvent);
      } else {
        console.log(`Event with ID ${event.id} does not exist.`);
        setCurrentEvent(null);
      }
    }, (error) => {
      console.error("Error fetching event data from Firebase: ", error);
      Alert.alert("Error", "Failed to load event data.");
    });

    // Cleanup listener on unmount or when event changes
    return () => {
      off(eventRef, 'value', listener);
    };
  }, [event]);

  useEffect(() => {
    // Calculate time remaining based on the currentEvent
    if (!currentEvent) {
      setTimeRemaining('');
      setLiked(false);
      return;
    }

    const calculateRemainingTime = () => {
      if (!currentEvent.eventDate?.startDay || !currentEvent.eventDate?.startTime) {
        setTimeRemaining('No start time available');
        return;
      }

      const eventDateTimeString = `${currentEvent.eventDate.startDay}T${currentEvent.eventDate.startTime}:00`;
      const eventDateTime = new Date(eventDateTimeString);

      const now = new Date();
      const diffInMs = eventDateTime.getTime() - now.getTime();

      if (diffInMs <= 0) {
        setTimeRemaining('Event has started');
        return;
      }

      const totalMinutes = differenceInMinutes(eventDateTime, now);
      const days = differenceInDays(eventDateTime, now);
      const hours = differenceInHours(eventDateTime, now) % 24;
      const minutes = totalMinutes % 60;

      let remaining = '';
      if (days > 0) {
        remaining += `${days}d `;
      }
      if (hours > 0 || days > 0) {
        remaining += `${hours}h `;
      }
      remaining += `${minutes}m`;

      setTimeRemaining(`Starts in ${remaining}`);
    };

    // Initial calculation
    calculateRemainingTime();

    // Update remaining time every minute
    const intervalId = setInterval(calculateRemainingTime, 60000); // 1 minute

    // Cleanup on unmount or when currentEvent changes
    return () => clearInterval(intervalId);
  }, [currentEvent]);

  // Function to toggle like status
  const toggleLike = async () => {
    if (!currentEvent || !currentEvent.id) return;

    const likesRef = ref(database, `events/${currentEvent.id}/likes/likes`);

    try {
      await runTransaction(likesRef, (currentLikes) => {
        if (currentLikes === null) {
          return 1;
        }
        return liked ? Math.max(currentLikes - 1, 0) : currentLikes + 1;
      });

      setLiked(!liked);
    } catch (error) {
      console.error("Error updating likes: ", error);
      Alert.alert("Error", "Failed to update like status. Please try again.");
    }
  };

  // Effect to initialize 'liked' state based on current likes
  useEffect(() => {
    if (!currentEvent || !currentEvent.likes) {
      setLiked(false);
      return;
    }

    // For simplicity, assuming 'liked' state is not user-specific
    // If you want user-specific like tracking, consider implementing user authentication
    // and tracking likes per user in Firebase
    // Here, we assume 'liked' is reset each time the modal opens
    setLiked(false);
  }, [currentEvent]);

  if (!currentEvent) {
    return null; // Don't render modal content if no event is selected or event is deleted
  }

  // Safely access nested properties with fallback values
  const performerName = currentEvent?.PERFORMER?.name || currentEvent?.performerName || "Unknown Performer";
  const performerEmail = typeof currentEvent?.PERFORMER?.email === 'string'
    ? currentEvent.PERFORMER.email
    : Array.isArray(currentEvent?.PERFORMER?.email) && (currentEvent.PERFORMER.email as string[]).length > 0
      ? currentEvent.PERFORMER.email[0]
      : "No Email";

  const date = currentEvent?.eventDate?.startDay && currentEvent?.eventDate?.startTime
    ? `${currentEvent.eventDate.startDay} ${currentEvent.eventDate.startTime}`
    : (currentEvent?.date?.startDay && currentEvent?.date?.startTime
      ? `${currentEvent.date.startDay} ${currentEvent.date.startTime}`
      : "No Date");

  const venueName = currentEvent?.VENUE?.name || currentEvent?.venue || "No Venue";
  const venueAddress = currentEvent?.VENUE?.address || "No Address";
  const description = currentEvent?.description || "No Description";

  // Determine the image URI, prioritizing performerImage over event.image
  const imageUri = currentEvent?.PERFORMER?.performerImage || currentEvent?.image || undefined;

  return (
    <Modal
      isVisible={visible} // Controls modal visibility
      onBackdropPress={onClose} // Closes modal when backdrop is pressed
      onSwipeComplete={onClose} // Closes modal on swipe completion
      swipeDirection="down" // Enables swipe-down gesture
      style={styles.modal} // Applies custom modal styles
      animationIn="slideInUp" // Animation when modal appears
      animationOut="slideOutDown" // Animation when modal disappears
      propagateSwipe={true} // Allows swipe gestures within modal content
      backdropTransitionOutTiming={0} // Fixes backdrop flickering on Android
    >
      <ThemedView style={styles.modalContent}>
        {/* Drag Handle */}
        <View style={styles.dragHandle} />

        {/* Display event image with caching */}
        <ExpoImage
          source={imageUri ? { uri: imageUri } : placeholderImage}
          contentPosition="top" // Center image
          style={styles.modalImage}
          cachePolicy="memory-disk" // Caching strategy
          transition={1000} // Fade-in transition
          placeholder={require('../../assets/images/thumb.gif')} // Placeholder image
        />

        {/* Display event details */}
        <ThemedText style={styles.modalTitle}>{performerName}</ThemedText>
        <ThemedText style={styles.modalSubtitle}>
          {String(date)} - {String(venueName)}
        </ThemedText>
        <ThemedText style={styles.modalVenue}>
          <ThemedText style={styles.boldText}>Venue: </ThemedText>
          {String(venueName)}
        </ThemedText>
        <ThemedText style={styles.modalLocation}>
          <ThemedText style={styles.boldText}>Location: </ThemedText>
          {venueAddress}
        </ThemedText>
        <ThemedText style={styles.modalDescription}>
          {description}
        </ThemedText>

        {/* Display Remaining Time */}
        <ThemedText style={styles.eventTime}>{timeRemaining}</ThemedText>

        {/* Like Section */}
        <View style={styles.likeSection}>
          <TouchableOpacity 
            onPress={toggleLike} 
            style={styles.likeButton}
            accessibilityLabel={liked ? "Unlike event" : "Like event"}
            accessible={true}
          >
            {liked ? (
              <HeartFilled width={24} height={24} />
            ) : (
              <HeartOutline width={24} height={24} />
            )}
            <ThemedText style={styles.likeCount}>
              {currentEvent.likes?.likes || 0}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Container for Directions and Close buttons */}
        <View style={styles.buttonContainer}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7} // Provides feedback on press
            accessibilityLabel="Close modal"
            accessible={true}
          >
            <ThemedText style={styles.buttonText}>BACK</ThemedText>
          </TouchableOpacity>

          {/* Directions Button */}
          <TouchableOpacity
            style={styles.directionsButton}
            onPress={() => onGetDirections(venueAddress)}
            activeOpacity={0.7} // Provides feedback on press
            accessibilityLabel="Get directions to venue"
            accessible={true}
          >
            <Image
              source={mapMiniImage} // Use a valid path to your map-mini.png
              style={styles.directionsImage}
              accessible={false} // Decorative image
            />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </Modal>
  );
};

// Styles for the modal, adjusted based on the color scheme
const getStyles = (colorScheme: any) => StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: colorScheme === 'dark' ? '#1c1c1c' : '#ffffff',
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 500, // Adjusted to accommodate like section
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: colorScheme === 'dark' ? '#555555' : '#cccccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colorScheme === 'dark' ? '#ffffff' : '#000000',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 16,
    color: colorScheme === 'dark' ? '#aaaaaa' : '#666666',
    marginBottom: 10,
  },
  modalVenue: {
    fontSize: 16,
    color: colorScheme === 'dark' ? '#dddddd' : '#333333',
    marginBottom: 5,
  },
  modalLocation: {
    fontSize: 16,
    color: colorScheme === 'dark' ? '#dddddd' : '#333333',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 14,
    color: colorScheme === 'dark' ? '#cccccc' : '#555555',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: colorScheme === 'dark' ? '#ffffff' : '#000000',
  },
  eventTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  likeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 8,
    fontSize: 16,
    color: colorScheme === 'dark' ? '#ffffff' : '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: tintColorDark,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  directionsButton: {
    backgroundColor: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  directionsImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});

export default EventModal;
