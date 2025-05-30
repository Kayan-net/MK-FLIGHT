import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FlightSearchForm } from '../../components/flight/FlightSearchForm';
import { ThemedView } from '../../components/ThemedView';

export default function FlightsScreen() {
  const router = useRouter();

  const handleSearch = (searchParams: {
    from: string;
    to: string;
    date: Date;
    passengers: number;
    class: string;
  }) => {
    router.push({
      pathname: '/search',
      params: {
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.date.toISOString(),
        passengers: searchParams.passengers.toString(),
        class: searchParams.class,
      },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <FlightSearchForm onSearch={handleSearch} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 