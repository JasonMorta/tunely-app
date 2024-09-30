import React from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

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
                  <Image source={{ uri: event.image }} style={styles.modalImage} />

                  {/* Display event details */}
                  <View style={styles.detailsContainer}>
                    <Text style={styles.modalTitle}>{event.artist_name}</Text>
                    <Text style={styles.modalSubtitle}>Date: {event.date}</Text>
                    <Text style={styles.modalSubtitle}>Time: {event.time}</Text>
                    <Text style={styles.modalSubtitle}>Venue: {event.venue}</Text>
                    <Text style={styles.modalSubtitle}>Location: {event.location}</Text>
                    <Text style={styles.modalDescription}>{event.description}</Text>

                    {/* Directions Button */}
                    <TouchableOpacity
                      style={styles.directionsButton}
                      onPress={() => onGetDirections(event.location)}
                    >
                      <Text style={styles.buttonText}>Get Directions</Text>
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

// Styles for the modal components
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent dark background
    // set modal shadow for both iOS and Android
    // Android shadow
    elevation: 5,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContent: {
    width: '100%',
    height: '80%', // Modal takes up 80% of the screen height
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden', // Ensures the image fills the top section properly
  },
  modalImage: {
    width: '100%',
    height: '40%', // Takes 40% of the modal height
    resizeMode: 'cover', // Ensures the image covers the entire area without distortion
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  directionsButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    backgroundColor: '#E37383',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EventModal;
