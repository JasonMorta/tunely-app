// Index.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Image, 
  FlatList, 
  StyleSheet, 
  Alert, 
  Linking,
  InteractionManager
} from 'react-native';
import { database } from '../../firebaseConfig'; // Import the Firebase config
import { ref, onValue, off } from "firebase/database"; // Use onValue for real-time updates
import EventModal from '../../components/EventModal/EventModal';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors, tintColorDark, tintColorLight } from '../../constants/Colors';
import placeholderImage from '../../assets/images/thumb.gif'; // Import a placeholder image
import EventItem from './EventItem';
import { EventData } from '../../types/EventTypes';


const Index: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState<EventData[]>([]); // Strongly type your state
  const [loading, setLoading] = useState(true);
  const [imageErrorIds, setImageErrorIds] = useState<string[]>([]); // State to track image loading errors
  const colorScheme = useColorScheme();

  const styles = getStyles(colorScheme);

  // Fetch events from Firebase Realtime Database with real-time updates
  useEffect(() => {
    const dbRef = ref(database, 'events'); // Path in Firebase where your events are stored

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const eventsData: { [key: string]: EventData } = snapshot.val();

        // Convert the snapshot data into an array of EventData objects
        const fetchedEvents: EventData[] = Object.keys(eventsData).map((key) => {
          const event = eventsData[key];
          return {
            ...event,
            id: key, // Ensure each event has a unique id
          };
        });

        setEvents(fetchedEvents); // Update the state with fetched events
      } else {
        //console.log("No events data available");
        setEvents([]); // Clear events if none are available
      }

      // Use InteractionManager to wait until interactions are done
      InteractionManager.runAfterInteractions(() => {
        setLoading(false); // Stop loading after interactions
      });
    }, (error) => {
      console.error("Error fetching data from Firebase: ", error);
      Alert.alert("Error", "Failed to load events. Please try again later.");
      setLoading(false); // Stop loading on error
    });

    // Cleanup listener on unmount
    return () => {
      off(dbRef, 'value', unsubscribe);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to open modal and set the selected event
  const openModal = (event: EventData) => {
    //console.log('event💵', event)
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

  // Function to handle image load error
  const handleImageError = (id: string) => {
    setImageErrorIds((prev) => [...prev, id]);
    console.log(`Failed to load image for Event ID: ${id}`);
  };

  // Render each event item in the FlatList using EventItem component
  const renderItem = ({ item }: { item: EventData }) => (
    <EventItem
      event={item}
      onPress={() => openModal(item)}
      onImageError={(id) => id && handleImageError(id)}
    />
  );

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <Image
          source={require('../../assets/splash.gif')} // Display a loading animation
          style={styles.loadingImage}
          resizeMode="contain"
        />
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
          keyExtractor={(item) => item.id} // Ensure a unique key
          extraData={events} // Ensure FlatList re-renders on events change
        />
      )
      }

      <EventModal
        visible={modalVisible} // Pass visibility state to the modal
        event={selectedEvent} // Pass selected event details
        onClose={closeModal} // Pass close function
        onGetDirections={(location: string) => handleGetDirections(location)} // Pass function to handle directions
      />
    </ThemedView>
  );
};

// Styles for the list and container
const getStyles = (colorScheme: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  loadingImage: {
    width: "100%", // Adjust as needed
    height: "100%", // Adjust as needed
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;
