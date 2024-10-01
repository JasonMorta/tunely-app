// EventModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal'; // Import Modal from react-native-modal
import { Image as ExpoImage } from 'expo-image'; // Import Image from expo-image
import styles from './eventModalStyling';

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
      <View style={styles.modalContent}>
        {/* Drag Handle */}
        <View style={styles.dragHandle} />

        {event && (
          <>
            {/* Display event image with caching */}
            <ExpoImage
              source={{ uri: event.image }}
              style={styles.modalImage}
              cachePolicy="memory-disk" // Caching strategy
              transition={1000} // Fade-in transition
              placeholder={require('../assets/images/width_512.png')} // Placeholder image
            />

            {/* Display event details */}
            <Text style={styles.modalTitle}>{event.artist_name}</Text>
            <Text style={styles.modalSubtitle}>Date: {event.date}</Text>
            <Text style={styles.modalSubtitle}>Time: {event.time}</Text>
            <Text style={styles.modalSubtitle}>Venue: {event.venue}</Text>
            <Text style={styles.modalSubtitle}>Location: {event.location}</Text>
            <Text style={styles.modalDescription}>{event.description}</Text>

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
                  source={require('../assets/images/map.png')}
                  style={styles.directionsImage}
                  accessible={false} // Decorative image
                />
            
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default EventModal;
