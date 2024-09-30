import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import events from '../../eventsData'; // Import events data

export default function EventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((item: any) => item.id === id); // Find event by ID

  if (!event) return <Text>Event not found</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.context}>{event.context}</Text>
      <Text>When: {event.date} {event.time}</Text>
      <Text>Where: {event.organizer}</Text>
      <Text>Location: Latitude {event.location.latitude}, Longitude {event.location.longitude}</Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Directions</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#f06292',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
