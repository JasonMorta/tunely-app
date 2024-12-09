// src/screens/Events/EventItem.tsx

import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { useColorScheme } from '../../hooks/useColorScheme';
import placeholderImage from '../../assets/images/thumb.gif'; // Placeholder image for when no image is available
import { primaryColor, tintColorDark, tintColorLight } from '../../constants/Colors';
import { EventData } from '../../types/EventTypes'; // Event data type interface
import { ThemedView } from '../../components/ThemedView';
import * as Location from 'expo-location'; // Import Expo Location module for location services

interface EventItemProps {
  event: EventData; // Event data object
  onPress: () => void; // Function to handle press events
  onImageError: (id?: string) => void; // Function to handle image loading errors
}

const EventItem: React.FC<EventItemProps> = ({ event, onPress, onImageError }) => {
  // State to manage loading state of the image
  const [imageLoading, setImageLoading] = useState(true);
  // State to track if there was an error loading the image
  const [imageErrorState, setImageErrorState] = useState(false);
  // State to store the formatted time remaining until the event starts
  const [timeUntilEvent, setTimeUntilEvent] = useState('');
  // State to store the user's current location
  const [, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
  // State to store the calculated distance to the venue
  const [venueDistance, setVenueDistance] = useState('Calculating...');
  // Determine the current color scheme (light or dark mode)
  const colorScheme = useColorScheme();
  // Get the styles based on the current color scheme
  const styles = getStyles(colorScheme);

  // Safely access the performer's name, with a fallback
  const performerN = event.PERFORMER?.name || "Unknown Performer";
  // Format the performer's name to have each word capitalized
  const performerName = performerN.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  // Construct the event date string if available
  // const date = event.eventDate?.startDay && event.eventDate?.startTime
  //   ? `${event.eventDate.startDay} `
  //   : (event.eventDate?.startDay && event.eventDate?.startTime
  //     ? `${event.eventDate.startDay} ${event.eventDate.startTime}`
  //     : "No Date");

  // Safely access the venue's name, with a fallback
  const venueName = event.VENUE?.name || "Not Specified";

  // Safely access the event cost, with a fallback
  const eventCost = event.pricing?.price || "Free";
  // Safely access the venue's address, with a fallback
  // const venueAddress = event.VENUE?.address || "No Address";
  // Safely access the event description, with a fallback
  const description = event.description || "No Description";

  // Determine the image URI from the second image in the performer image array
  const imageUrl = Array.isArray(event.PERFORMER?.image) && event.PERFORMER.image.length > 0
    ? event.PERFORMER.image[0]
    : undefined; // Fallback to undefined if not available


  // useEffect hook to calculate and update the time until the event starts
  useEffect(() => {
    const updateTimeUntilEvent = () => {
      // Get the event's start date and time strings
      const eventStartDateStr = event.eventDate?.startDay;
      const eventStartTimeStr = event.eventDate?.startTime;

      if (eventStartDateStr && eventStartTimeStr) {
        // Combine date and time into a single string in ISO format
        const eventStartDateTimeStr = `${eventStartDateStr}T${eventStartTimeStr}:00`;
        // Create a Date object for the event start time
        const eventStartDateTime = new Date(eventStartDateTimeStr);
        // Get the current date and time
        const now = new Date();
        // Calculate the difference in milliseconds
        const timeDiffMs = eventStartDateTime.getTime() - now.getTime();

        if (timeDiffMs > 0) {
          // Convert milliseconds to total seconds
          const timeDiffSec = Math.floor(timeDiffMs / 1000);
          // Calculate days, hours, and minutes remaining
          const days = Math.floor(timeDiffSec / (3600 * 24));
          const hours = Math.floor((timeDiffSec % (3600 * 24)) / 3600);
          const minutes = Math.floor((timeDiffSec % 3600) / 60);

          // Build the time remaining string
          let timeString = '';
          if (days > 0) {
            timeString = `${days}d ${hours}h ${minutes}m`;
          } else if (hours > 0) {
            timeString = `${hours}h ${minutes}m`;
          } else if (minutes > 0) {
            timeString = `${minutes}m`;
          } else {
            timeString = 'Started';
          }

          // Update the state with the time remaining
          setTimeUntilEvent(`Starts in ${timeString}`);
        } else {
          // Event has already ended
          setTimeUntilEvent('Event Ended');
        }
      } else {
        // Start date or time not available
        setTimeUntilEvent('No Time');
      }
    };

    // Update the time immediately and set up an interval to update every minute
    updateTimeUntilEvent();
    const interval = setInterval(updateTimeUntilEvent, 60000);

    // Clean up the interval on component unmount or when dependencies change
    return () => clearInterval(interval);
  }, [event.eventDate]);

  // useEffect hook to get the user's current location and calculate distance to the venue
  useEffect(() => {
    const getUserLocationAndCalculateDistance = async () => {
      try {
        // Request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setVenueDistance('Permission Denied');
          return;
        }

        // Get the user's current location
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);

        // Check if venue location is available
        if (event.VENUE?.geometry?.lat && event.VENUE?.geometry?.lon) {
          // Calculate the distance between user's location and venue
          const distance = calculateDistance(
            location.coords.latitude,
            location.coords.longitude,
            parseFloat(event.VENUE.geometry.lat),
            parseFloat(event.VENUE.geometry.lon)
          );
          // Update the venueDistance state with formatted distance
          setVenueDistance(`${distance.toFixed(1)}km away`);
        } else {
          // Venue location not available
          setVenueDistance('Location not available');
        }
      } catch (error) {
        // Handle errors (e.g., location services disabled)
        setVenueDistance('Error getting location');
      }
    };

    // Call the function to get location and calculate distance
    getUserLocationAndCalculateDistance();
  }, [event.VENUE?.geometry]);

  // Function to calculate the distance between two coordinates using the Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371; // Earth's radius in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    return distance;
  };

  // Handler for successful image load
  const handleLoad = () => {
    setImageLoading(false);
  };

  // Handler for image loading error
  const handleError = () => {
    setImageErrorState(true);
    onImageError(event.id); // Notify parent component of the error, passing event ID if available
    setImageLoading(false);
  };

  return (
    // TouchableOpacity component to handle user interaction
    <TouchableOpacity style={styles.eventItem} onPress={onPress}>
      {/* Container for the event image */}
      <ThemedView style={styles.imageContainer}>
        {/* Placeholder image displayed initially */}
        <Image
          source={require('../../assets/images/thumb.gif')}
          style={styles.eventImage}
          resizeMode="cover"
        />
        {/* Conditional rendering of the event image if no error and image URI is available */}
        {!imageErrorState && imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={[styles.eventImage, imageLoading ? styles.imageLoading : styles.imageLoaded]}
            resizeMode="cover"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}

        {/* Activity indicator displayed while the image is loading */}
        {imageLoading && (
          <ActivityIndicator style={styles.activityIndicator} size="small" color={primaryColor} />
        )}
      </ThemedView>
      {/* Container for the event details */}
      <ThemedView style={styles.eventDetails}>
        {/* Event title (performer's name) */}
        <ThemedText style={styles.eventTitle}>{performerName}</ThemedText>
        {/* Venue name */}
        <ThemedText style={styles.eventVenueName}>{`${venueName} `}</ThemedText>
        {/* Event cost */}
        <ThemedText style={styles.eventPrice}>{`Cost: ${eventCost} `}</ThemedText>

        {/* Event description, limited to two lines */}
        <ThemedText
          style={styles.eventDescription}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {description}
        </ThemedText>

        {/* Container for time until event and venue distance */}
        <ThemedView style={styles.timeData}>
          {/* Display time remaining until event starts */}
          <ThemedText style={styles.eventSubtitle}>{timeUntilEvent}</ThemedText>
          {/* Display distance to the venue */}
          <ThemedText style={styles.venueCurrentDistance}>{venueDistance}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

// Function to create styles based on the color scheme
const getStyles = (colorScheme: any) => StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: colorScheme === 'dark' ? tintColorLight : tintColorDark,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 0,
    alignItems: 'flex-start',
    position: 'relative',
    // backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff', // Adjust based on theme
  },
  imageContainer: {
    position: 'relative',
    width: 150,
    height: 150, // Increased height for better image visibility
    borderRadius: 8,
    overflow: 'hidden',
  },
  eventDetails: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'flex-start',
    height: 150,
  },
  eventImage: {
    width: 150,
    height: '100%',
    borderRadius: 8,
  },
  imageLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.5,
  },
  imageLoaded: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 1,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -10, // Half of the ActivityIndicator size
    marginTop: -10,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    // color: colorScheme === 'dark' ? '#ffffff' : '#000000',
  },
  eventVenueName: {
    fontSize: 14,
    fontWeight: 'bold',
    // color: colorScheme === 'dark' ? '#bbbbbb' : '#555555',
    marginTop: 2,
  },
  eventPrice: {
    fontSize: 14,
    // color: colorScheme === 'dark' ? '#bbbbbb' : '#555555',
    marginTop: 2,
  },
  eventSubtitle: {
    fontSize: 11,
    // color: colorScheme === 'dark' ? '#bbbbbb' : '#555555',
    marginTop: 2,
  },
  venueCurrentDistance: {
    fontSize: 11,
    // color: colorScheme === 'dark' ? '#bbbbbb' : '#555555',
    marginTop: 2,
  },
  timeData: {
    marginTop: 'auto',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventVenue: {
    fontSize: 14,
    color: colorScheme === 'dark' ? '#bbbbbb' : '#555555',
    marginTop: 2,
  },
  eventDescription: {
    fontSize: 13,
    color: colorScheme === 'dark' ? '#dddddd' : '#777777',
    marginTop: 1,
    lineHeight: 15,
  },
});

export default EventItem;
