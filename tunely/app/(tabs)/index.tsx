import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'

export default function index() {
  return (
    <View>
      <Text>Home Page</Text>

      {/* 
        To navigate make use of the Link component from expo-router 
        This is also useful for navigating to a page with dynamic routes
      */}
 
        <Link href="/events/1" >Got to Events Page using a Link ref</Link>



      {/* 
      Using the Router component from expo-router to navigate to a page
      */}
      <Pressable onPress={() => router.push('/events/2')}>
        <Text>Go to Events Page using Router</Text>
      </Pressable>

      
    </View>
  )
}