import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface FlightCardProps {
  flight: {
    id: string;
    airline: string;
    flightNumber: string;
    departure: {
      city: string;
      time: string;
      airport: string;
    };
    arrival: {
      city: string;
      time: string;
      airport: string;
    };
    duration: string;
    price: number;
    stops: number;
    airlineLogo?: string;
  };
  onSelect: (flightId: string) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  const getAirlineLogo = (airline: string) => {
    switch (airline) {
      case 'Ethiopian Airlines':
        return 'https://seeklogos.com/images/e/ethiopian-airlines-logo-42EC586CA4-seeklogos.com.png';
      case 'British Airways':
        return 'https://seeklogos.com/images/b/british-airways-logo-10F162113F-seeklogos.com.png';
      default:
        return undefined;
    }
  };

  const airlineLogoSource = getAirlineLogo(flight.airline);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.cardContent}>
        <View style={styles.airlineInfoContainer}>
          {airlineLogoSource && (
            <Image source={{ uri: airlineLogoSource }} style={styles.airlineLogo} />
          )}
        </View>

        <View style={styles.routeDetailsContainer}>
          <View style={styles.timeCityContainer}>
            <ThemedText style={styles.time}>{flight.departure.time}</ThemedText>
            <ThemedText style={styles.cityAirport}>{`${flight.departure.city} (${flight.departure.airport})`}</ThemedText>
          </View>

          <View style={styles.durationContainer}>
            <ThemedText style={styles.duration}>{flight.duration}</ThemedText>
            <ThemedText style={styles.stops}>{flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</ThemedText>
          </View>

          <View style={styles.timeCityContainer}>
            <ThemedText style={styles.time}>{flight.arrival.time}</ThemedText>
            <ThemedText style={styles.cityAirport}>{`${flight.arrival.city} (${flight.arrival.airport})`}</ThemedText>
          </View>
        </View>

        <View style={styles.priceSelectContainer}>
          <ThemedText style={styles.price}>R {flight.price}</ThemedText>
          <ThemedText style={styles.refundableText}>Refundable</ThemedText>
          <TouchableOpacity style={styles.selectButton} onPress={() => onSelect(flight.id)}>
            <ThemedText style={styles.selectButtonText}>Select</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.expandableDetailsContainer}>
        <TouchableOpacity>
          <ThemedText style={styles.detailLink}>Flight Details</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity>
          <ThemedText style={styles.detailLink}>Baggage Information</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity>
          <ThemedText style={styles.detailLink}>Fare Details</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  airlineInfoContainer: {
    width: '15%',
    alignItems: 'center',
  },
  airlineLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  airline: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  routeDetailsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  timeCityContainer: {
    alignItems: 'flex-start',
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cityAirport: {
    fontSize: 12,
    color: '#666',
  },
  durationContainer: {
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#666',
  },
  stops: {
    fontSize: 12,
    color: '#666',
  },
  priceSelectContainer: {
    width: '20%',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  refundableText: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  selectButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  selectButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  expandableDetailsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  detailLink: {
    fontSize: 12,
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
}); 