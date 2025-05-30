import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { validateCardNumber, validateCVV, validateExpiryDate, validateRequired } from '../../utils/validation';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface PaymentFormProps {
  amount: number;
  onSubmit: (paymentData: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  }) => void;
}

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSubmit }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Validate required fields
    if (validateRequired(formData.cardNumber)) {
      newErrors.cardNumber = 'Card number is required';
    } else if (validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (validateRequired(formData.cardHolder)) {
      newErrors.cardHolder = 'Card holder name is required';
    }

    if (validateRequired(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (validateRequired(formData.cvv)) {
      newErrors.cvv = 'CVV is required';
    } else if (validateCVV(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleBlur = (field: keyof PaymentFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const formatCardNumber = (text: string) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
  };

  const formatExpiryDate = (text: string) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    // Add slash after 2 digits
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Payment Information</ThemedText>
        
        <View style={styles.amountContainer}>
          <ThemedText style={styles.amountLabel}>Total Amount:</ThemedText>
          <ThemedText style={styles.amount}>${amount}</ThemedText>
        </View>

        <TextInput
          label="Card Number"
          value={formData.cardNumber}
          onChangeText={(text) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(text) }))}
          onBlur={() => handleBlur('cardNumber')}
          error={touched.cardNumber && !!errors.cardNumber}
          keyboardType="numeric"
          maxLength={19}
          style={styles.input}
        />
        <HelperText type="error" visible={touched.cardNumber && !!errors.cardNumber}>
          {errors.cardNumber}
        </HelperText>

        <TextInput
          label="Card Holder Name"
          value={formData.cardHolder}
          onChangeText={(text) => setFormData(prev => ({ ...prev, cardHolder: text }))}
          onBlur={() => handleBlur('cardHolder')}
          error={touched.cardHolder && !!errors.cardHolder}
          style={styles.input}
        />
        <HelperText type="error" visible={touched.cardHolder && !!errors.cardHolder}>
          {errors.cardHolder}
        </HelperText>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <TextInput
              label="Expiry Date"
              value={formData.expiryDate}
              onChangeText={(text) => setFormData(prev => ({ ...prev, expiryDate: formatExpiryDate(text) }))}
              onBlur={() => handleBlur('expiryDate')}
              error={touched.expiryDate && !!errors.expiryDate}
              keyboardType="numeric"
              maxLength={5}
              style={styles.input}
            />
            <HelperText type="error" visible={touched.expiryDate && !!errors.expiryDate}>
              {errors.expiryDate}
            </HelperText>
          </View>

          <View style={styles.halfWidth}>
            <TextInput
              label="CVV"
              value={formData.cvv}
              onChangeText={(text) => setFormData(prev => ({ ...prev, cvv: text.replace(/\D/g, '') }))}
              onBlur={() => handleBlur('cvv')}
              error={touched.cvv && !!errors.cvv}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              style={styles.input}
            />
            <HelperText type="error" visible={touched.cvv && !!errors.cvv}>
              {errors.cvv}
            </HelperText>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Pay ${amount}
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
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 24,
  },
}); 