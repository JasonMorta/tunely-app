import { View, Text } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '../hooks/useColorScheme';
import { useFonts } from 'expo-font';


// Define the root layout stack and screens
// The layout can also be defined here.

//! The layout is the root component that will be rendered

// The tabs layout is defined in the (tabs)/_layout.tsx file
export default function _layout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen 
        name='(tabs)' 
        options={{
          headerShown: false
        }}
        />
    </Stack>
    </ThemeProvider>
  )
}