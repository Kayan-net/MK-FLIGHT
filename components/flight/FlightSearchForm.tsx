import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, HelperText, RadioButton, Text, TextInput } from 'react-native-paper';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface FlightSearchFormProps {
  onSearch: (searchParams: {
    from: string;
    to: string;
    date: Date;
    returnDate?: Date;
    passengers: number;
    class: string;
    preferredAirline: string;
    flexibleDates: boolean;
  }) => void;
}

interface FormErrors {
  from?: string;
  to?: string;
  passengers?: string;
}

const southAfricaAirports = [
  { label: 'Select Departure Airport', value: '' },
  { label: 'O.R. Tambo International Airport (JNB)', value: 'JNB' },
  { label: 'Cape Town International Airport (CPT)', value: 'CPT' },
  { label: 'King Shaka International Airport (DUR)', value: 'DUR' },
  { label: 'Port Elizabeth International Airport (PLZ)', value: 'PLZ' },
];

const asiaMiddleEastAirports = [
  { label: 'Select Destination Airport', value: '' },
  { label: 'Dhaka Hazrat Shahjalal International Airport (DAC)', value: 'DAC' },
  { label: 'Allama Iqbal International Airport (LHE)', value: 'LHE' },
  { label: 'Sialkot International Airport (SKT)', value: 'SKT' },
  { label: 'Islamabad International Airport (ISB)', value: 'ISB' },
  { label: 'Indira Gandhi International Airport (DEL)', value: 'DEL' },
  { label: 'Cairo International Airport (CAI)', value: 'CAI' },
  { label: 'Addis Ababa Bole International Airport (ADD)', value: 'ADD' },
  { label: 'Houari Boumediene Airport (ALG)', value: 'ALG' },
  { label: 'Tokyo Narita (NRT)', value: 'NRT' },
  { label: 'Seoul Incheon (ICN)', value: 'ICN' },
  { label: 'Dubai International (DXB)', value: 'DXB' },
  { label: 'Doha Hamad (DOH)', value: 'DOH' },
];

