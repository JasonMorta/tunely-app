import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import events from '../../eventsData'; // Import events data
import { ThemedView } from '../../../components/ThemedView';
import { ThemedText } from '../../../components/ThemedText';
import { useColorScheme } from '../../../hooks/useColorScheme';
import { Colors } from '../../../constants/Colors';

export default function EventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const event = events.find((item: any) => item.id === id); // Find event by ID

  const styles = getStyles(colorScheme);

  if (!event) return <ThemedText>Event not found</ThemedText>;

  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      <ThemedText style={styles.title}>{event.title}</ThemedText>
      <ThemedText style={styles.context}>{event.context}</ThemedText>
      <ThemedText>When: {event.date} {event.time}</ThemedText>
      <ThemedText>Where: {event.organizer}</ThemedText>
      <ThemedText>Location: Latitude {event.location.latitude}, Longitude {event.location.longitude}</ThemedText>

      <Pressable style={styles.button}>
        <ThemedText style={styles.buttonText}>Directions</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const getStyles = (colorScheme: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  context: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: colorScheme === 'dark' ? Colors.light.icon : Colors.dark.icon,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
