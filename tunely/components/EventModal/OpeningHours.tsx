import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { VenueOpeningHours } from '../../types/EventTypes';

interface OpeningHoursProps {
  dates: VenueOpeningHours;
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ dates }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  const calculateTimeLeft = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = new Date();
    const todayHours = dates[today];

    if (todayHours) {
      const [openTimeStr, closeTimeStr] = todayHours.split(/\s*[-–—]\s*/);

      if (openTimeStr && closeTimeStr) {
        const [openHours, openMinutes] = openTimeStr.split(':').map(Number);
        const openTime = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          openHours,
          openMinutes || 0
        );

        const [closeHours, closeMinutes] = closeTimeStr.split(':').map(Number);
        const closeTime = new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          closeHours,
          closeMinutes || 0
        );

        if (closeTime <= openTime) {
          closeTime.setDate(closeTime.getDate() + 1);
        }

        if (currentTime >= openTime && currentTime < closeTime) {
          setIsOpen(true);
          const diffMs = closeTime.getTime() - currentTime.getTime();
          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${diffHrs}h ${diffMins}m`);
        } else {
          setIsOpen(false);
          setTimeLeft('');
        }
      } else {
        console.warn(`Invalid format for today's hours: "${todayHours}"`);
      }
    }
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [dates]);

  const weekDaysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const orderedDays = weekDaysOrder.filter(day => dates[day]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.heading, { color: isOpen ? 'green' : 'red' }]}>
        {isOpen ? 'Open now' : 'Closed now'}
      </ThemedText>

      <ThemedText style={styles.closingTime}>
        {isOpen ? `Closes in ${timeLeft}` : ''}
      </ThemedText>
      
      <ThemedView style={styles.hoursList}>
        {orderedDays.map(day => (
          <ThemedView key={day} style={styles.dayRow}>
            <ThemedText style={styles.dayText}>{capitalizeFirstLetter(day)}</ThemedText>
            <ThemedText style={styles.hoursText}>{dates[day]}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
    width: '100%',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 0,
  },
  hoursList: {
    width: '100%',
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    width: '100%',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  hoursText: {},
  closingTime: {
    fontSize: 14,
  },
});

export default OpeningHours;
