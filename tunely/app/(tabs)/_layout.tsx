import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'


// Here we define the layout for the tabs.
// Tabs allow you to navigate between different screens or pages.
// Tabs will create a tab bar at the bottom of the screen.
export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index"
        options={{
          headerTitle: 'Home',// The title of the page
          title: 'Home',// The title of the tab button
          headerStyle: {
            backgroundColor: 'hotpink',
          },
          headerTintColor: 'white',
          // tabBarIcon: 'home',
        }}
        />
      <Tabs.Screen 
        name="events/[id]"
        options={{
          headerTitle: 'EVENTS',
          title: 'Events',
          // tabBarIcon: 'home',
        }}
        />
    </Tabs>
  )
}