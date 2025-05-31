import { AuthProvider } from '@/context/AuthContext';
import { Slot } from 'expo-router';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </AuthProvider>
  );
}