export const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ onSearch }) => {
  const [tripType, setTripType] = useState('one-way');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('Economy');
  const [preferredAirline, setPreferredAirline] = useState('Any');
  const [flexibleDates, setFlexibleDates] = useState(false);

  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!from) {
      newErrors.from = 'Please select a departure airport';
    }

    if (!to) {
      newErrors.to = 'Please select a destination airport';
    }

    if (passengers < 1) {
      newErrors.passengers = 'At least 1 passenger is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    setTouched({ from: true, to: true, passengers: true });
    if (validateForm()) {
      onSearch({
        from,
        to,
        date: departureDate,
        returnDate: tripType === 'roundtrip' ? returnDate : undefined,
        passengers,
        class: flightClass,
        preferredAirline,
        flexibleDates,
      });
    }
  };

  const handleBlur = (field: string) => {
    // No longer needed for Picker components in this implementation
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Find Your Flight----</ThemedText>
      
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={newValue => setTripType(newValue)} value={tripType}>
          <View style={styles.radioItem}>
            <RadioButton value="one-way" />
            <Text>One way</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="roundtrip" />
            <Text>Roundtrip / Return</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="multi-city" disabled={true} />
            <Text>Multi-city</Text>
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.halfInput}>
          <ThemedText style={styles.label}>FROM</ThemedText>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={from}
              onValueChange={(itemValue: string) => setFrom(itemValue)}
              style={styles.picker}
            >
              {southAfricaAirports.map((airport) => (
                <Picker.Item key={airport.value} label={airport.label} value={airport.value} />
              ))}
            </Picker>
          </View>
          {touched.from && errors.from && (
            <HelperText type="error" visible={!!errors.from}>
              {errors.from}
            </HelperText>
          )}
        </View>
        
        <View style={styles.swapIconContainer}>
          
        </View>
        <View style={styles.halfInput}>
          <ThemedText style={styles.label}>TO</ThemedText>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={to}
              onValueChange={(itemValue: string) => setTo(itemValue)}
              style={styles.picker}
            >
              {asiaMiddleEastAirports.map((airport) => (
                <Picker.Item key={airport.value} label={airport.label} value={airport.value} />
              ))}
            </Picker>
          </View>
          {touched.to && errors.to && (
            <HelperText type="error" visible={!!errors.to}>
              {errors.to}
            </HelperText>
          )}
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.halfInput}>
           <ThemedText style={styles.label}>DEPARTURE</ThemedText>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDepartureDatePicker(true)}
          >
            <ThemedText>
              {departureDate.toLocaleDateString()}
            </ThemedText>
          </TouchableOpacity>
           {showDepartureDatePicker && (
            <DateTimePicker
              value={departureDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDepartureDatePicker(false);
                if (selectedDate) {
                  setDepartureDate(selectedDate);
                }
              }}
            />
          )}
        </View>

        {tripType === 'roundtrip' && (
          <View style={styles.halfInput}>
             <ThemedText style={styles.label}>RETURN</ThemedText>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowReturnDatePicker(true)}
            >
              <ThemedText>
                {returnDate ? returnDate.toLocaleDateString() : 'Select Date'}
              </ThemedText>
            </TouchableOpacity>
             {showReturnDatePicker && (
              <DateTimePicker
                value={returnDate || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                minimumDate={departureDate}
                onChange={(event, selectedDate) => {
                  setShowReturnDatePicker(false);
                  if (selectedDate) {
                    setReturnDate(selectedDate);
                  }
                }}
              />
            )}
          </View>
        )}
      </View>

      <View style={styles.inputRow}>
        <View style={styles.halfInput}>
          <ThemedText style={styles.label}>CLASS</ThemedText>
           <View style={styles.pickerContainer}>
            <Picker
              selectedValue={flightClass}
              onValueChange={(itemValue: string, itemIndex: number) => setFlightClass(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Economy" value="Economy" />
              <Picker.Item label="Business" value="Business" />
              <Picker.Item label="First Class" value="First Class" />
            </Picker>
          </View>
        </View>
         <View style={styles.halfInput}>
            <ThemedText style={styles.label}>NO. OF TRAVELLERS</ThemedText>
            
            <TextInput
              value={passengers.toString()}
              onChangeText={(text) => {
                const num = parseInt(text) || 0;
                setPassengers(num);
                 setTouched(prev => ({ ...prev, passengers: true }));
              }}
               keyboardType="numeric"
               style={styles.input}
               mode="outlined"
                error={touched.passengers && !!errors.passengers}
            />
             {touched.passengers && errors.passengers && (
              <HelperText type="error" visible={!!errors.passengers}>
                {errors.passengers}
              </HelperText>
            )}
         </View>
      </View>

      <ThemedText style={styles.label}>PREFERRED AIRLINE</ThemedText>
       <View style={styles.pickerContainer}>
          <Picker
            selectedValue={preferredAirline}
            onValueChange={(itemValue: string, itemIndex: number) => setPreferredAirline(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Any" value="Any" />
             <Picker.Item label="Airline 1" value="Airline 1" />
             <Picker.Item label="Airline 2" value="Airline 2" />
          </Picker>
       </View>

      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          label="+/- 3 DAYS (CALENDAR SEARCH)"
          status={flexibleDates ? 'checked' : 'unchecked'}
          onPress={() => setFlexibleDates(!flexibleDates)}
          position="leading"
          labelStyle={styles.checkboxLabel}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSearch}
        style={styles.searchButton}
        labelStyle={styles.searchButtonLabel}
      >
        SEARCH FLIGHT
      </Button>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
   halfInput: {
    width: '48%',
   },
   swapIconContainer: {
      width: '4%',
      alignItems: 'center',
   },
  input: {
    marginBottom: 0,
  },
  label: {
     fontSize: 12,
     marginBottom: 4,
     color: '#333',
     fontWeight: 'bold',
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 56,
  },
   pickerContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      backgroundColor: '#fff',
      justifyContent: 'center',
      height: 56,
      marginBottom: 10,
   },
   picker: {

   },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
   checkboxLabel: {
      fontSize: 14,
   },
  searchButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#0a7ea4',
  },
   searchButtonLabel: {
      fontSize: 18,
   }
}); 