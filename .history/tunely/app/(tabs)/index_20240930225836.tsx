import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet, Alert, Linking } from 'react-native';
import { database } from '../../firebaseConfig'; // Import the Firebase config
import { ref, get } from "firebase/database"; // Firebase database methods
import EventModal from '../../components/EventModal';

const Index: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]); // State to store events fetched from Firebase
  const [loading, setLoading] = useState(true);

  // Fetch events from Firebase Realtime Database on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const dbRef = ref(database, 'events'); // Path in Firebase where your events are stored
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const eventsData = snapshot.val();
          const formattedEvents = Object.keys(eventsData).map((key) => ({
            id: key,
            ...eventsData[key],
          }));

          setEvents(formattedEvents); // Set the fetched events into the state
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data from Firebase: ", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEvents();
  }, []);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <EventModal
        visible={modalVisible}
        event={selectedEvent}
        onClose={closeModal}
        onGetDirections={handleGetDirections}
      />
    </View>
  );
};

// Styles for the list and container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
