import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

type Service = {
  title: string;
  icon: 'airplane' | 'bed.double.fill' | 'car.fill' | 'beach.umbrella.fill' | 'shield.fill' | 'creditcard.fill' | 'globe.americas.fill';
  route: '/(tabs)/flights' | '/(tabs)/hotels' | '/(tabs)/cars' | '/(tabs)/holidays' | '/(tabs)/insurance' | '/(tabs)/visa';
  description: string;
};

export default function HomeScreen() {
  const router = useRouter();

  const services: Service[] = [
    {
      title: 'Flights',
      icon: 'airplane',
      route: '/(tabs)/flights',
      description: 'Search and book flights worldwide'
    },
    {
      title: 'Hotels',
      icon: 'bed.double.fill',
      route: '/(tabs)/hotels',
      description: 'Find the perfect place to stay'
    },
    {
      title: 'Cars',
      icon: 'car.fill',
      route: '/(tabs)/cars',
      description: 'Rent a car for your journey'
    },
    {
      title: 'Holidays',
      icon: 'beach.umbrella.fill',
      route: '/(tabs)/holidays',
      description: 'Discover amazing holiday packages'
    },
    {
      title: 'Insurance',
      icon: 'shield.fill',
      route: '/(tabs)/insurance',
      description: 'Protect your travel plans'
    },
    {
      title: 'Visa',
      icon: 'globe.americas.fill',
      route: '/(tabs)/visa',
      description: 'Apply for travel visas'
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.welcome}>Welcome to MK Flight</ThemedText>
        <ThemedText style={styles.subtitle}>Your one-stop travel solution</ThemedText>

        <ThemedView style={styles.servicesContainer}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.title}
              style={styles.serviceCard}
              onPress={() => router.push(service.route)}
            >
              <View style={styles.iconTextContainer}>
                <IconSymbol
                  name={service.icon}
                  size={32}
                  color="#fff"
                  style={styles.serviceIcon}
                />
                <ThemedText style={styles.serviceTitle}>{service.title}</ThemedText>
              </View>
              <ThemedText style={styles.serviceCount}>0</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 20, // Add padding at the bottom if needed
  },
  container: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'blue',
  },
  subtitle: {
    fontSize: 26,
    marginBottom: 32,
    textAlign: 'center',
    color: 'yellow',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  serviceCard: {
    backgroundColor: '#0a7ea4',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '48%', // Adjust width to fit two cards per row
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIcon: {
    marginRight: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  serviceCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  serviceDescription: { // Keeping the description style but not using it for now
    fontSize: 14,
    color: '#666',
  },
}); 