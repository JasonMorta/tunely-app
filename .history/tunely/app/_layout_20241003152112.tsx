import { View, Image } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '../hooks/useColorScheme';
import { useFonts } from 'expo-font';

// Ensure the splash screen remains visible while fonts are loading
SplashScreen.preventAutoHideAsync();

export default function _layout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      // Delay for the GIF to be shown
      const timer = setTimeout(() => {
        SplashScreen.hideAsync();
        setAppIsReady(true); // Show the app after the GIF is done
      }, 3000); // Adjust time for your GIF animation length

      return () => clearTimeout(timer); // Clear timeout if unmounted
    }
  }, [loaded]);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('../assets/splash.gif')} // Your GIF path
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}
