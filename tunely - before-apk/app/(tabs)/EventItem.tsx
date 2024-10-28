// src/screens/Events/EventItem.tsx

import React, { useState } from 'react';
import { Pressable, Image, View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { useColorScheme } from '../../hooks/useColorScheme';
import placeholderImage from '../../assets/images/thumb.gif'; // Ensure this path is correct
import { primaryColor, tintColorDark, tintColorLight } from '../../constants/Colors';
import { EventData } from '../../types/EventTypes'; // Import the updated EventData interface
import { ThemedView } from '../../components/ThemedView';

interface EventItemProps {
  event: EventData;
  onPress: () => void;
  onImageError: (id?: string) => void; // Made 'id' optional
}

const EventItem: React.FC<EventItemProps> = ({ event, onPress, onImageError }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageErrorState, setImageErrorState] = useState(false); // Renamed to avoid conflict with callback
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  // Safely access nested properties with fallback values
  const performerName = event.PERFORMER?.name || "Unknown Performer";
  // const performerEmail = typeof event.PERFORMER?.email === 'string'
  //   ? event.PERFORMER.email
  //   : Array.isArray(event.PERFORMER?.email) && (event.PERFORMER.email as Array<any>).length > 0
  //     ? event.PERFORMER.email[0]
  //     : "No Email";

  const date = event.eventDate?.startDay && event.eventDate?.startTime
    ? `${event.eventDate.startDay} `
    : (event.date?.startDay && event.date?.startTime
      ? `${event.date.startDay} ${event.date.startTime}`
      : "No Date");

  const venueName = event.VENUE?.name || event.venue || "No Venue";
  const venueAddress = event.VENUE?.address  || "No Address";
  const description = event.description || "No Description";

  // Determine the image URI, prioritizing performerImage over event.image
  const imageUri = event.PERFORMER?.performerImage || undefined;

  const handleLoad = () => {
    setImageLoading(false);
  };

  const handleError = () => {
    setImageErrorState(true);
    onImageError(event.id); // Pass 'id' if available
    setImageLoading(false);
  };

  return (
    <Pressable style={styles.eventItem} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={placeholderImage}
          style={styles.eventImage}
          resizeMode="cover"
        />
        {!imageErrorState && imageUri && imageUri.trim() !== '' && (
          <Image
            source={{ uri: imageUri }}
            style={[styles.eventImage, imageLoading ? styles.imageLoading : styles.imageLoaded]}
            resizeMode="cover"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
        {imageLoading && (
          <ActivityIndicator style={styles.activityIndicator} size="small" color={primaryColor} />
        )}
      </View>
      <View style={styles.eventDetails}>
        <ThemedText style={styles.eventTitle}>{performerName}</ThemedText>
        <ThemedText style={styles.eventVenueName}>{`${venueName} `}</ThemedText>
        <ThemedText style={styles.eventSubtitle}>{`Date: ${date} `} </ThemedText>
        <ThemedText style={styles.eventTime}>{`Time: ${event.eventDate?.startTime} `}</ThemedText>
        
      {/*   <ThemedText style={styles.eventDescription} numberOfLines={2}>
          {description}
        </ThemedText> */}
      </View>
    </Pressable>
  );
};

const getStyles = (colorScheme: any) => StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colorScheme === 'dark' ? tintColorLight : tintColorDark,
    paddingVertical: 10,
    borderRadius: 0,
    alignItems: 'center',
    backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff', // Adjust based on theme
  },
  imageContainer: {
    position: 'relative',
    width: 80,
    height: 80, // Increased height for better image visibility
    borderRadius: 8,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
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
  eventDetails: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colorScheme === 'dark' ? '#ffffff' : '#000000',
  },
  eventVenueName:{
    fontSize: 14,
    fontWeight: 'bold',
    color: colorScheme === 'dark' ? '#bbbbbb' : '#555555',
    marginTop: 2,
  },
  eventSubtitle: {
    fontSize: 14,
    color: colorScheme === 'dark' ? '#bbbbbb' : '#555555',
    marginTop: 2,
  },
  eventTime:{
    fontSize: 14,
    color: colorScheme === 'dark' ? '#bbbbbb' : '#555555',
    marginTop: 2,
  },
  eventVenue: {
    fontSize: 14,
    color: colorScheme === 'dark' ? '#bbbbbb' : '#555555',
    marginTop: 2,
  },
  eventDescription: {
    fontSize: 12,
    color: colorScheme === 'dark' ? '#dddddd' : '#777777',
    marginTop: 4,
  },
});

export default EventItem;
