import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet, Alert, Linking } from 'react-native';
import { database } from '../../firebaseConfig'; // Import the Firebase config
import { ref, get } from "firebase/database"; // Firebase database methods
import EventModal from '../../components/EventModal';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useColorScheme } from '../../hooks/useColorScheme';

const Index: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]); // State to store events fetched from Firebase
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();

  const styles = getStyles(colorScheme);

  // Fetch events from Firebase Realtime Database on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const dbRef = ref(database, 'events'); // Path in Firebase where your events are stored
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const eventsData = snapshot.val();
          
          // Convert the snapshot data into an array of event objects
          const formattedEvents = Object.keys(eventsData).map((key) => ({
            id: key,
            artist_name: eventsData[key].artist_name,
            date: eventsData[key].date,
            description: eventsData[key].description,
            image: eventsData[key].image,
            location: eventsData[key].location,
            time: eventsData[key].time,
            venue: eventsData[key].venue,
          }));

          setEvents(formattedEvents); // Set the fetched events into the state
        } else {
          console.log("No events data available");
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
  const handleGetDirections = async (location: string) => {
    const googleMapsUrl = `comgooglemaps://?q=${location}`;
    const appleMapsUrl = `maps:0,0?q=${location}`;
    const browserGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location}`;

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
        },
        {
          text: "Cancel", // The cancel option
          style: "cancel", // It will close the alert without performing any action
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
        <ThemedText style={styles.eventTitle}>{item.artist_name}</ThemedText>
        <ThemedText>{item.date} - {item.time}</ThemedText>
        <ThemedText>Venue: {item.venue}</ThemedText>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>Loading events...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {events.length === 0 ? (
        <ThemedText>No events found.</ThemedText> // Display message if no events are found
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
     
      <EventModal
        visible={modalVisible} // Pass visibility state to the modal
        event={selectedEvent} // Pass selected event details
        onClose={closeModal} // Pass close function
        onGetDirections={(location: any) => handleGetDirections(String(location))} // Pass function to handle directions
      />
    </ThemedView>
  );
};

// Styles for the list and container
const getStyles = (colorScheme: any) => StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
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
    //marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: colorScheme === 'dark' ? '#444' : '#ccc',
    paddingVertical: 10,
    borderRadius: 0,
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
