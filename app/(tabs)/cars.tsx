import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function CarsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Car Rentals</ThemedText>
      <ThemedText>Car rental functionality coming soon!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 