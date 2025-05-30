import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BookingForm } from '../../components/flight/BookingForm';
import { ThemedView } from '../../components/ThemedView';

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const flightId = params.flightId as string;

  const handleBookingSubmit = (bookingData: {
    flightId: string;
    passengers: Array<{
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      passportNumber: string;
    }>;
  }) => {
    // In a real app, you would send this data to your backend
    console.log('Booking data:', bookingData);

    // Navigate to payment screen
    router.push({
      pathname: '/payment',
      params: {
        flightId,
        passengers: JSON.stringify(bookingData.passengers),
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <BookingForm
        flightId={flightId}
        onSubmit={handleBookingSubmit}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 