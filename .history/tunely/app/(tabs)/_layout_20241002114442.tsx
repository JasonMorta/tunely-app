import { Tabs } from 'expo-router';
import { View, Image, useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function TabsLayout() {

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
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          // Define icons based on route name
          if (route.name === 'index') {
            iconName = 'home'; // Icon for Home tab
          } else if (route.name === 'daily') {
            iconName = 'today'; // Icon for Daily tab
          } else if (route.name === 'profile') {
            iconName = 'person'; // Icon for Profile tab
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12, // Customize label size
        },
        tabBarIconStyle: {
          marginBottom: -10, // Move the icon above the label
        },
        tabBarActiveTintColor: '#E37383', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        tabBarStyle: {
          paddingBottom: 10, // Padding for icon and label
        },
      })}
    >
      {/* Home Screen */}
      <Tabs.Screen 
        name="index"
        options={{
          headerTitle: '',
          // display an image in the header
          headerBackground: () => (
            <View style={{ 
              flex: 1, 
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: '#E37383', 
              position: 'relative',
              overflow: 'visible'
            }}>
              <Image
                source={require('../../assets/images/tunely-logo.png')}
                style={{ 
                  width: 90, 
                  height: 50, 
                  top: '55%', 
                  left: '5%', 
                  position: 'absolute', 
                  //transform: [{ translateX: -50 }] 
                }}
              />
            </View>
          ),
          title: 'Home',
          headerStyle: { 
            backgroundColor: '#E37383', // Keep the background color of the header
          },
          headerTintColor: 'white',
        }}
      />
      
      {/* Daily Events Screen */}
      <Tabs.Screen 
        name="daily"
        options={{
          headerTitle: 'Daily Events',
          title: 'Daily',
          headerStyle: { backgroundColor: '#E37383' },
          headerTintColor: 'white',
        }}
      />
      
      {/* Profile Screen */}
      <Tabs.Screen 
        name="profile"
        options={{
          headerTitle: 'Profile',
          title: 'Profile',
          headerStyle: { backgroundColor: '#E37383' },
          headerTintColor: 'white',
        }}
      />
    </Tabs>
    </ThemeProvider>
  );
}
