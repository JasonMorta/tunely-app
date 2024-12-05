import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ThemedText } from '../ThemedText';
import { EventData } from '../../types/EventTypes';
import { ThemedView } from '../ThemedView';

interface EventSectionProps {
  eventDetails: EventData;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const EventSection: React.FC<EventSectionProps> = ({ eventDetails }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (eventDetails.eventDate) {
        const eventDate = new Date(`${eventDetails.eventDate.startDay}T${eventDetails.eventDate.startTime}`);
        const now = new Date();
        const timeDiff = eventDate.getTime() - now.getTime();

        if (timeDiff <= 0) {
          setTimeRemaining('Event Ended');
        } else {
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeRemaining(`${hours}h: ${minutes}m`);
        }

        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
        setFormattedDate(eventDate.toLocaleDateString(undefined, options));
      }
    };

    calculateTimeRemaining();
    const intervalId = setInterval(calculateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [eventDetails.eventDate]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.eventDate}>
        {formattedDate}
      </ThemedText>
      <ThemedText style={styles.startingTime}>
      {timeRemaining !== 'Event Ended' ? `Starts in: ${timeRemaining}` : timeRemaining}
      </ThemedText>
      <ThemedText style={styles.description}>
        {eventDetails?.description}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#fff',
    // paddingBottom: 15, // Added padding for better spacing
    // backgroundColor: 'aliceblue',
  },
  eventDate: {
    padding: 0,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    padding: 10,
    textAlign: 'center',
  },
  startingTime: {
    padding: 0,
    textAlign: 'center',
  },
  dayCounter: {
  }
});

export default EventSection;
