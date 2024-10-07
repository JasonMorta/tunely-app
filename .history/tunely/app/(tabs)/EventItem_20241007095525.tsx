
// EventItem.tsx
import React, { useState } from 'react';
import { Pressable, Image, View, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { useColorScheme } from '../../hooks/useColorScheme';
import placeholderImage from '../../assets/images/thumb.gif'; // Ensure this path is correct
import { primaryColor, tintColorDark, tintColorLight } from '../../constants/Colors';

interface EventItemProps {
  event: any;
  onPress: () => void;
  onImageError: (id: string) => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onPress, onImageError }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

  const handleLoad = () => {
    setImageLoading(false);
  };

  const handleError = () => {
    setImageError(true);
    onImageError(event.id);
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
        {!imageError && event.image && event.image.trim() !== '' && (
          <Image
            source={{ uri: event.image }}
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
        <ThemedText style={styles.eventTitle}>{event.artist_name}</ThemedText>
        <ThemedText>Day: {event.day}</ThemedText> 
         <ThemedText>Time: {event.date.time}</ThemedText>
        <ThemedText>Venue: {event.venue}</ThemedText>
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
  },
  imageContainer: {
    position: 'relative',
    width: 80,
    height: 50,
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
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventItem;
