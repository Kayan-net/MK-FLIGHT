import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BookingConfirmation } from '../../components/flight/BookingConfirmation';
import { ThemedView } from '../../components/ThemedView';

// Mock flight data for demonstration
const mockFlight = {
  airline: 'Delta Airlines',
  flightNumber: 'DL123',
  departure: {
    city: 'New York',
    time: '10:00 AM',
    date: '2024-03-20',
    airport: 'JFK',
  },
  arrival: {
    city: 'London',
    time: '10:00 PM',
    date: '2024-03-20',
    airport: 'LHR',
  },
};

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const bookingId = params.bookingId as string;
  const totalAmount = parseFloat(params.totalAmount as string);

  const handleDone = () => {
    // Navigate back to home screen
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <BookingConfirmation
        bookingDetails={{
          bookingId,
          flight: mockFlight,
          passengers: [
            {
              firstName: 'John',
              lastName: 'Doe',
            },
          ],
          totalAmount,
        }}
        onDone={handleDone}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 