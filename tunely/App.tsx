import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedView } from './components/ThemedView';
import React from 'react';

export default function App() {
  return (
    <ThemedView style={styles.container}>
      <StatusBar style="auto" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
