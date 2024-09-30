import { View, Text } from 'react-native'
import React from 'react'
import { Link, useLocalSearchParams } from 'expo-router'

export default function eventPage() {

  // get access to incoming data from the router
  const { id } = useLocalSearchParams<{id:string}>()
  
  return (
    <View>
      <Text>THIS IS THE EVENT PAGE</Text>
      <Text>Event ID: {id}</Text>


      <Link
       style={{
          color: 'blue',
          fontSize: 20
        }}
       href="/" >Go to Home Page</Link>
    </View>
  )
}