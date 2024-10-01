import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'expo-image';
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
const EventModal: React.FC<EventModalProps> = ({ visible, event, onClose, onGetDirections }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* TouchableWithoutFeedback to detect taps outside the modal content */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          {/* TouchableWithoutFeedback prevents clicks inside modal content from closing it */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {event && (
                <>
                  {/* Display event image */}
                  <Image
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
             

                   <View style={styles.buttonContainer}>
                    {/* Directions Button */}
                    <TouchableOpacity
                      style={styles.directionsButton}
                      onPress={() => onGetDirections(event.location)}
                    >
                       <Image
                        source={require('../assets/images/map.png')}
                        style={styles.directionsImage}
                      />
                      <Text style={styles.buttonText}>Directions</Text>
                    </TouchableOpacity>

                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                      <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};



export default EventModal;
