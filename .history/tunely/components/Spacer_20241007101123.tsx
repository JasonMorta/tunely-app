import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from './ThemedView'

export default function Spacer() {
  return (
   <ThemedView style={styles.container}>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray'
  }
})