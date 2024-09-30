import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index"
        options={{
          headerTitle: 'Home',
          title: 'Home',
          headerStyle: { backgroundColor: '#E37383' },
          headerTintColor: 'white',
        }}
      />
      <Tabs.Screen 
        name="daily"
        options={{
          headerTitle: 'Daily Events',
          title: 'Daily',
          headerStyle: { backgroundColor: '#E37383' },
          headerTintColor: 'white',
        }}
      />
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
  );
}
