import React from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

// Define types for the props
interface EventModalProps {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
  onGetDirections: (latitude: number, longitude: number) => void;
}

// Define the structure of an Event object
interface Event {
  image: string;
  title: string;
  context: string;
  date: string;
  time: string;
  organizer: string;
  location: {
    latitude: number;
    longitude: number;
  };
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
      {/* Detect taps outside the modal content */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          {/* Prevent clicks inside modal content from closing it */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Image source={{ uri: event?.image }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{event?.title}</Text>
              <Text>{event?.context}</Text>
              <Text>When: {event?.date} {event?.time}</Text>
              <Text>Where: {event?.organizer}</Text>
              <Text>Location: Latitude {event?.location.latitude}, Longitude {event?.location.longitude}</Text>

              {/* Directions Button */}
              <TouchableOpacity
                style={styles.directionsButton}
                onPress={() => onGetDirections(event?.location.latitude!, event?.location.longitude!)}
              >
                <Text style={styles.buttonText}>Get Directions</Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Transparent dark background
    // set modal shadow for both iOS and Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContent: {
    width: '100%',
    height: '80%', // Modal takes up 80% of the screen height
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
