// src/screens/events/Index.tsx
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
import { Colors } from '../../constants/Colors';
import placeholderImage from '../../assets/images/thumb.gif'; // Import a placeholder image
import EventItem from './EventItem';
import { EventData } from '../../types/EventTypes';

// Mapping of day names to numbers (0 = Sunday, 6 = Saturday)
const DAY_NAME_TO_NUMBER: { [key: string]: number } = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

// Helper function to calculate the next occurrence of a day
const getNextOccurrence = (dayName: string, time: string): Date => {
  const today = new Date();
  const targetDay = DAY_NAME_TO_NUMBER[dayName];
  if (targetDay === undefined) {
    // Default to today if dayName is invalid
    return new Date();
  }

  const currentDay = today.getDay();
  let daysUntilTarget = targetDay - currentDay;

  if (daysUntilTarget < 0) {
    daysUntilTarget += 7;
  }

  // Create a new date for the target day
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysUntilTarget);

  // Parse the time string (assuming "HH:mm" format)
  const [hours, minutes] = time.split(':').map(Number);
  nextDate.setHours(hours, minutes, 0, 0);

  // If the target day is today, check if the event time has already passed
  if (daysUntilTarget === 0 && nextDate < today) {
    nextDate.setDate(nextDate.getDate() + 7); // Schedule for next week
  }

  return nextDate;
};

const Index: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [events, setEvents] = useState<EventData[]>([]); // Strongly typed state
  const [loading, setLoading] = useState(true);
  const [imageErrorIds, setImageErrorIds] = useState<string[]>([]); // State to track image loading errors
  const colorScheme = useColorScheme();

  const styles = getStyles(colorScheme);

  // Fetch events from Firebase Realtime Database with real-time updates
  useEffect(() => {
    const dbRef = ref(database, 'events'); // Path in Firebase where your events are stored

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
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

          // **Sort events by next occurrence based on startDay and startTime**
          const sortedEvents = fetchedEvents
            .filter(event => event.eventDate?.startDay && event.eventDate?.startTime) // Ensure both startDay and startTime exist
            .map(event => ({
              ...event,
              nextOccurrence: getNextOccurrence(event.eventDate!.startDay!, event.eventDate!.startTime!),
            }))
            .sort((a, b) => {
              return a.nextOccurrence.getTime() - b.nextOccurrence.getTime();
            });

            //console.log('sortedEvents', sortedEvents)
          setEvents(sortedEvents); // Update the state with sorted events
          
        } else {
          // No events data available
          setEvents([]); // Clear events if none are available
        }

        // Use InteractionManager to wait until interactions are done
        InteractionManager.runAfterInteractions(() => {
          setLoading(false); // Stop loading after interactions
        });
      },
      (error) => {
        console.error("Error fetching data from Firebase: ", error);
        Alert.alert("Error", "Failed to load events. Please try again later.");
        setLoading(false); // Stop loading on error
      }
    );

    // Cleanup listener on unmount
    return () => {
      off(dbRef, 'value', unsubscribe);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to open modal and set the selected event
  const openModal = (event: EventData) => {
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
    const googleMapsUrl = `comgooglemaps://?q=${encodeURIComponent(location)}`;
    const appleMapsUrl = `maps:0,0?q=${encodeURIComponent(location)}`;
    const browserGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

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
        <ThemedText style={styles.noEventsText}>No events found.</ThemedText> // Display message if no events are found
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id!} // Ensure a unique key
          extraData={events} // Ensure FlatList re-renders on events change
        />
      )}

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
    backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
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
  noEventsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
  },
});

export default Index;
