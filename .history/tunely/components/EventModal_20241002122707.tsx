// EventModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal'; // Import Modal from react-native-modal
import { Image as ExpoImage } from 'expo-image'; // Import Image from expo-image
import styles from './eventModalStyling';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

// Define types for the props
interface EventModalProps {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
  onGetDirections: (location: string) => void;
}

// Define the structure of an Event object
interface Event {
  artist_name: string;
  date: string;
  description: string;
  image: string;
  location: string;
  time: string;
  venue: string;
}

// EventModal component
const EventModal: React.FC<EventModalProps> = ({
  visible,
  event,
  onClose,
  onGetDirections,
}) => {
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
        <ThemedView style={styles.dragHandle} />

        {event && (
          <>
            {/* Display event image with caching */}
            <ExpoImage
              source={{ uri: event.image }}
              style={styles.modalImage}
              cachePolicy="memory-disk" // Caching strategy
              transition={1000} // Fade-in transition
              placeholder={require('../assets/images/placeholder.png')} // Placeholder image
            />

            {/* Display event details */}
            <ThemedText style={styles.modalTitle}>{event.artist_name}</ThemedText>
            <ThemedText style={styles.modalDate}>
              <ThemedText style={{ fontWeight: 'bold' }}>Date: </ThemedText>
              {event.date}
            </ThemedText>
            <ThemedText style={styles.modalTime}>
              <ThemedText style={{ fontWeight: 'bold' }}>Time: </ThemedText>
              {event.time || 'Not specified'}
            </ThemedText>
            <ThemedText style={styles.modalVenue}>
              <ThemedText style={{ fontWeight: 'bold' }}>Venue: </ThemedText>
              {event.venue}
            </ThemedText>
            <ThemedText style={styles.modalLocation}>
              <ThemedText style={{ fontWeight: 'bold' }}>Location: </ThemedText>
              {event.location}
            </ThemedText>
            <ThemedText style={styles.modalDescription}>
              {event.description}
            </ThemedText>


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
                <Text style={styles.buttonText}>BACK</Text>
              </TouchableOpacity>

              {/* Directions Button */}
              <TouchableOpacity
                style={styles.directionsButton}
                onPress={() => onGetDirections(event.location)}
                activeOpacity={0.7} // Provides feedback on press
                accessibilityLabel="Get directions to venue"
                accessible={true}
              >
                <Image
                  source={require('../assets/images/map-mini.png')}
                  style={styles.directionsImage}
                  accessible={false} // Decorative image
                />
            
              </TouchableOpacity>
            </View>
          </>
        )}
      </ThemedView>
    </Modal>
  );
};

export default EventModal;
