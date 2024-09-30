import React, { useState } from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet, Modal, TouchableOpacity, Linking, Platform, Alert, TouchableWithoutFeedback } from 'react-native';
import events from '../eventsData'; // Import the event data

export default function Index() {
  // State to manage modal visibility and selected event
  const [modalVisible, setModalVisible] = useState(false); // `modalVisible` tracks whether the modal is open or closed
  const [selectedEvent, setSelectedEvent] = useState(null); // `selectedEvent` holds the currently selected event's details

  // Function to open modal and set the selected event
  const openModal = (event) => {
    setSelectedEvent(event); // Store the selected event details in the state
    setModalVisible(true); // Open the modal by setting `modalVisible` to true
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedEvent(null); // Clear the selected event details
    setModalVisible(false); // Close the modal by setting `modalVisible` to false
  };

  // Function to check and offer navigation apps
  const handleGetDirections = async (latitude, longitude) => {
    // URL schemes for Google Maps, Apple Maps, and fallback to browser-based Google Maps
    const googleMapsUrl = `comgooglemaps://?q=${latitude},${longitude}`;
    const appleMapsUrl = `maps:0,0?q=${latitude},${longitude}`;
    const browserGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    // Check if Google Maps is installed on the device
    const isGoogleMapsAvailable = await Linking.canOpenURL('comgooglemaps://');

    // Show an alert with options to choose between Google Maps or Apple Maps
    Alert.alert(
      "Open Directions",
      "Choose the app to open directions",
      [
        {
          text: "Google Maps",
          onPress: () => {
            if (isGoogleMapsAvailable) {
              Linking.openURL(googleMapsUrl); // Open in Google Maps if installed
            } else {
              Linking.openURL(browserGoogleMapsUrl); // Open in browser if Google Maps app is not installed
            }
          },
        },
        {
          text: "Apple Maps",
          onPress: () => {
            Linking.openURL(appleMapsUrl); // Open in Apple Maps
          },
          style: "cancel", // Default option for Apple Maps
        },
      ],
      { cancelable: true }
    );
  };

  // Render each event item in the FlatList
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
      {/* Render a list of events using FlatList */}
      <FlatList
        data={events} // Array of event data
        renderItem={renderItem} // Function to render each event item
        keyExtractor={(item) => item.id} // Key for each item in the list
      />

      {/* Modal for Event Details */}
      {selectedEvent && (
        <Modal
          animationType="slide" // Modal slides up from the bottom
          transparent={true} // Transparent background around the modal
          visible={modalVisible} // Modal visibility state
          onRequestClose={closeModal} // Triggered when the user attempts to close the modal
        >
          {/* TouchableWithoutFeedback to detect taps outside the modal content */}
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              {/* TouchableWithoutFeedback prevents clicks inside modal content from closing it */}
              <TouchableWithoutFeedback>
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
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

// Styles for the components
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
