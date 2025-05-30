import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { FlightCard } from './FlightCard';

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    city: string;
    time: string;
    airport: string;
  };
  arrival: {
    city: string;
    time: string;
    airport: string;
  };
  duration: string;
  price: number;
  stops: number;
}

interface FlightListProps {
  flights: Flight[];
  onFlightSelect: (flightId: string) => void;
}

export const FlightList: React.FC<FlightListProps> = ({ flights, onFlightSelect }) => {
  if (flights.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>No flights found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={flights}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FlightCard
          flight={item}
          onSelect={onFlightSelect}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
  },
}); 