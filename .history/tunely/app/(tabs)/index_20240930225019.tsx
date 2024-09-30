import React, { useState } from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet, Alert, Linking } from 'react-native';
import events from '../eventsData'; // Import the event data
import EventModal from '../components/EventModal'; // Import the EventModal component

const Index: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Function to open modal and set the selected event
  const openModal = (event: any) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedEvent(null);
    setModalVisible(false);
  };

  // Function to check and offer navigation apps
  const handleGetDirections = async (latitude: number, longitude: number) => {
    const googleMapsUrl = `comgooglemaps://?q=${latitude},${longitude}`;
    const appleMapsUrl = `maps:0,0?q=${latitude},${longitude}`;
    const browserGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    const isGoogleMapsAvailable = await Linking.canOpenURL('comgooglemaps://');

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
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Render each event item in the FlatList
  const renderItem = ({ item }: { item: any }) => (
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
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <EventModal
        visible={modalVisible} // Pass visibility state to the modal
        event={selectedEvent} // Pass selected event details
        onClose={closeModal} // Pass close function
        onGetDirections={handleGetDirections} // Pass function to handle directions
      />
    </View>
  );
}

// Styles for the list and container
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
});

export default Index;
