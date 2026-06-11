export interface FoodItem {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  isAvailable: boolean;
  mapLocation: string;
  averagePrice: string;
  recommendedHours: string;
}

export interface Attraction {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  distance: string;
  duration: string;
  routesDescription: string;
  highlights: string[];
}

export interface StatItem {
  id: string;
  count: string;
  label: string;
  description: string;
}

export interface ParkingStatus {
  name: string;
  totalSpaces: number;
  availableSpaces: number;
  distanceText: string;
  priceText: string;
}

export interface BookingForm {
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  numPeople: number;
  remarks: string;
}
