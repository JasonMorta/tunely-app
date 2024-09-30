import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons
import { Image } from 'react-native'; // Import Image from React Native

export default function TabsLayout() {
  return (
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
          header: () => (
            <Image
              source={require('../../assets/images/tunely-logo.png')} // Use require for local assets
              style={{ width: 100, height: 50, alignSelf: 'center', marginTop: 10 }}
            />
          ),
          title: 'Home',
          headerStyle: { backgroundColor: '#E37383' },
          headerTintColor: 'white',
        }}
      />
      
      {/* Daily Events Screen */}
      <Tabs.Screen 
        name="daily"
        options={{
          header: () => (
            <Image
              source={require('../../assets/images/tunely-logo.png')} // Use require for local assets
              style={{ width: 100, height: 50, alignSelf: 'center', marginTop: 10 }}
            />
          ),
          title: 'Daily',
          headerStyle: { backgroundColor: '#E37383' },
          headerTintColor: 'white',
        }}
      />
      
      {/* Profile Screen */}
      <Tabs.Screen 
        name="profile"
        options={{
          header: () => (
            <Image
              source={require('../../assets/images/tunely-logo.png')} // Use require for local assets
              style={{ width: 100, height: 50, alignSelf: 'center', marginTop: 10 }}
            />
          ),
          title: 'Profile',
          headerStyle: { backgroundColor: '#E37383' },
          headerTintColor: 'white',
        }}
      />
    </Tabs>
  );
}
