import { Tabs } from 'expo-router';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors, primaryColor } from '../../constants/Colors';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
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
          headerTitle: 'Events',
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
             
            </View>
          ),
          title: 'Events',
          headerStyle: { 
            backgroundColor: primaryColor, // Keep the background color of the header
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
          headerStyle: { backgroundColor: primaryColor },
          headerTintColor: 'white',
        }}
      />
      
      {/* Profile Screen */}
      <Tabs.Screen 
        name="profile"
        options={{
          headerTitle: 'Profile',
          title: 'Profile',
          headerStyle: { backgroundColor: primaryColor },
          headerTintColor: 'white',
        }}
      />

    <Tabs.Screen 
        name="events/[id]"
        
        options={{
          tabBarButton: () => null, // Hide this tab from the tab bar
          headerTitle: 'id',
          title: 'id',
          headerStyle: { backgroundColor: primaryColor },
          headerTintColor: 'white',
        }}
      />
    </Tabs>
  );
}
