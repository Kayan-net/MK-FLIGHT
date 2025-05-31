import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';

export default function AuthHeaderButtons() {
  const { isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  const handleLoginPress = () => {
    router.push('/(auth)/index'); // Corrected path to index within (auth)
  };

  const handleLogoutPress = () => {
    signOut(); // Call the signOut function from context
    // The AuthContext useEffect will handle the redirect after signOut
  };

  if (isAuthenticated) {
    return <Button onPress={handleLogoutPress}>Logout</Button>;
  } else {
    return <Button onPress={handleLoginPress}>Login</Button>;
  }
} 