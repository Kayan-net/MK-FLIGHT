import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';

export default function VisaScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Visa Services</ThemedText>
      <ThemedText>Details about visa application and services will go here.</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}); 