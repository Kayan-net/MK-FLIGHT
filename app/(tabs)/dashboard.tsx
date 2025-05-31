import { IconSymbol } from '@/components/ui/IconSymbol';
import UpcomingTripCard from '@/components/UpcomingTripCard';
import { Trip } from '@/types/Trip';
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

export default function DashboardScreen() {
  const router = useRouter();

  const mockUpcomingTrips: Trip[] = [
    {
      id: '1',
      origin: 'Durban',
      destination: 'Cape Town',
      departureDate: '2024-11-15',
      returnDate: '2024-11-20',
      airline: 'South African Airways',
      flightNumber: 'SA231',
      bookingReference: 'ABC123',
    },
    {
      id: '2',
      origin: 'Johannesburg',
      destination: 'Dubai',
      departureDate: '2024-12-10',
      returnDate: '2024-12-18',
      airline: 'Emirates',
      flightNumber: 'EK762',
      bookingReference: 'DEF456',
    },
    {
      id: '3',
      origin: 'Cape Town',
      destination: 'Durban',
      departureDate: '2025-01-05',
      airline: 'FlySafair',
      flightNumber: 'FA101',
      bookingReference: 'GHI789',
    },
  ];

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

        {/* Upcoming Trips / Recent Bookings Section */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Upcoming Trips</ThemedText>
          {mockUpcomingTrips.length > 0 ? (
            mockUpcomingTrips.map((trip) => (
              <UpcomingTripCard key={trip.id} trip={trip} />
            ))
          ) : (
            <ThemedText>No upcoming trips found.</ThemedText>
          )}
        </ThemedView>

        {/* Personalized Recommendations Section */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Recommendations</ThemedText>
          <ThemedText>Personalized travel recommendations will appear here.</ThemedText>
          {/* Placeholder for Recommendations List */}
        </ThemedView>

        {/* Saved Items Section */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Saved Items</ThemedText>
          <ThemedText>Your saved flights, hotels, etc., will appear here.</ThemedText>
          {/* Placeholder for Saved Items List */}
        </ThemedView>

        {/* Quick Links / Widgets Section */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <ThemedText>Quick links or widgets for common actions will be here.</ThemedText>
          {/* Placeholder for Quick Links/Widgets */}
        </ThemedView>

        {/* Notifications / Alerts Section (Optional, could be a separate component) */}
        {/* <ThemedView style={styles.sectionContainer}> */}
        {/*   <ThemedText style={styles.sectionTitle}>Notifications</ThemedText> */}
        {/*   <ThemedText>Your notifications will appear here.</ThemedText> */}
        {/* </ThemedView> */}

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 20,
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
    width: '48%',
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
  serviceDescription: {
    fontSize: 14,
    color: '#666',
  },
  sectionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0', // Example background color
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
}); 