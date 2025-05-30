import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0a7ea4',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#0a7ea4',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="flights"
        options={{
          title: 'Flights',
          tabBarIcon: ({ color }) => <IconSymbol name="airplane" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="hotels"
        options={{
          title: 'Hotels',
          tabBarIcon: ({ color }) => <IconSymbol name="bed.double.fill" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cars"
        options={{
          title: 'Cars',
          tabBarIcon: ({ color }) => <IconSymbol name="car.fill" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="holidays"
        options={{
          title: 'Holidays',
          tabBarIcon: ({ color }) => <IconSymbol name="beach.umbrella.fill" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insurance"
        options={{
          title: 'Insurance',
          tabBarIcon: ({ color }) => <IconSymbol name="shield.fill" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="visa"
        options={{
          title: 'Visa',
          tabBarIcon: ({ color }) => <IconSymbol name="globe.americas.fill" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <IconSymbol name="chart.bar.fill" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
