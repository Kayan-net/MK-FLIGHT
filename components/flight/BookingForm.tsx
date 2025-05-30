import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { validateEmail, validatePassport, validatePhone, validateRequired } from '../../utils/validation';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  class: string;
  price: number;
}

interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passportNumber: string;
}

interface BookingFormProps {
  flightId: string;
  onSubmit: (bookingData: {
    flightId: string;
    passengers: PassengerInfo[];
  }) => void;
  flight: Flight;
}

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passportNumber: string;
  specialRequests?: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  passportNumber?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ flightId, onSubmit, flight }) => {
  const [passengers, setPassengers] = useState<PassengerInfo[]>([
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      passportNumber: '',
    },
  ]);

  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passportNumber: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passportNumber: '',
      },
    ]);
  };

  const updatePassenger = (index: number, field: keyof PassengerInfo, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengers(updatedPassengers);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Validate required fields
    if (validateRequired(formData.firstName)) {
      newErrors.firstName = 'First name is required';
    }
    if (validateRequired(formData.lastName)) {
      newErrors.lastName = 'Last name is required';
    }
    if (validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (validateRequired(formData.phone)) {
      newErrors.phone = 'Phone number is required';
    } else if (validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (validateRequired(formData.passportNumber)) {
      newErrors.passportNumber = 'Passport number is required';
    } else if (validatePassport(formData.passportNumber)) {
      newErrors.passportNumber = 'Please enter a valid passport number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        flightId,
        passengers,
      });
    }
  };

  const handleBlur = (field: keyof BookingFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Passenger Information</ThemedText>

        {passengers.map((passenger, index) => (
          <View key={index} style={styles.passengerContainer}>
            <ThemedText style={styles.passengerTitle}>
              Passenger {index + 1}
            </ThemedText>

            <TextInput
              label="First Name"
              value={passenger.firstName}
              onChangeText={(text) => updatePassenger(index, 'firstName', text)}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Last Name"
              value={passenger.lastName}
              onChangeText={(text) => updatePassenger(index, 'lastName', text)}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Email"
              value={passenger.email}
              onChangeText={(text) => updatePassenger(index, 'email', text)}
              style={styles.input}
              mode="outlined"
              keyboardType="email-address"
            />

            <TextInput
              label="Phone"
              value={passenger.phone}
              onChangeText={(text) => updatePassenger(index, 'phone', text)}
              style={styles.input}
              mode="outlined"
              keyboardType="phone-pad"
            />

            <TextInput
              label="Passport Number"
              value={passenger.passportNumber}
              onChangeText={(text) => updatePassenger(index, 'passportNumber', text)}
              style={styles.input}
              mode="outlined"
            />
          </View>
        ))}

        <Button
          mode="outlined"
          onPress={addPassenger}
          style={styles.addButton}
        >
          Add Another Passenger
        </Button>

        <View style={styles.form}>
          <TextInput
            label="First Name"
            value={formData.firstName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
            onBlur={() => handleBlur('firstName')}
            error={touched.firstName && !!errors.firstName}
            style={styles.input}
          />
          <HelperText type="error" visible={touched.firstName && !!errors.firstName}>
            {errors.firstName}
          </HelperText>

          <TextInput
            label="Last Name"
            value={formData.lastName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
            onBlur={() => handleBlur('lastName')}
            error={touched.lastName && !!errors.lastName}
            style={styles.input}
          />
          <HelperText type="error" visible={touched.lastName && !!errors.lastName}>
            {errors.lastName}
          </HelperText>

          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            onBlur={() => handleBlur('email')}
            error={touched.email && !!errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <HelperText type="error" visible={touched.email && !!errors.email}>
            {errors.email}
          </HelperText>

          <TextInput
            label="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
            onBlur={() => handleBlur('phone')}
            error={touched.phone && !!errors.phone}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <HelperText type="error" visible={touched.phone && !!errors.phone}>
            {errors.phone}
          </HelperText>

          <TextInput
            label="Passport Number"
            value={formData.passportNumber}
            onChangeText={(text) => setFormData(prev => ({ ...prev, passportNumber: text }))}
            onBlur={() => handleBlur('passportNumber')}
            error={touched.passportNumber && !!errors.passportNumber}
            style={styles.input}
          />
          <HelperText type="error" visible={touched.passportNumber && !!errors.passportNumber}>
            {errors.passportNumber}
          </HelperText>

          <TextInput
            label="Special Requests (Optional)"
            value={formData.specialRequests}
            onChangeText={(text) => setFormData(prev => ({ ...prev, specialRequests: text }))}
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Continue to Payment
        </Button>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  passengerContainer: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  passengerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  addButton: {
    marginBottom: 16,
  },
  submitButton: {
    marginBottom: 24,
  },
  form: {
    gap: 8,
  },
}); 