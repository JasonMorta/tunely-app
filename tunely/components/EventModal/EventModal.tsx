// src/components/EventModal.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { ThemedView } from '../ThemedView';
import EventSection from './EventSection';
import VenueSection from './VenueSection';
import { EventData } from '../../types/EventTypes';
import { ThemedText } from '../ThemedText';

interface EventModalProps {
  visible: boolean;
  event: EventData; // Ensure the event is of type EventData
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ visible, event, onClose }) => {
  if (!event) return null;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose} // Handle swipe to close
      swipeDirection={['down']} // Allow swipe down to close
      style={styles.modal}
    >
      <ThemedView style={styles.modalContent}>
        <EventSection eventDetails={event} />
        <VenueSection venueDetails={event.VENUE} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ThemedText style={styles.buttonText}>BACK</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default EventModal;
