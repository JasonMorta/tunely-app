import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


// Define the root layout stack and screens
// The layout can also be defined here.

//! The layout is the root component that will be rendered

// The tabs layout is defined in the (tabs)/_layout.tsx file
export default function _layout() {
  return (
    <Stack>
      <Stack.Screen 
        name='(tabs)' 
        options={{
          headerShown: false
        }}
        />
    </Stack>
    
  )
}