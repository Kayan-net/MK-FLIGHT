import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Flight Search',
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            title: 'Search Results',
          }}
        />
        <Stack.Screen
          name="booking"
          options={{
            title: 'Book Flight',
          }}
        />
        <Stack.Screen
          name="payment"
          options={{
            title: 'Payment',
          }}
        />
        <Stack.Screen
          name="confirmation"
          options={{
            title: 'Booking Confirmation',
            headerBackVisible: false,
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
