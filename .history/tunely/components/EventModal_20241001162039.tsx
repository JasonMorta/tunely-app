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
      isVisible={visible} // Replace 'visible' with 'isVisible'
      onBackdropPress={onClose} // Close modal when backdrop is pressed
      onSwipeComplete={onClose} // Close modal when swipe is completed
      swipeDirection="down" // Enable swipe down to close
      style={styles.modal} // Custom styles for the modal
      animationIn="slideInUp" // Animation when modal appears
      animationOut="slideOutDown" // Animation when modal disappears
      propagateSwipe={true} // Allow swipe gestures within the modal content
      backdropTransitionOutTiming={0} // Fix for backdrop flickering on Android
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
              cachePolicy="memory-disk" // Choose appropriate caching strategy
              transition={1000} // Optional: fade-in transition
              placeholder={require('../assets/adaptive-icon.png')} // Optional: placeholder image
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
                activeOpacity={0.7} // Optional: feedback on press
              >
                <Text style={styles.buttonText}>BACK</Text>
              </TouchableOpacity>

              {/* Directions Button */}
              <TouchableOpacity
                style={styles.directionsButton}
                onPress={() => onGetDirections(event.location)}
                activeOpacity={0.7} // Optional: feedback on press
              >
                <Image
                  source={require('../assets/images/map.png')}
                  style={styles.directionsImage}
                />
                <Text style={styles.buttonText}>Directions</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default EventModal;
