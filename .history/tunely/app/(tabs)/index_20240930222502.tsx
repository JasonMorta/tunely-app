import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import events from '../eventsData'; // Import events data

const renderItem = ({ item: any }) => (
  <Pressable style={styles.eventItem} onPress={() => router.push(`/events/${item.id}`)}>
    <Image source={{ uri: item.image }} style={styles.eventImage} />
    <View style={styles.eventDetails}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text>{item.date} - {item.time}</Text>
      <Text>Price: {item.price}</Text>
    </View>
  </Pressable>
);

export default function Index() {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
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
