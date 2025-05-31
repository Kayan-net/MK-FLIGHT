import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function SignUpScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Mock sign up logic
    console.log('Attempting sign up with:', { email, password, confirmPassword });
    // In a real app, you'd call your backend API here to register the user
    // If successful, you could automatically sign them in
    // For now, let's simulate signing in after a successful sign up
    signIn();
    // The AuthContext useEffect will handle the redirect after signIn
  };

  const navigateToLogin = () => {
    router.push('/(auth)/index' as any);
  }; 

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Sign Up now </ThemedText>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSignUp} style={styles.button}>
        Sign Up
      </Button>

      <Button mode="text" onPress={navigateToLogin} style={styles.linkButton}>
        Already have an account? Login
      </Button>

    </ThemedView>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    marginTop: 24,
  },
  linkButton: {
    marginTop: 12,
  },
}); 