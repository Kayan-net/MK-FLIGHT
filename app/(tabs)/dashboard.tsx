import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function DashboardScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Dashboard</ThemedText>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Recent Bookings</ThemedText>
          <ThemedText style={styles.cardText}>No recent bookings found</ThemedText>
        </ThemedView>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Upcoming Trips</ThemedText>
          <ThemedText style={styles.cardText}>No upcoming trips</ThemedText>
        </ThemedView>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Saved Destinations</ThemedText>
          <ThemedText style={styles.cardText}>No saved destinations</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#0a7ea4',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
}); 