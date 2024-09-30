import React, { useState } from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet, Modal, TouchableOpacity, Linking, Platform, Alert } from 'react-native';
import events from '../eventsData'; // Import the event data

export default function Index() {
  // State to manage modal visibility and selected event
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Function to open modal and set the selected event
  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedEvent(null);
    setModalVisible(false);
  };

  // Function to check and offer navigation apps
  const handleGetDirections = async (latitude, longitude) => {
    // Check if Google Maps is installed
    const googleMapsUrl = `comgooglemaps://?q=${latitude},${longitude}`;
    const appleMapsUrl = `maps:0,0?q=${latitude},${longitude}`;
    const browserGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    const isGoogleMapsAvailable = await Linking.canOpenURL('comgooglemaps://');

    // Show an alert dialog with available options
    Alert.alert(
      "Open Directions",
      "Choose the app to open directions",
      [
        {
          text: "Google Maps",
          onPress: () => {
            if (isGoogleMapsAvailable) {
              Linking.openURL(googleMapsUrl);
            } else {
              Linking.openURL(browserGoogleMapsUrl); // Open in browser if Google Maps app is not installed
            }
          },
        },
        {
          text: "Apple Maps",
          onPress: () => {
            Linking.openURL(appleMapsUrl);
          },
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Render each event item
  const renderItem = ({ item }) => (
    <Pressable style={styles.eventItem} onPress={() => openModal(item)}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text>{item.date} - {item.time}</Text>
        <Text>Price: {item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Event List */}
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Modal for Event Details */}
      {selectedEvent && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedEvent.image }} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
              <Text>{selectedEvent.context}</Text>
              <Text>When: {selectedEvent.date} {selectedEvent.time}</Text>
              <Text>Where: {selectedEvent.organizer}</Text>
              <Text>Location: Latitude {selectedEvent.location.latitude}, Longitude {selectedEvent.location.longitude}</Text>

              {/* Directions Button */}
              <TouchableOpacity
                style={styles.directionsButton}
                onPress={() => handleGetDirections(selectedEvent.location.latitude, selectedEvent.location.longitude)}
              >
                <Text style={styles.buttonText}>Get Directions</Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  eventDetails: {
    marginLeft: 10,
    flex: 1,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // This makes the modal slide up from the bottom
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent dark background
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
    bottom: 20, // Close button stays at the bottom of the modal
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
