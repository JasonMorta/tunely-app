import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { VenueOpeningHours } from '../../types/EventTypes';

interface OpeningHoursProps {
  dates: VenueOpeningHours;
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ dates }) => {
  
  // Get the current day and time
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = new Date();

  // Get today's opening hours
  const todayHours = dates[today];

  // Determine if the venue is currently open
  let isOpen = false;
  if (todayHours) {
    // Use a regular expression to split on any hyphen-like character with optional spaces
    const [openTimeStr, closeTimeStr] = todayHours.split(/\s*[-–—]\s*/);

    if (openTimeStr && closeTimeStr) {

      // Parse opening time
      const [openHours, openMinutes] = openTimeStr.split(':').map(Number);
      const openTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        openHours,
        openMinutes || 0
      );

      // Parse closing time
      const [closeHours, closeMinutes] = closeTimeStr.split(':').map(Number);
      const closeTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        closeHours,
        closeMinutes || 0
      );

      // Adjust close time to the next day if it is past midnight
      if (closeTime <= openTime) {
        closeTime.setDate(closeTime.getDate() + 1);
      }

      // Check if current time is within the opening hours
      if (currentTime >= openTime && currentTime < closeTime) {
        isOpen = true;
      }
    } else {
      console.warn(`Invalid format for today's hours: "${todayHours}"`);
    }
  }

  // Move the current day to the top of the list
  const orderedDays = Object.keys(dates).sort((a, b) => (a === today ? -1 : b === today ? 1 : 0));

  return (
    <ThemedView style={styles.container}>
      {/* Display "Open now" if isOpen is true, otherwise "Closed now" */}
      <ThemedText style={[styles.heading, { color: isOpen ? 'green' : 'red' }]}>
        {isOpen ? 'Open now' : 'Closed now'}
      </ThemedText>
      
      {/* Display the list of opening hours with today at the top */}
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

// Helper function to capitalize the first letter of the day
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
    width: '60%',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 0,
  },
  hoursList: {
    marginTop: 8,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  hoursText: {
    fontSize: 14,
  },
});

export default OpeningHours;
