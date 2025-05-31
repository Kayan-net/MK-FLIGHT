import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Trip } from '@/types/Trip';
import React from 'react';
import { StyleSheet } from 'react-native';

interface UpcomingTripCardProps {
  trip: Trip;
}

export default function UpcomingTripCard({ trip }: UpcomingTripCardProps) {
  return (
    <ThemedView style={styles.cardContainer}>
      <ThemedText style={styles.destinationText}>
        {trip.origin} to {trip.destination}
      </ThemedText>
      <ThemedText style={styles.dateText}>Departure: {trip.departureDate}</ThemedText>
      {trip.returnDate && (
        <ThemedText style={styles.dateText}>Return: {trip.returnDate}</ThemedText>
      )}
      <ThemedText style={styles.detailText}>
        {trip.airline} - {trip.flightNumber}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff', // White background for the card
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  destinationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  detailText: {
    fontSize: 14,
    color: '#777',
  },
}); 