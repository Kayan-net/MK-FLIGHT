export interface Trip {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string; // Optional for one-way trips
  airline: string;
  flightNumber: string;
  bookingReference: string;
} 