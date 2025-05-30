import { format } from 'date-fns'; // To format the date
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper'; // Assuming react-native-paper Button is used
import { FlightList } from '../../components/flight/FlightList';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

// Mock data for demonstration
const mockFlights = [
  {
    id: '1',
    airline: 'Ethiopian Airlines',
    flightNumber: 'ET 848',
    departure: {
      city: 'Johannesburg (JNB)',
      time: '07:35',
      airport: 'JNB',
    },
    arrival: {
      city: 'Dhaka (DAC)',
      time: '08:45',
      airport: 'DAC',
    },
    duration: '21h 10m',
    price: 9988.17,
    stops: 1,
  },
  {
    id: '2',
    airline: 'Ethiopian Airlines',
    flightNumber: 'ET 808',
    departure: {
      city: 'Johannesburg (JNB)',
      time: '14:30',
      airport: 'JNB',
    },
    arrival: {
      city: 'Dhaka (DAC)',
      time: '08:45',
      airport: 'DAC',
    },
    duration: '14h 15m',
    price: 24348.17,
    stops: 1,
  },
   {
    id: '3',
    airline: 'Emirates',
    flightNumber: 'EK 762',
    departure: {
      city: 'Johannesburg (JNB)',
      time: '13:25',
      airport: 'JNB',
    },
    arrival: {
      city: 'Dhaka (DAC)',
      time: '08:40',
      airport: 'DAC',
    },
    duration: '15h 15m',
    price: 30344.17,
    stops: 1,
  },
];

export default function SearchResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [flights, setFlights] = useState(mockFlights);

  const { from, to, date, passengers, flightClass } = params;

  const departureDate = date ? new Date(date as string) : new Date();
  const numberOfPassengers = typeof passengers === 'string' ? parseInt(passengers) : 1;
  // Assuming passengers param might include adult, child, infant counts separated by commas
  const passengerCounts = String(passengers).split(',').map(Number);
  const adultPassengers = passengerCounts[0] || numberOfPassengers;
  const childPassengers = passengerCounts[1] || 0;
  const infantPassengers = passengerCounts[2] || 0;


  useEffect(() => {
    // In a real app, you would fetch flights from an API here
    // using the search parameters from params
    console.log('Search params:', params);

    // For now, filter mock flights based on selected departure/arrival (basic matching)
    const filteredFlights = mockFlights.filter(flight => {
        const matchesFrom = !from || flight.departure.airport.includes(from as string);
        const matchesTo = !to || flight.arrival.airport.includes(to as string);
        // Basic date matching - in a real app, consider date ranges
        // For simplicity here, we'll assume mock flights are for the searched date
        return matchesFrom && matchesTo;
    });
    setFlights(filteredFlights);

  }, [params, from, to]); // Add dependencies

  const handleFlightSelect = (flightId: string) => {
    router.push({
      pathname: '/booking',
      params: {
        flightId,
        ...params,
      },
    });
  };

  const handleModifySearch = () => {
      // Navigate back to the flights search screen, potentially pre-filling the form
      router.push({
          pathname: '/(tabs)/flights',
          params: params,
      });
  };

  return (
    <ThemedView style={styles.container}>
      {/* Trip Details Header */}
      <View style={styles.detailsHeader}>
        <ThemedText style={styles.headerDate}>Departure</ThemedText>
        <ThemedText style={styles.headerDateValue}>Sat, {format(departureDate, 'dd MMM')}</ThemedText>
        <ThemedText style={styles.headerPassenger}>Adult</ThemedText>
        <ThemedText style={styles.headerPassengerValue}>{adultPassengers}</ThemedText>
        <ThemedText style={styles.headerPassenger}>Child</ThemedText>
        <ThemedText style={styles.headerPassengerValue}>{childPassengers}</ThemedText>
        <ThemedText style={styles.headerPassenger}>Infant</ThemedText>
        <ThemedText style={styles.headerPassengerValue}>{infantPassengers}</ThemedText>
        <Button mode="contained" onPress={handleModifySearch} style={styles.modifyButton} labelStyle={styles.modifyButtonLabel}>MODIFY SEARCH</Button>
      </View>

      {/* Date Navigation */}
      <View style={styles.dateNav}>
          <TouchableOpacity style={styles.dateNavButton}><ThemedText style={styles.dateNavText}>&lt; Prev Day</ThemedText></TouchableOpacity>
          <ThemedText style={styles.dateNavDateText}>{format(departureDate, 'dd-MMM-yyyy')}</ThemedText>
          <TouchableOpacity style={styles.dateNavButton}><ThemedText style={styles.dateNavText}>Next Day &gt;</ThemedText></TouchableOpacity>
      </View>

      {/* Airline Filter Bar (Placeholder) */}
      <View style={styles.airlineFilter}>
          <TouchableOpacity><ThemedText style={styles.airlineFilterText}>All Airline</ThemedText></TouchableOpacity>
          {/* Add placeholder airline logos/options here */}
      </View>

      {/* Flight List */}
      <FlightList
        flights={flights}
        onFlightSelect={handleFlightSelect}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee', // Light grey background from image
  },
  detailsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#d3d3d3', // Light grey background
      padding: 10,
  },
  headerDate: {
      fontSize: 12, // Adjusted font size
      fontWeight: 'bold',
      color: '#333', // Darker text color
  },
  headerDateValue: {
    fontSize: 14, // Adjusted font size
    fontWeight: 'bold', // Made bold
    color: '#333', // Darker text color
    marginRight: 10, // Added margin
  },
  headerPassenger: {
    fontSize: 12, // Adjusted font size
    fontWeight: 'bold',
    color: '#333', // Darker text color
    marginLeft: 5, // Adjusted margin
  },
  headerPassengerValue: {
    fontSize: 14, // Adjusted font size
    fontWeight: 'bold', // Made bold
    color: '#333', // Darker text color
  },
  modifyButton: {
      marginLeft: 20,
      backgroundColor: '#0a7ea4', // Blue button color
      paddingVertical: 0, // Adjust padding
      paddingHorizontal: 10, // Adjust padding
      height: 30, // Set a fixed height
      justifyContent: 'center', // Center text vertically
  },
   modifyButtonLabel: {
      fontSize: 12, // Adjusted font size
   },
  dateNav: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Changed to space-between
      alignItems: 'center',
      backgroundColor: '#fff', // White background
      paddingVertical: 10,
      paddingHorizontal: 20, // Added horizontal padding
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
  },
   dateNavButton: {
      padding: 5, // Added padding for touch area
   },
  dateNavText: {
      fontSize: 14,
      color: '#0a7ea4', // Blue color
      fontWeight: 'bold',
  },
   dateNavDateText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333', // Darker text
   },
  airlineFilter: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff', // White background
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
  },
  airlineFilterText: {
      fontSize: 14,
      fontWeight: 'bold',
      marginRight: 10,
  }

}); 