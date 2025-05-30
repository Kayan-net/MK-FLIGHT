import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { PaymentForm } from '../../components/flight/PaymentForm';
import { ThemedView } from '../../components/ThemedView';

// Mock flight price for demonstration
const FLIGHT_PRICE = 599;

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const passengers = JSON.parse(params.passengers as string);

  const handlePaymentSubmit = (paymentData: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  }) => {
    // In a real app, you would process the payment here
    console.log('Payment data:', paymentData);

    // Navigate to confirmation screen
    router.push({
      pathname: '/confirmation',
      params: {
        bookingId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        totalAmount: (FLIGHT_PRICE * passengers.length).toString(),
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <PaymentForm
        amount={FLIGHT_PRICE * passengers.length}
        onSubmit={handlePaymentSubmit}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 