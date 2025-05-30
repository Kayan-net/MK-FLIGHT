import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface BookingConfirmationProps {
  bookingDetails: {
    bookingId: string;
    flight: {
      airline: string;
      flightNumber: string;
      departure: {
        city: string;
        time: string;
        date: string;
        airport: string;
      };
      arrival: {
        city: string;
        time: string;
        date: string;
        airport: string;
      };
    };
    passengers: Array<{
      firstName: string;
      lastName: string;
    }>;
    totalAmount: number;
  };
  onDone: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  bookingDetails,
  onDone,
}) => {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Booking Confirmed!</ThemedText>
          <ThemedText style={styles.bookingId}>
            Booking ID: {bookingDetails.bookingId}
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Flight Details</ThemedText>
          <View style={styles.flightInfo}>
            <View style={styles.routeInfo}>
              <ThemedText style={styles.time}>{bookingDetails.flight.departure.time}</ThemedText>
              <ThemedText style={styles.city}>{bookingDetails.flight.departure.city}</ThemedText>
              <ThemedText style={styles.airport}>{bookingDetails.flight.departure.airport}</ThemedText>
              <ThemedText style={styles.date}>{bookingDetails.flight.departure.date}</ThemedText>
            </View>

            <View style={styles.routeInfo}>
              <ThemedText style={styles.time}>{bookingDetails.flight.arrival.time}</ThemedText>
              <ThemedText style={styles.city}>{bookingDetails.flight.arrival.city}</ThemedText>
              <ThemedText style={styles.airport}>{bookingDetails.flight.arrival.airport}</ThemedText>
              <ThemedText style={styles.date}>{bookingDetails.flight.arrival.date}</ThemedText>
            </View>
          </View>

          <View style={styles.airlineInfo}>
            <ThemedText style={styles.airline}>{bookingDetails.flight.airline}</ThemedText>
            <ThemedText style={styles.flightNumber}>{bookingDetails.flight.flightNumber}</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Passengers</ThemedText>
          {bookingDetails.passengers.map((passenger, index) => (
            <View key={index} style={styles.passengerInfo}>
              <ThemedText style={styles.passengerName}>
                {passenger.firstName} {passenger.lastName}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Payment Details</ThemedText>
          <View style={styles.paymentInfo}>
            <ThemedText style={styles.amountLabel}>Total Amount Paid:</ThemedText>
            <ThemedText style={styles.amount}>${bookingDetails.totalAmount}</ThemedText>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={onDone}
          style={styles.doneButton}
        >
          Done
        </Button>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  bookingId: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  flightInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  routeInfo: {
    flex: 1,
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  city: {
    fontSize: 16,
    marginTop: 4,
  },
  airport: {
    fontSize: 14,
    opacity: 0.7,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  airlineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
  },
  airline: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flightNumber: {
    fontSize: 16,
    opacity: 0.7,
  },
  passengerInfo: {
    marginBottom: 8,
  },
  passengerName: {
    fontSize: 16,
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  doneButton: {
    marginTop: 16,
    marginBottom: 24,
  },
}); 